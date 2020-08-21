const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');
module.exports = {
    name: 'raredrop',
    aliases: ['td', 'treasuredrop'],
    category: 'Factions',
    description: 'Shows information about upcoming rare drop',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.raredrop,
    execute(message, args, bot, chatData, saving, regex) {

        saving.chat = true;
        regex.regex = /\bdrop\b|\blocation\b|\btype\b/i;

        bot.client.chat("/td");

        setTimeout(() => {
            saving.chat = false;
            if (!chatData.chat.length) {
                chatData.chat[0] = "Try Again";
            }
            let embedRaredrop = new Discord.MessageEmbed()
                .setTitle("Rare Drop Information")
                .setColor(config.general.embedColor)
                .setDescription(`\`\`\`${chatData.chat.join('\n')}\`\`\``)
                .setTimestamp(new Date())
                .setFooter(`${config.general.serverIP}`);
            message.channel.send(embedRaredrop);
            chatData.hover.length = 0;
            chatData.chat.length = 0;
        }, 250);
    },
}