const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');
module.exports = {
    name: 'rpost',
    aliases: ['raidingoutpost', 'raidingpost'],
    category: 'Factions',
    description: 'Displays information about Raiding Outpost',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.rpost,
    execute(message, args, bot, chatData, saving, regex) {

        saving.chat = true;
        regex.regex = /\braiding outpost\b/i;

        bot.client.chat(`/rpost`)

        setTimeout(() => {
            saving.chat = false;
            if (!chatData.chat.length) {
                chatData.chat[0] = "Try Again";
            }
            let embedRpost = new Discord.MessageEmbed()
                .setTitle("Raiding Outpost Information")
                .setColor(config.general.embedColor)
                .setDescription(`\`\`\`${chatData.chat.join('\n')}\`\`\``)
                .setTimestamp(new Date())
                .setFooter(`${config.general.serverIP}`);
            message.channel.send(embedRpost);
            chatData.hover.length = 0;
            chatData.chat.length = 0;


        }, 500);
    },
}