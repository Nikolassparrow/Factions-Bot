const Discord = require("discord.js");
const config = require('../config.json');
const fs = require('fs');
const {warning, success} = require('../Storage/functions');

module.exports = {
    name: 'lock',
    category: 'Moderation',
    description: 'Locks a channel from sending messages',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.lock,
    execute(message, args){
        if(!message.member.hasPermission("ADMINISTRATOR")) return warning(message, "You don't have permission")
        message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
        })
        success(message, `Locked ${message.channel} successfully. Use **${config.general.prefix}unlock to re-open this channel`)
    }
}