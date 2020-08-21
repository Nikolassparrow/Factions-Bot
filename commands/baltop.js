const mineflayer = require('mineflayer')
const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');

module.exports = {
    name: 'baltop',
    alias: ['balancetop'],
    category: 'Factions',
    description: 'Displays information about Balance Top',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.baltop,
    execute(message, args, bot, chatData, saving, regex){
        saving.chat = true;
        regex.regex = /^[0-9#]|[1-9#]|(Balancetop)/ig
        if (!args.length) {
            args[0] = "";
        }
        bot.client.chat("/baltop "+ args[0]);

        setTimeout(() =>{
            saving.chat = false;
            if(!chatData.chat.length){
                chatData.chat[0] = "Try Again";
            }
            let embedBaltop = new Discord.MessageEmbed()
                .setTitle("Baltop")
                .setColor(config.general.embedColor)
                .setDescription(`\`\`\`${chatData.chat.join(`\n`)}\`\`\``)
                .setTimestamp(new Date())
                .setFooter(`${config.general.serverIP}`);
            message.channel.send(embedBaltop);
            chatData.hover.length = 0;
            chatData.chat.length = 0;
        }, 500)
    }
}