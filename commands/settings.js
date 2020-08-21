const Discord = require("discord.js");
const fs = require('fs');
let config = require('../config.json');

module.exports = {
    name: 'settings',
    description: 'Show and modify settings',
    category: "Bot",
    enabled: true,
    execute(message, args, prefix) {
        let option;
        let changed = false;
        let reload = false;
        let exists = false;

        if (!args.length) {
            let prefix = JSON.parse(fs.readFileSync('./config.json')).general.prefix;
            let commandNames = [];
            let commandDescriptions = []
            let commandEnabled = [];
            message.client.commands.forEach(cmd => commandNames.push(cmd.name.charAt(0).toUpperCase() + cmd.name.slice(1)));
            message.client.commands.forEach(cmd => commandDescriptions.push(cmd.description.charAt(0).toUpperCase() + cmd.description.slice(1)));
            message.client.commands.forEach(cmd => commandEnabled.push(cmd.enabled.toString().charAt(0).toUpperCase() + cmd.enabled.toString().slice(1)));
            let embedSettings = new Discord.MessageEmbed()
                .setTitle("Settings")
                .setColor(config.general.embedColor)
                .addField("Commands", commandNames, true)
                .addField("Enabled", commandEnabled, true)
                .setDescription(`
                    > **Settings Commands**
                    > ${prefix}settings enable [Command]
                    > ${prefix}settings disable [Command]
                    > ${prefix}settings prefix [String]
                    `);
            message.channel.send(embedSettings);
        } else {
            switch (args[0].toLowerCase()) {
                case "enable": {
                    if (args[1]) {
                        for (element in config.enableCommands) {
                            if (element.toLowerCase() == args[1].toLowerCase()) {
                                exists = true;
                                option = element;
                            }
                        }
                        if (exists) {
                            let embed = new Discord.MessageEmbed()
                                .setColor(config.general.embedColor)
                                .setDescription(`Enabled command ${config.general.prefix}${option.toUpperCase()}`)
                            message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                            config.enableCommands[option] = true;
                            changed = true;
                            reload = true;

                        }
                        else {
                            let embed = new Discord.MessageEmbed()
                                .setTitle("Enable Command")
                                .setColor(config.general.embedColor)
                                .setDescription(`Couldn't find ${config.general.prefix}${option}`)
                            message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                        }
                    } else {
                        let embed = new Discord.MessageEmbed()
                            .setColor(config.general.embedColor)
                            .setTitle("Usage")
                            .setDescription(`${config.general.prefix}settings enable [command]`);
                        message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                    }
                } break;

                case "disable": {
                    for (element in config.enableCommands) {
                        if (element.toLowerCase() == args[1].toLowerCase()) {
                            exists = true;
                            option = element;
                        }
                    }
                    if (exists) {
                        let embed = new Discord.MessageEmbed()
                            .setColor(config.general.embedColor)
                            .setDescription(`Disabled command ${config.general.prefix}${option.toUpperCase()}`)
                        message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                        config.enableCommands[option] = false;
                        changed = true;
                        reload = true;
                    }
                    else {
                        let embed = new Discord.MessageEmbed()
                            .setTitle("Disable Command")
                            .setColor(config.general.embedColor)
                            .setDescription(`Couldn't find ${config.general.prefix}${option}`)
                        message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                    }
                } break;
                case "prefix": {
                    if (!args[1]) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle("Usage")
                            .setDescription(`${prefix.value}settings prefix [String]`)
                            .setColor(config.general.embedColor);
                        message.channel.send(embed);
                        return;
                    }
                    for (element in config) {
                        if (element == "prefix") {
                            prefix.value = args[1];
                            config[element] = args[1];
                            changed = true;
                            if (changed) {
                                let embed = new Discord.MessageEmbed()
                                    .setTitle("Settings")
                                    .setDescription(`Changed prefix to \`${prefix.value}\``)
                                    .setColor(config.general.embedColor);
                                message.channel.send(embed);
                            }
                        }
                    }
                } break;
                default: {
                    let embed = new Discord.MessageEmbed()
                        .setDescription(`Invalid setting \`${args[0]}\`. Try again.`)
                        .setColor(config.general.embedColor);
                    message.channel.send(embed);
                }
            }
            if (changed) {
                fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
                if (reload) {
                    let command = [option];
                    require('./reload').execute(message, command);
                }

            }
        }

    }
}