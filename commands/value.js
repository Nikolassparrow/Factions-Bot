const mineflayer = require('mineflayer')
const Discord = require("discord.js");
const fs = require('fs');
const config = require('../config.json');


module.exports = {
    name: 'value',
    category: "Factions",
    description: 'Shows the value of specified faction',
    enabled: true,
    execute(message, args, bot, chatData, saving, regex) {

        regex.regex = args[0].toLowerCase();
        saving.hover = true;
        
        bot.client.chat("/f top");
        bot.client.chat("/f top 2");
        bot.client.chat("/f top 3");
        bot.client.chat("/f top 4");
        bot.client.chat("/f top 5");
        bot.client.chat("/f top 6");
        bot.client.chat("/f top 7");
        

        
        setTimeout(() => {
            saving.hover = false;
            if (!chatData.length) {
                chatData.chat[0] = "No Value";
            }
            let embedFshield = new Discord.MessageEmbed()
                .setTitle("Value " + "- " + args[0].substring(0,1).toUpperCase()+args[0].substring(1))
                .setColor(config.general.embedColor)
                .setDescription(`\`\`\`${chatData.hover.join("\n").replace(/(§c)|(§f)|(§l)|(§e)|(§7)|(§o)|(§r)|(§d)/g, "")}\`\`\``)
                .setTimestamp(new Date())
                .setFooter(`${config.general.serverIP}`);
            message.channel.send(embedFshield);
            chatData.hover.length = 0;
            chatData.chat.length = 0;
        }, 500);
    },
}