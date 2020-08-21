const mineflayer = require('mineflayer')
const Discord = require("discord.js");
const fs = require('fs');
const config = require('../config.json');

module.exports = {
    name: 'lms',
    alias: ['lastmanstanding'],
    category: "Factions",
    description: 'Shows Lms Timer',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.lms,
    execute(message, args, bot, chatData, saving, regex){
        saving.chat = true;
        regex.regex = /\bNext LMS\b/g
        bot.client.chat('/lms time')

        setTimeout(() => {
            saving.chat = false;
            if(!chatData.chat.length){
                chatData.chat[0] = "Try Again";
            }
            let embedLms = new Discord.MessageEmbed()
                .setTitle("LMS Information")
                .setColor(config.general.embedColor)
                .setDescription(`\`\`\`${chatData.chat.join('\n')}\`\`\``)
                .setTimestamp(new Date())
                .setFooter(`${config.general.serverIP}`);
            message.channel.send(embedLms);
            chatData.hover.length = 0;
            chatData.chat.length = 0;
        }, 500);
    }
}