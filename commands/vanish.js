const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');
module.exports = {
    name: 'vanish',
    aliases: ['v'],
    category: 'Factions',
    description: 'Displays players in Vanish',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.vanish,
    execute(message, args, bot, chatData, saving, regex){
        saving.chat = true
        
    }
}
