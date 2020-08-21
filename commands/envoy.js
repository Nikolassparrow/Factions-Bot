const mineflayer = require('mineflayer')
const Discord = require("discord.js");
const fs = require('fs');
const config = require('../config.json');

module.exports = {
    name: 'envoy',
    category: "Factions",
    description: 'Shows Envoy Timer',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.envoy,
    execute(message, args, bot, chatData, saving, regex){
        saving.chat = true;
        regex.regex = /\bNext envoy\b/g
        bot.client.chat('/envoy')
        
        setTimeout(() => {
            saving.chat = false;
            if(!chatData.chat.length){
                chatData.chat[0] = "Try Again";
            }
            let embedEnvoy = new Discord.MessageEmbed()
                .setTitle("Envoy Information")
                .setColor(config.general.embedColor)
                .setDescription(`\`\`\`${chatData.chat.join('\n')}\`\`\``)
                .setTimestamp(new Date())
                .setFooter(`${config.general.serverIP}`);
            message.channel.send(embedEnvoy);
            chatData.hover.length = 0;
            chatData.chat.length = 0;
        }, 500);
    }
}