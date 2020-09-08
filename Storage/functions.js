const config = require('../config.json')
const Discord = require('discord.js');

module.exports =  {
    checkWhitelist: function (id, calling){
        fs.readFile("./Storage/settings.json", "utf8", function (err, data){
            try{
                var setting = JSON.parse(data);
                fs.readFile("./Storage/whitelist.json", "utf8", function (err, data){
                    var whitelist = JSON.parse(data);
                    for(let i in whitelist){
                        if(whitelist[i].ign == id){
                            calling(setting, i)
                        }
                    }
                })
            } catch (err){
                message.channel.send(`\`\`\`${err}\`\`\``).then(msg => {
                    msg.delete({ timeout: 3000 })
                });
            }
        })
    },
    
    clearWhitelist: function (message, calling){
        fs.readFile("./Storage/whitelist.json", "utf8", function(err, data){
            try{
                var whitelist = JSON.parse(data);
                calling(whitelist);
            } catch (err) {
                message.channel.send(`\`\`\`${err}\`\`\``).then(msg => {
                    msg.delete({ timeout: 3000 })
                });
            }
        })
    },

    warning: function(message, sent){
        const embed = new Discord.MessageEmbed()
            .setTitle("Warning")
            .setDescription(`:warning: ${sent}`)
            .setColor(config.general.embedColor);
        message.channel.send(embed);
    },

    usage: function (message, sent, command) {
        const embed = new Discord.MessageEmbed()
            .setTitle(`**${command} Help**`)
            .setDescription(`:warning: Improper usage for this command.\n**Usage**: ${config.general.prefix}${sent}`)
            .setColor(config.general.embedColor);
        message.channel.send(embed);
    },

    success: function(message, sent){
            const embed = new Discord.MessageEmbed()
                .setTitle("**Success**")
                .setDescription(":white_check_mark: " + sent)
                .setColor(config.general.embedColor);
            message.channel.send(embed); 
    },

    getchannel: function(message, id){
        return message.guild.channels.cache.get(id)
    }

}