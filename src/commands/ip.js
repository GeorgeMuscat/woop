const { SlashCommandBuilder } = require('discord.js');
const { execSync } =  require('child_process');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ip')
        .setDescription('Gets the IP of the server this bot is running on.'),
    async execute(interaction) {
        try {
            const ip = execSync('curl ifconfig.co');
            await interaction.reply(`IP: ${ip}`);
        } catch (error) {
            await interaction.reply('Could not retrieve IP.');
        }
    }
};