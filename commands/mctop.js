const mineflayer = require('mineflayer')
const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');

module.exports = {
    name: 'mctop',
    category: 'Factions',
    description: 'Displays mctop',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.mctop,
    execute(message, args, bot, chatData, saving, regex){
        saving.chat = true;
        regex.regex = /^[0-9#]|[1-9#]|(mcMMO)/ig;
        if(!args.length){
            args[0] = "";
        }
        
        bot.client.chat("/mctop "+ args[0]);

        setTimeout(() => {
            saving.chat = false;
            if(!chatData.chat.length){
                chatData.chat[0] = "Try Again";
            }

            let embedMctop = new Discord.MessageEmbed()
                .setTitle("MCTop")
                .setColor(config.general.embedColor)
                .setDescription(`\`\`\`${chatData.chat.join('\n')}\`\`\``)
                .setTimestamp(new Date())
                .setFooter(`${config.general.serverIP}`);
            message.channel.send(embedMctop);
            chatData.hover.length = 0;
            chatData.chat.length = 0;
        }, 500);  
    },
}