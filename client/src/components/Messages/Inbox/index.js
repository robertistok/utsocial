import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as messagesActions from '../../../redux/messages';
import Inbox from './Inbox';
import { socket } from '../../../views/Authorized';

class InboxContainer extends Component {
  componentDidMount() {
    this.props.getConversationsOfUser(this.props.user.username);

    socket.on('new:thread', value => this.props.addNewConversation(value));
  }

  render() {
    return <Inbox {...this.props} />;
  }
}

const mapStateToProps = state => ({
  conversations: state.messages.conversations,
  user: state.auth.user
});

export default connect(mapStateToProps, messagesActions)(InboxContainer);
