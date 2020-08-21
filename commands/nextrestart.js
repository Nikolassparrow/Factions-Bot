const mineflayer = require('mineflayer')
const Discord = require("discord.js");
const fs = require('fs');
const config = require('../config.json');
const { aliases } = require('./vanish');

module.exports = {
    name: "nextrestart",
    aliases: ['nextreboot', 'restarttimer', 'serverreboot'],
    category: "Factions", 
    description: 'Displays when the next server reboot will be',
    enabled: true,
    execute(message, args, bot, chatData, saving, regex){
        saving.chat = true;
        regex.regex = /\bnext restart\b/g
        bot.client.chat('/restart')

        setTimeout(() => {
            saving.chat = false;
            if(!chatData.chat.length){
                chatData.chat[0] = "Try Again";
            }
            let embedNextRestart = new Discord.MessageEmbed()
                .setTitle("Server Restart Information")
                .setColor(config.general.embedColor)
                .setDescription(`\`\`\`${chatData.chat.join('\n')}\`\`\``)
                .setTimestamp(new Date())
                .setFooter(`${config.general.serverIP}`);
            message.channel.send(embedNextRestart);
            chatData.hover.length = 0;
            chatData.chat.length = 0;
        }, 500);
    }
}