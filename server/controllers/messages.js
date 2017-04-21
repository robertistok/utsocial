const Conversation = require('../models/conversation');

function getConversationsOfUser(req, res, next) {
  const username = req.params.username;

  Conversation.find({ participants: { $in: [username] } })
    .slice('messages', 1)
    .then((conversations) => {
      res.send(conversations);
    });
}

module.exports = { getConversationsOfUser };
