const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
	participants: [],
	subject: String,
	messages: [
		{
			sender: String,
			text: String,
			timestamp: {
				type: Date,
				default: Date.now,
				required: true
			},
			unread: {
				type: Boolean,
				default: true
			}
		}
	],
	starred: [String]
});

const Conversation = mongoose.model('conversation', ConversationSchema);

module.exports = Conversation;
