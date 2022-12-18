const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with caller\'s user info!')
        .addUserOption(option => option.setName('target').setDescription('Select a user')),
        async execute(interaction) {
            const user = interaction.options.getUser('target');
        if (user){
            await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
        } else {
            await interaction.reply(`Your Username: ${interaction.user.username}\nID: ${interaction.user.id}`);
        }
    },
};