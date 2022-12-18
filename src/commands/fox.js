const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

const getUrl = async () => {
    const res = await axios.get('https://randomfox.ca/floof/');
    let data = res.data;
    console.log(data);
    return data.image;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fox')
        .setDescription('Replies with a random image of a fox!'),
    async execute(interaction) {
        await interaction.reply(await getUrl());
    },
};