/*
    ---------------------------------------------------------------------------------------------
    Beginner discord bot
    Current stage of learning: https://discordjs.guide/interactions/slash-commands.html#registering-slash-commands
    Written by: GMMDEV
    ---------------------------------------------------------------------------------------------
*/



// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits, Message } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config;
const token = process.env.TOKEN;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
        console.log(command.data.name);
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.on("messageCreate", async message => {
    if (/sku|gog|skog/.test(message.content)) {
        message.channel.send("<3");
    }
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was a error while executing this command!', ephemeral: true });
    }
});

// Login to Discord with your client's token
client.login(token);