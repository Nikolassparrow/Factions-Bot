const mineflayer = require('mineflayer')
const Discord = require("discord.js");
const fs = require('fs');
const config = require('../config.json');
const { clearWhitelist } = require('../Storage/functions');

module.exports = {
    name: 'whitelist',
    alias: ['iam'],
    description: 'Whitelists your minecraft name to your discord account',
    category: 'Factions',
    enabled: true,
    execute(message, args, bot){
      let code = `$${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`
        let whitelisted = message.mentions.members.first() || message.members.cache.get(args[0])
        console.log(whitelisted)
        console.log(code)
        //console.log(checkWhitelist())
        
        let embedCode = new Discord.MessageEmbed()
            .setColor(config.general.embedColor)
            .setTitle("Whitelist")
            .setThumbnail(`${message.guild.iconURL}`)
            .setDescription(`Whitelist Code: ${code} \n\n Log onto ${config.general.serverIP} and message ${bot.client.username} the code.`)
            .setTimestamp(new Date())
            .setFooter(`Usage: /msg ${bot.client.username} \`${code}\` `)
        whitelisted.send(embedCode)
        code.length = 0;
    }
}