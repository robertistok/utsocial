import React, { Component } from 'react';

import Conversation from './Conversation';
import { socket } from '../../views/Authorized';

class ConversationContainer extends Component {
  sendMessage(values) {
    socket.emit('new:message', {
      participants: ['albasciprian93', 'bigboss'],
      subject: 'HW'
    });
  }

  render() {
    return <Conversation {...this.props} onSubmit={this.sendMessage} />;
  }
}

export default ConversationContainer;
