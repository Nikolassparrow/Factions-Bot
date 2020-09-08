const Discord = require("discord.js");
const config = require('../config.json');
const fs = require('fs');
const {warning, success} = require('../Storage/functions');

module.exports = {
    name: 'unlock',
    category: 'Moderation',
    description: 'Unlocks a channel',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.unlock,
    execute(message, args){
        if(!message.member.hasPermission("ADMINISTRATOR")) return warning(message, "You dont have permission")
        message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: null
        })
        success(message, `Unlocked ${message.channel} successfully. Use **${config.general.prefix}lock to re-lock this channel`)
    }
}