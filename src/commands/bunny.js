const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

const getUrl = async () => {
    const res = await axios.get('https://api.bunnies.io/v2/loop/random/?media=gif');
    let data = res.data;
    return data.media.gif;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bunny')
        .setDescription('Replies with a random gif of a bunny!'),
    async execute(interaction) {
        await interaction.reply(await getUrl());
    },
};
