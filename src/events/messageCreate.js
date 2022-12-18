const sku = '318739598899412992';
require('dotenv').config();

module.exports = {
	name: 'messageCreate',
	execute(message) {
		if (message.author.id === sku && /gog|\:\(/.test(message.content)) {
			console.log('Sent patpat to sku');
			message.author.send("https://tenor.com/view/pat-garrys-mod-garrys-mod-physics-fast-intense-gif-26322619");
		}

		// doot reply
		if (message.author.id !== process.env.CLIENT_ID && /doot/.test(message.content)) {
			message.client.channels.cache.get(message.channelId).send('doot')
		}
		console.log(`Message from ${message.author.tag} at ${message.createdAt}\n` +
					`Guild: ${message.channel.guild.name}\n` +
					`Channel: ${message.channel.name}\n` +
					`Content: ${message.content}\n`);
	},
};