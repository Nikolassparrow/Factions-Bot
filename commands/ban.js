const config = require('../config.json')
const Discord = require('discord.js');
const {usage, warning, getChannel, success} = require('../Storage/functions');

module.exports = {
    name: 'ban',
    category: "Moderation",
    description: 'Bans a user from the Discord',
    enabled: true,
    execute(message, args){
       let user = message.mentions.members.first()

        if(!user) return usage(message, "ban [user] <reason> ", "Ban")
        if(!message.member.hasPermission("ADMINISTRATOR")) return warning(message, "You don't have permission")
        if(user.roles.highest.position >= message.member.roles.highest.position) return warning(message, "You can't ban this person.")
        let reason = ((!args.join(" ").slice(22)) ? "none" : args.join(" ").slice(22));

        setTimeout(() => {
            let banEmbed = new Discord.MessageEmbed()
                .setTitle("Ban Information")
                .setColor(config.general.embedColor)
                .setDescription(`**Banned:** ${user}\n **Banned By: ** ${message.author.tag}\n**Reason:** ${reason}`)
                .setTimestamp(new Date())
            if(!getChannel(config.channelIDs.modlogschannelID)) return warning(message, "Couldn't find Moderation Logs Channel")
            success(message, `${user} has been banned.`)
            getChannel(message, config.channelIDs.modlogschannelID).send(banEmbed)
            message.guild.members.ban(user, {
                reason,
                reason
            }).catch(() => {
                warning(message, "I dont have the correct permissions to ban this user.")
            }, 500);
        })
    }
}