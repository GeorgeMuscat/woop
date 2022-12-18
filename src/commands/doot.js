const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('doot')
        .setDescription('doot'),
    async execute(interaction) {
        await interaction.reply('doot');
    },
};