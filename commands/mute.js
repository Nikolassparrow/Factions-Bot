const config = require('../config.json')
const Discord = require('discord.js');
const moment = require('moment')
const ms = require("ms");
const {usage, warning, success} = require('../Storage/functions');

module.exports = {
    name: 'mute',
    category: "Moderation",
    description: 'Mutes a user',
    enabled: true,
    execute(message, args){
        let user = (message.mentions.members.first())
        let muteChannel = message.guild.channels.cache.get(config.channelIDs.modlogschannelID)
        let time = ((!args[1]) ? "10m" : args[1])
        let muted = message.guild.roles.cache.find(r => r.name === "Muted")

        if(!muted) return warning(message, "The Muted role doesn't exist. Please create one.")
        if(message.guild.member(user).roles.cache.find(r => r.name === "Muted")) return warning(message, `${user} is already Muted`)
        if(!message.member.hasPermission("ADMINISTRATOR")) return warning(message, "You don't have permission");
        if(!user) return usage(message, 'mute [user] <time>', "Mute")

        const embed = new Discord.MessageEmbed()
            .setTitle("Mute Information")
            .setColor(config.general.embedColor)
            .setDescription(`**Muted:** ${user}\n**Muted By:** ${message.author.tag}\n**Muted At:** ${moment(message.createdAt).format('MM/DD/YYYY @ hh:mm:ss a')}\n**Length:** ${time}`)
            if(!muteChannel) return warning(message, "Couldn't find Moderation Logs Channel")
            message.guild.member(user).roles.add(muted.id)
            success(message, `${user} has been muted`)
            muteChannel.send(embed)

            setTimeout(() => {
                message.guild.member(user).roles.remove(muted.id)
            }, ms(time))
        
        
    }
}