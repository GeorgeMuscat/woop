const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

const getUrl = async () => {
    const res = await axios.get('https://api.thecatapi.com/v1/images/search');
    let data = res.data;
    return data[0].url
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Replies with a random image of a cat!'),
    async execute(interaction) {
        await interaction.reply(await getUrl());
    },
};

https://random-d.uk/api/v2/random