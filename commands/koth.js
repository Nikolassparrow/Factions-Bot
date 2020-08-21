const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');
module.exports = {
    name: 'koth',
    category: 'Factions',
    description: 'Displays information about Koth',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.koth,
    execute(message, args, bot, chatData, saving, regex) {

        saving.chat = true;
        regex.regex = /\bkoth\b/i;

        bot.client.chat(`/koth`)

        setTimeout(() => {
            saving.chat = false
            if (!chatData.chat.length) {
                chatData.chat[0] = "Try Again";
            }
            let embedKoth = new Discord.MessageEmbed()
                .setTitle("Koth Information")
                .setColor(config.general.embedColor)
                .setDescription(`\`\`\`${chatData.chat.join('\n')}\`\`\``)
                .setTimestamp(new Date())
                .setFooter(`${config.general.serverIP}`);
            message.channel.send(embedKoth);
            chatData.hover.length = 0;
            chatData.chat.length = 0;
        }, 500);
    },
}