const Discord = require("discord.js");
const config = require("../config.json");
const {success} = require('../Storage/functions')

module.exports = {
    name: 'restart',
    category: "Bot",
    description: 'Restarts the bot to the server',
    enabled: true,
    execute(message, args, bot) {
           success(message, `Bot is restarting...`);
        setTimeout(() => {
            process.exit();
        }, 3000);
    },
}