const config = require('../config.json')
const fs = require('fs');
const Discord = require('discord.js')
const {success} = require('../Storage/functions')

module.exports = {
	name: 'reload',
	category: "Bot",
	description: 'Reloads specified command',
	enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.reload,
	execute(message, args, bot, sending, chatData, startArg, endArgs) {
		if (!args.length) return message.channel.send(`You didn't pass any command to reload, ${message.author}!`)
			.then(msg => setTimeout(() => {
				msg.delete();
			}, 3000));;
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`)
			.then(msg => setTimeout(() => {
				msg.delete();
			}, 3000));;

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			console.log(`Reloaded Command - ${newCommand.name}`);
			success(message, `Reloaded Command \`${newCommand.name}\``)
				
		} catch (error) {
			console.log(error);
			message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``)
				.then(msg => setTimeout(() => {
					msg.delete();
				}, 3000));
		}
	},
};