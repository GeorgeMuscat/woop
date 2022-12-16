module.exports = {
	name: 'messageCreate',
	execute(message) {
		console.log(`message content: ${message.content}`);
	},
};