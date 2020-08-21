const config = require('../config.json')
const fs = require('fs');
module.exports = {
    name: 'purge',
    category: "Moderation",
    description: 'Deletes the amount of messages specified',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.purge,
    execute(message, args, bot, sending, chatData, startArg, endArgs) {
        let amount;
        if (!args.length) {
            amount = 10;
        }
        else {
            amount = parseInt(args[0]) + 1;
        }
        message.channel.messages.fetch(amount).then(msgs => message.channel.bulkDelete(msgs));
    },
}