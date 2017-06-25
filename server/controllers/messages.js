// disallow rule in favor of updating mongoose schemas
/* eslint no-param-reassign: 0*/
import mongoose from 'mongoose';

import Conversation from '../models/conversation';
import Student from '../models/student';
import Teacher from '../models/teacher';
import { connectedUsers, io } from '../server';

export function getConversationsOfUser(req, res, next) {
	const { userID } = req.params;

	Conversation.find({ 'participants._id': mongoose.Types.ObjectId(userID) })
		.slice('messages', -1)
		.then((conversations) => {
			res.send(
				conversations.sort(
					(c1, c2) => c2.messages[0].timestamp - c1.messages[0].timestamp
				)
			);
		})
		.catch(err => next(err));
}

export function getMessagesOfConversation(req, res, next) {
	const { id } = req.params;

	Conversation.findOne({ _id: id })
		.slice('messages', 25)
		.then((conversation) => {
			conversation.messages.sort((m1, m2) => m2.timestamp - m1.timestamp);
			res.send(conversation);
		})
		.catch(err => next(err));
}

export function readMessagesOfConversation(req, res, next) {
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
			return conversation.save();
		})
		.then(conversation =>
			res.send({
				message: `conversation ${conversation._id} was saved successfully`
			})
		)
		.catch(err => next(err));
}

export function starConversationForUser(req, res, next) {
	const { id, user } = req.body;

	Conversation.findOne({ _id: id })
		.then((conversation) => {
			const isStarred = conversation.starred.indexOf(user);

			if (isStarred === -1) {
				conversation.starred.push(user);
			} else {
				conversation.starred.splice(isStarred, 1);
			}

			return conversation.save();
		})
		.then(conversation => res.send({ starred: conversation.starred }))
		.catch(err => next(err));
}

export function newConversation(req, res, next) {
	const { target, sender, text, subject } = req.body;

	const newConversation = new Conversation({ subject });

	newConversation.messages.push({
		sender,
		text
	});

	Promise.all([
		Student.find(
			{ _id: { $in: [sender, target] } },
			'_id group semigroup firstname lastname gender'
		),
		Teacher.find(
			{ _id: { $in: [sender, target] } },
			'_id firstname lastname gender'
		)
	])
		.then((values) => {
			const [students, teachers] = values;
			const onlyRequiredFieldsStudents = students.map(student => ({
				_id: student._id,
				semigroup: student.semigroup,
				group: student.group,
				firstname: student.firstname,
				lastname: student.lastname,
				gender: student.gender,
				name: student.name
			}));

			newConversation.participants = [
				...teachers,
				...onlyRequiredFieldsStudents
			];

			return newConversation.save();
		})
		.then((newConversation) => {
			io.to(connectedUsers[target]).emit('new:thread', newConversation);
			return res.status(200).send({ newConversation });
		})
		.catch(err => next(err));
}

export function sendMessage(req, res, next) {
	const { conversationID, text, sender } = req.body;

	Conversation.findOneAndUpdate(
		{ _id: conversationID },
		{ $push: { messages: { sender, text } } },
		{ new: true }
	)
		.then((conv) => {
			const newMessage = conv.messages[conv.messages.length - 1];
			const receiver = conv.participants.find(p => p._id.toString() !== sender);

			io
				.to(connectedUsers[receiver._id])
				.emit('new:message', { conversationID, newMessage });
			return res.status(200).send({ newMessage, conversationID });
		})
		.catch(err => next(err));
}
