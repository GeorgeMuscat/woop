const { default: axios } = require('axios');
const { SlashCommandBuilder } = require('discord.js');

const postURL = async (data) => {
    const res = await axios.post('http://woop.li/create', data);
    data = res.data;
    return data.slug;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shorten')
        .setDescription('Shortens a URL.')
        .addStringOption(option => option.setName('url').setDescription('The URL to be shortened.').setRequired(true))
        .addStringOption(option => option.setName('slug').setDescription('Optional slug.')),
    async execute(interaction) {
        let data = {};
        if (URL) {
            data['dest'] = URL;
            if (slug) {
                data['slug'] = slug;
            }
        } else {
            await interaction.reply('Invalid input.')
        }
        await interaction.reply(`You short link is: http://woop.li/${postURL(data)}`);
    },
};