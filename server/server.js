const app = require('./app');
const Conversation = require('./models/conversation');
const Student = require('./models/student');
const Teacher = require('./models/teacher');

const server = app.listen(app.get('port'), () => {
	console.log(
		`Up and running!\nFind the server at http://localhost:${app.get('port')}/`
	);
});

const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', (socket) => {
	socket.on('join', (data) => {
		connectedUsers[data.username] = socket.id;
	});

	socket.on('leave', (data) => {
		delete connectedUsers[data.username];
	});

	socket.on('send:message', (data) => {
		const { id, text, sender } = data;

		Conversation.findOne({ _id: id }).then((conversation) => {
			conversation.messages.push({ sender, text });
			conversation.save().then((conv) => {
				const newMessage = conv.messages[conv.messages.length - 1];
				const receiver = conv.participants.find(p => p.username !== sender)
					.username;

				io
					.to(connectedUsers[receiver])
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
			Student.find({ username: { $in: [sender, target] } }),
			Teacher.find({ username: { $in: [sender, target] } })
		]).then((values) => {
			const [students, teachers] = values;

			newConversation.participants = teachers.concat(students);

			socket.emit('message:sent', newConversation);
			io.to(connectedUsers[target]).emit('new:thread', newConversation);

			newConversation.save();
		});
	});
});
