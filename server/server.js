const app = require('./app');
const Conversation = require('./models/conversation');

const server = app.listen(app.get('port'), () => {
  console.log(
    `Up and running!\nFind the server at http://localhost:${app.get('port')}/`
  );
});

const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', (socket) => {
  socket.on('join', (user) => {
    connectedUsers[user.username] = socket;
    console.log(Object.keys(connectedUsers));
  });

  socket.on('leave', (user) => {
    delete connectedUsers[user.username];
    console.log(Object.keys(connectedUsers));
  });

  socket.on('new:message', (values) => {
    const { participants, subject, message } = values;
    // const { sender, text } = message;

    Conversation.find({
      participants: { $all: participants }
    }).then((conversation) => {
      if (conversation.length > 0) {
        conversation.messages.push({
          sender,
          message,
          isRed: false
        });

        conversation.save();
      } else {
        const newConversation = new Conversation({
          participants,
          subject
        });

        newConversation.save();
      }
    });
  });
});
