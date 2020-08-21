const mineflayer = require('mineflayer')
const Discord = require("discord.js");
const fs = require('fs');
const config = require('../config.json');

module.exports = {
    name: 'fstatus',
    alias: ['status'],
    category: 'Factions',
    description: 'Displays information about Fstatus',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.fstatus,
    execute(message, args, bot, chatData, saving, regex){

        saving.chat = true;
        regex.regex = /\b|\b/i

        if (!args.length) args[0] = "";
        bot.client.chat(`/f status ${args[0]}`)

        setTimeout(() => {
            saving.chat = false;
            if(!chatData.chat.length){
                chatData.chat[0] = "Try again";
            }
            let embedFstatus = new Discord.MessageEmbed()
                .setTitle('FStatus Information')
                .setColor(config.general.embedColor)
                .setDescription(`\`\`\`${chatData.chat.join('\n')}\`\`\``)
                .setTimestamp(new Date())
                .setFooter(`${config.general.serverIP}`);
            message.channel.send(embedFstatus);
            chatData.hover.length = 0
            chatData.chat.length = 0;
        }, 500)
    }
}