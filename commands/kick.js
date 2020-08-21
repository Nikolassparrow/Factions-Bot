const config = require('../config.json')
const Discord = require('discord.js');
const {usage, warning} = require('../Storage/functions');

module.exports = {
    name: 'kick',
    category: "Moderation",
    description: 'Kicks a user from the Discord',
    enabled: true,
    execute(message, args){
        let user = (message.mentions.members.first())
        let kickChannel = message.guild.channels.cache.get(config.channelIDs.modlogschannelID)

        if(!user) return usage(message, "kick [user] <reason> ", "Kick")
        if(!message.member.hasPermission("ADMINISTRATOR")) return warning(message, "You don't have permission")
        if(user.roles.highest.position >= message.member.roles.highest.position) return warning(message, "You can't kick this person.")
        let reason = ((!args.join(" ").slice(22)) ? "none" : args.join(" ").slice(22));

        setTimeout(() => {
            let kickEmbed = new Discord.MessageEmbed()
                .setTitle("Kick Information")
                .setColor(config.general.embedColor)
                .setDescription(`**Kicked:** ${user}\n **Kicked By:** ${message.author.tag}\n**Reason:** ${reason}`)
                .setTimestamp(new Date())
            if(!kickChannel){return warning(message, "Couldn't find Moderation Logs Channel")}
            kickChannel.send(kickEmbed)
            message.guild.member(user).kick(reason).catch(() => {
                warning(message, "I don't have the correct permissions to kick this user.")
            })
        }, 500);
    }
}