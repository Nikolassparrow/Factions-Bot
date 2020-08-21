const mineflayer = require('mineflayer')
const Discord = require("discord.js");
const fs = require('fs');
const config = require('../config.json');


module.exports = {
    name: 'forcefield',
    aliases: ['shield'],
    category: "Factions",
    description: 'Shows the shield information of a faction',
    enabled: true,
    execute(message, args, bot, chatData, saving, regex) {
        regex.regex = /\bForcefield\b/ig;
        saving.hover = true;
        bot.client.chat("/f show " + args[0]);


        setTimeout(() => {
            saving.hover = false;
            if (!chatData.chat.length) {
                chatData.chat[0] = "Try Again";
            }
            let embedFshield = new Discord.MessageEmbed()
                .setTitle("Forcefield " + "- " + args[0].substring(0,1).toUpperCase()+args[0].substring(1))
                .setColor(config.general.embedColor)
                .setDescription(`\`\`\`${chatData.hover.join('\n').replace(/(§c)|(§f)|(§l)|(§e)/g, "")}\`\`\``)
                .setTimestamp(new Date())
                .setFooter(`${config.general.serverIP}`);
            message.channel.send(embedFshield);
            chatData.hover.length = 0;
            chatData.chat.length = 0;
        }, 500);
    },
}