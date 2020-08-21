const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');
module.exports = {
    name: 'fshow',
    aliases: ['show', 'fwho'],
    category: 'Factions',
    description: 'Displays information about specified faction',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.fshow,
    execute(message, args, bot, chatData, saving, regex) {

        saving.chat = true;
        regex.regex = /[:|*+,-]|\bnone\b|(\_)\1+/i;

        if (!args.length) args[0] = "";
        bot.client.chat(`/f show ${args[0]}`)

        setTimeout(() => {
            saving.chat = false;
            if (!chatData.chat.length) {
                chatData.chat[0] = "Try Again";
            }
            let embedFshow = new Discord.MessageEmbed()
                .setColor(config.general.embedColor)
                .setDescription(`\`\`\`${chatData.chat.join('\n')}\`\`\``)
                .setTimestamp(new Date())
                .setFooter(`${config.general.serverIP}`);
            message.channel.send(embedFshow);
            chatData.hover.length = 0;
            chatData.chat.length = 0;

        }, 750);
    },
}