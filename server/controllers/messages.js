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
		})
		.catch(err => next(err));
}

function getMessagesOfConversation(req, res, next) {
	const id = req.params.id;

	Conversation.findOne({ _id: id })
		.slice('messages', 25)
		.then((conversation) => {
			conversation.messages = conversation.messages.sort(
				(m1, m2) => m1.timestamp < m2.timestamp
			);
			res.send(conversation);
		})
		.catch(err => next(err));
}

function readMessagesOfConversation(req, res, next) {
	const id = req.params.id;

	Conversation.findOne({ _id: id })
		.then((conversation) => {
			conversation.messages = conversation.messages
				.slice(0, 20)
				.map((message) => {
					if (message.unread) {
						message.unread = false;
					}

					return message;
				});
			conversation.save();

			res.send({ message: 'succes' });
		})
		.catch(err => next(err));
}

function starConversationForUser(req, res, next) {
	const { id, user } = req.body;

	Conversation.findOne({ _id: id })
		.then((conversation) => {
			const isStarred = conversation.starred.indexOf(user);

			if (isStarred === -1) {
				conversation.starred.push(user);
			} else {
				conversation.starred.splice(isStarred, 1);
			}

			conversation.save();
			res.send({ starred: conversation.starred });
		})
		.catch(err => next(err));
}

module.exports = {
	getConversationsOfUser,
	getMessagesOfConversation,
	readMessagesOfConversation,
	starConversationForUser
};
