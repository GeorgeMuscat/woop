const sku = '318739598899412992';

module.exports = {
	name: 'messageCreate',
	execute(message) {
		if (message.author.id === sku && /gog|\:\(/.test(message.content)) {
			console.log('Sent patpat to sku');
			message.author.send("https://tenor.com/view/pat-garrys-mod-garrys-mod-physics-fast-intense-gif-26322619");
		} else if (/doot/.test(message.content)) {
			message.channel.send("doot");
		}
		console.log(`message content: ${message.content}`);
	},
};