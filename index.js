const Discord = require("discord.js");
const mineflayer = require("mineflayer");
const { monthsShort } = require("moment");
const { builtinModules } = require("module");
const fs = require("fs");
const tpsPlugin = require('mineflayer-tps')(mineflayer)
let config = JSON.parse(fs.readFileSync('./config.json'))
const {usage, warning} = require('./Storage/functions');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const client = new Discord.Client();
client.commands = new Discord.Collection();

var stdin = process.openStdin()   

var prefix = { value: config.general.prefix };
let guild = config.channelIDs.guild;
let chatData = { chat: [], hover: [] };
let serverchat = {chat: []};
let saving = { chat: false, hover: false };
let regex = { regex: new RegExp() };

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

let options = {
    version: config.general.version,
    host: config.general.serverIP,
    username: config.general.username,
    password: config.general.password,
};
var bot = { client: mineflayer.createBot(options)};
bot.client.loadPlugin(tpsPlugin);

client.on("ready", async () => {
    console.log(`Discord Bot Online @ ${config.general.serverIP}`)

    client.user.setActivity({
        name: `${config.general.serverIP}`,
    })

    setTimeout(() => {
        client.guilds.cache.forEach(g => {
            g.fetchInvites().then(guildInvites => {
                invites[g.id] = guildInvites;
            })
        })
    })
});

client.on("guildMemberAdd", member => {
    if(!getChannel(member, config.channelIDs.joinchannelID)) return
    member.guild.fetchInvites.then(guildInvites => {
        const exisitingInvites = invites[member.guild.id];
        invites[member.guild.id] = guildInvites;
        const invite = guildInvites.find(i => exisitingInvites.get(i.code).uses < i.uses);
        const inviter = client.users.get(invite.inviter.id);
        const embed = new Discord.MessageEmbed()
            .setDescription(`<@${member.guild.id} **joined**; Invited by **${inviter.username}** (**${invite.uses}** invites)>`)
            .setColor(config.general.embedColor)
            .setTimestamp(new Date())
        getChannel(member, config.channelIDs.joinchannelID).send(embed)
    })
})

client.on("guildMemberRemove", member => {
    if(!getChannel(config.channelIDs.leavechannelID)) return
    let server = client.guilds.cache.get(guild)

    const embed = new Discord.MessageEmbed()
        .setDescription(`<@${member.user.id}> left ${server}`)
        .setColor(config.general.embedColor)
        .setTimestamp(new Date())
    getChannel(config.channelIDs.leavechannelID).send(embed)
})

client.on('message', message => {
   
    if (!message.content.startsWith(prefix.value) || message.author.bot) return;

    const args = message.content.slice(prefix.value.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    // order: prefix args commandName--> command
    if (!command) return;

    if (command.args && !args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }

    try {
        if (command.enabled == true && command.name != "settings") {
            command.execute(message, args, bot, chatData, saving, regex);
        }
        else if (command.name == "settings") {
            command.execute(message, args, prefix)
        } 
    } catch (err) {
        message.channel.send(`\`\`\`${err}\`\`\``)
    }
});

client.login(config.general.token).catch(console.err);

stdin.addListener("data", data => {
    bot.client.chat(data.toString().trim())
})

bot.client.on("login", async () => {
    console.log(`Bot: ${bot.client.username} is now on ${config.general.serverIP}`)
    bot.client.chat(config.general.hub_command)
});

bot.client.on("error", error => {
    if (`${error}`.includes("Invalid credentials")) {
        console.log("Invalid Session/Credentials, attempting to relog");
        setTimeout(() => {
            process.exit();
        }, 30000);
    }
})
bot.client.on("end", () => {
    console.log("Connection Ended");
    setTimeout(() => {
        process.exit();
    }, 30000);
})

bot.client.on('kicked', reason => {
    console.log("Kicked for: " + reason);
    console.log("Attempting to relog");
    setTimeout(() => {
        process.exit();
    }, 30000);
});

bot.client.on("windowOpen", function (window) {
    let foundItem = window.slots.find(x =>x.slot===22).nbt.value.display.value.Lore.value.value
    if(saving.hover === true && foundItem != null){
        chatData.hover.push(foundItem)
    }
    bot.client.closeWindow(window)
})

bot.client._client.on("scoreboard_score", packet => {
    let allP = [];
    allP.push(packet.itemName)
    console.log(allP)
})

bot.client._client.on("scoreboard_team", function (packet){
    let vanishUsers = JSON.parse(fs.readFileSync('./Storage/vanishusers.json'))
    let packetinfo = JSON.stringify(packet.players)
    for(let i in packetinfo){
        if(!vanishUsers.includes(i) && i != null){
           // chatData.chat.push(i)
           // console.log(chatData.chat)
        }
    }
    //if(packetinfo != null || packetinfo == '' && !vanishUsers.includes(packetinfo)){
    //    chatData.chat.push(vanishUsers)
    //    console.log(chatData.chat)
   // }  
})

bot.client.on("message", async message => {
    let serverChatID = client.channels.cache.get(config.channelIDs.serverchatID)
    console.log(message.toAnsi())
    let parsedMsg = `${message}`;

    if (parsedMsg.toLowerCase().match(regex.regex) && saving.hover === true && message.hoverEvent.value != "undefined") {
        chatData.chat.push(parsedMsg);
        chatData.hover.push(message.hoverEvent.value)
    }

    if (parsedMsg.match(regex.regex) && !parsedMsg.includes("(!) Vanity") && saving.chat === true) {
        chatData.chat.push(`${message}`);
    }

    if(config.enableCommands.serverchat == true){
        serverchat.chat.push(parsedMsg)
    setInterval(() => {
        if(serverchat.chat.length === 0){ return }
        serverChatID.send(`\`\`\`${serverchat.chat.join('\n')}\`\`\``)
        serverchat.chat = []
    }, 7000);
    }  
});

bot.client.on("whisper", function(username, message){
    try{
         
    }
    catch{

    }
})