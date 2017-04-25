const Conversation = require('../models/conversation');

function getConversationsOfUser(req, res, next) {
	const username = req.params.username;

	Conversation.find({ 'participants.username': username })
		.slice('messages', -1)
		.then((conversations) => {
			res.send(
				conversations.sort(
					(c1, c2) => c1.messages[0].timestamp < c2.messages[0].timestamp
				)
			);
		});
}

function getMessagesOfConversation(req, res, next) {
	const id = req.params.id;

	Conversation.findOne({ _id: id })
		.slice('messages', 25)
		.then(conversation => res.send(conversation));
}

module.exports = { getConversationsOfUser, getMessagesOfConversation };
