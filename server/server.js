import socketIO from 'socket.io';

import app from './app';

const server = app.listen(app.get('port'), () => {
	console.log(
		`Up and running!\nFind the server at http://localhost:${app.get('port')}/`
	);
});

export const connectedUsers = {};
export const io = socketIO(server);

io.on('connection', (socket) => {
	socket.on('join', (data) => {
		connectedUsers[data._id] = socket.id;
	});

	socket.on('leave', (data) => {
		delete connectedUsers[data._id];
	});
});
