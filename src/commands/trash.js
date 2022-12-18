const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

const getUrl = async () => {
    const res = await axios.get('https://some-random-api.ml/img/raccoon');
    let data = res.data;
    return data.link;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trash')
        .setDescription('pandamonium!'),
    async execute(interaction) {
        await interaction.reply(await getUrl());
    },
};


