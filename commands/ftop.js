const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');
module.exports = {
    name: 'ftop',
    category: 'Factions',
    description: 'Displays Faction Top Ranking',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.ftop,
    execute(message, args, bot, chatData, saving, regex) {

        var empty = false;
        saving.hover = true;
        regex.regex = /^[1-9#]|(Invalid, page must be between)/i;
        if (!args.length) {
            args[0] = "";
        }
        bot.client.chat(config.general.FtopCommand + " " + args[0]);

        setTimeout(() => {
            saving.hover = false;
            if (!chatData.chat.length) {
                chatData.chat[0] = "Try Again";
                empty = true;
            }
            if (empty) {
                empty = false;
                let embedSudo = new Discord.MessageEmbed()
                    .setColor(config.general.embedColor)
                    .setDescription(`\`\`\`${chatData.chat.join('\n')}\`\`\``);
                message.channel.send(embedSudo);
                chatData.chat.length = 0;
                return;
            }

            let factionNames = [];
            let currentWorth = [];
            let potentialWorth = [];

            chatData.hover = chatData.hover.toString().split("\n");
            chatData.hover.forEach(element => {
                if (element.match(/(Potential Worth:)/)) {
                    potentialWorth.push(element.split(" ")[2].replace("§d", ""));
                }
            });
            chatData.chat.forEach(element => {
                let split = element.split(" ");
                factionNames.push(split[0] + " " + split[1]);
                currentWorth.push(split[2]);
            });

            let embedFtop = new Discord.MessageEmbed()
                .setTitle("Faction Top")
                .setColor(config.general.embedColor)
                .addField("Factions", factionNames, true)
                .addField("Current Worth", currentWorth, true)
                .addField("Potential Worth", potentialWorth, true)
                .setTimestamp(new Date())
                .setFooter(`${config.general.serverIP}`);
            message.channel.send(embedFtop);
            chatData.chat.length = 0;
            chatData.hover.length = 0
        }, 250);
    },
}