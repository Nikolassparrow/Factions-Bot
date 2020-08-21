const Discord = require('discord.js');
const config = require("../config.json")


module.exports = {
    name: 'Avatar',
    enabled: true,
    category: "Miscellaneous",
    aliases: ['Av', 'avatar', 'AV', 'Avatar', 'av'],
    description: 'Displays avatar of specified user',
    execute(message, args) {
        if (message.mentions.roles.first() && args.length) {
            let embed = new Discord.MessageEmbed()
                .setTitle("Avatar")
                .setColor(config.general.embedColor)
                .setDescription(`Please mention a user instead of a role`)
            message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
            return;
        }
        if (!args.length) {
            let avatar = new Discord.MessageEmbed()
                .setTitle(message.guild.member(message.author).displayName)
                .setColor(config.general.embedColor)
                .setDescription(`**User:** ${message.author.username}#${message.author.discriminator}
					**ID:** ${message.author.id}`)
                .setImage(message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));
            message.channel.send(avatar);
        }
        else {
            let taggedUser = message.mentions.users.first();
            let avatar = new Discord.MessageEmbed()
                .setTitle(message.guild.member(taggedUser).displayName)
                .setColor(config.general.embedColor)
                .setDescription(`**User:** ${taggedUser.username}#${taggedUser.discriminator}
                    **ID:** ${taggedUser.id}`)
                .setImage(taggedUser.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));
            message.channel.send(avatar);
        }
    }
}