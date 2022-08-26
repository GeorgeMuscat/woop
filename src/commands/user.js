const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with caller\'s user info!'),
    async execute(interaction) {
        await interaction.reply(`Your Username: ${interaction.user.username}\nYour id: ${interaction.user.id}`);
    },
};