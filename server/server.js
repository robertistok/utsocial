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
		// console.log(Object.keys(connectedUsers));
	});

	socket.on('leave', (data) => {
		delete connectedUsers[data.username];
		// console.log(Object.keys(connectedUsers));
	});

	socket.on('subscribeToRoom', (data) => {
		const { room } = data;

		socket.join(room);
	});

	socket.on('leaveRoom', (data) => {
		const { room } = data;

		socket.leave(room);
	});

	socket.on('send:message', (data) => {
		const { id, text, sender } = data;

		Conversation.findOne({ _id: id }).then((conversation) => {
			conversation.messages.push({ sender, text });
			conversation.save();

			const newMessage =
				conversation.messages[conversation.messages.length - 1];

			io.sockets.in(id).emit('new:message', newMessage);
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
