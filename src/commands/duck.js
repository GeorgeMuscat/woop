const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

const getUrl = async () => {
    const res = await axios.get('https://random-d.uk/api/v2/random');
    let data = res.data;
    return data.url
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('duck')
        .setDescription('Duck!'),
    async execute(interaction) {
        await interaction.reply(await getUrl());
    },
};
