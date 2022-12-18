const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const ip = require('./commands/ip');
require('dotenv').config();
const token = process.env.TOKEN;
const guildId = process.env.GUILD_ID;
const clientId = process.env.CLIENT_ID;

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

var ipCommand = null;
// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	const data = command.data.toJSON();
	if (data.name === 'ip') {
		ipCommand = data;
		continue;
	}
	commands.push(data);
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!


const refresh = async () => {
	try {
		console.log(`Started refreshing ${commands.length + (ipCommand !== null ? 1 : 0)} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		if (ipCommand !== null) {
			await rest.put(
				Routes.applicationGuildCommands(clientId, guildId),
				{ body: [ipCommand] },
			);

		}

		console.log(`Successfully reloaded ${data.length + (ipCommand !== null ? 1 : 0)} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
};
module.exports = { refresh }
