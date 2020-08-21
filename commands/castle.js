const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');
module.exports = {
    name: 'castle',
    aliases: ['outpost'],
    category: 'Factions',
    description: 'Displays information about Castle',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.castle,
    execute(message, args, bot, chatData, saving, regex) {

        saving.hover = true;
        bot.client.chat(`/castle`)

        setTimeout(() => {
            saving.hover = false;
            if (!chatData.chat.length) {
                chatData.chat[0] = "Try Again";
            }
            let embedCastle = new Discord.MessageEmbed()
                .setTitle("Castle Information")
                .setColor(config.general.embedColor)
                .setDescription(`\`\`\`${chatData.hover[0].join(`\n`).replace(/(§r)|(§a)|(§2)|(§7)|(§l)|(§f)/g, "")}\`\`\``)
                .setTimestamp(new Date())
                .setFooter(`${config.general.serverIP}`);
            message.channel.send(embedCastle);
            chatData.hover.length = 0;
            chatData.chat.length = 0;
        }, 500);
    },
}