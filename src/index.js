/* 
    ---------------------------------------------------------------------------------------------
    Beginner discord bot
    Current stage of learning: https://discordjs.guide/interactions/slash-commands.html#registering-slash-commands
    Written by: GMMDEV
    ---------------------------------------------------------------------------------------------
*/



const fs = require('node:fs');
const path = require('node:path');
// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { readdirSync } = require('node:fs');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


client.commands = new Collection();

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


client.on('interactionCreate', async interaction => {
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