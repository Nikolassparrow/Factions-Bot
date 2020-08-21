const mineflayer = require('mineflayer')
const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');

module.exports = {
    name: 'grace',
    category: 'Factions',
    description: 'Displays information about grace period',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.grace,
    execute(message, args, bot, chatData, saving, regex){
        saving.chat = true;
        regex.regex = /\bgrace period\b/i;

        bot.client.chat('/grace')

        setTimeout(() => {
            saving.chat = false;
            if(!chatData.chat.length){
                chatData.chat[0] = "Try Again";
            }
            let embedGrace = new Discord.MessageEmbed()
                .setTitle("Grace Period Information")
                .setColor(config.general.embedColor)
                .setDescription(`\`\`\`${chatData.chat.join('\n')}\`\`\``)
                .setTimestamp(new Date())
                .setFooter(`${config.general.serverIP}`);
            message.channel.send(embedGrace);
            chatData.hover.length = 0;
            chatData.chat.length = 0;
        }, 500);
    }
}
