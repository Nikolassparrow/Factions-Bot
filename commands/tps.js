const mineflayer = require('mineflayer')
const Discord = require("discord.js");
const fs = require('fs');
const config = require('../config.json');


module.exports = {
    name: 'TPS',
    aliases: ['tps'],
    category: "Factions",
    description: 'Shows current TPS of the server',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.tps,
    execute(message, args, bot) {
        let embedTPS = new Discord.MessageEmbed()
            .setTitle("Current TPS")
            .setColor(config.general.embedColor)
            .setDescription(`> **${bot.client.getTps()}**`)
            .setTimestamp(new Date())
            .setFooter(`${config.general.serverIP}`);
        message.channel.send(embedTPS);
    },
}