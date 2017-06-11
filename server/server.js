const socketIO = require('socket.io');

const app = require('./app');
const Conversation = require('./models/conversation');
const Student = require('./models/student');
const Teacher = require('./models/teacher');

const server = app.listen(app.get('port'), () => {
	console.log(
		`Up and running!\nFind the server at http://localhost:${app.get('port')}/`
	);
});

export const io = socketIO(server);

export const connectedUsers = {};

io.on('connection', (socket) => {
	socket.on('join', (data) => {
		connectedUsers[data._id] = socket.id;
	});

	socket.on('leave', (data) => {
		delete connectedUsers[data._id];
	});

	socket.on('send:message', (data) => {
		const { id, text, sender } = data;

		Conversation.findOne({ _id: id }).then((conversation) => {
			conversation.messages.push({ sender, text });
			conversation.save().then((conv) => {
				const newMessage = conv.messages[conv.messages.length - 1];
				const receiver = conv.participants.find(
					p => p._id.toString() !== sender
				);

				io
					.to(connectedUsers[receiver._id])
					.emit('new:message', { convID: id, newMessage });
				socket.emit('new:message', { convID: id, newMessage });
			});
		});
	});

	socket.on('new:thread', (data) => {
		const { target, sender, text, subject } = data;

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
		]).then((values) => {
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

			newConversation.save(() => {
				socket.emit('message:sent', newConversation);
				io.to(connectedUsers[target]).emit('new:thread', newConversation);
			});
		});
	});
});
