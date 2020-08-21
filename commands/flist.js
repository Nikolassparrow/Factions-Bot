const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');
module.exports = {
    name: 'flist',
    category: 'Factions',
    description: 'Displays Factions List',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.flist,
    execute(message, args, bot, chatData, saving, regex) {

        saving.chat = true;
        regex.regex = /\bfactionless\b|\bonline\b/i;

        bot.client.chat("/f list");

        setTimeout(() => {
            saving.chat = false;
            if (!chatData.chat.length) {
                chatData.chat[0] = "Try Again";
            }
            let embedFlist = new Discord.MessageEmbed()
                .setTitle("Faction list")
                .setColor(config.general.embedColor)
                .setDescription(`\`\`\`${chatData.chat.join('\n')}\`\`\``)
                .setTimestamp(new Date())
                .setFooter(`${config.general.serverIP}`);
            message.channel.send(embedFlist);
            chatData.hover.length = 0;
            chatData.chat.length = 0;
        }, 500);

    },
}