import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import * as messagesActions from '../../../redux/messages';
import Inbox from './Inbox';
import { socket } from '../../../views/Authorized';

class InboxContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstTime: true
    };
  }

  componentDidMount() {
    this.props.getConversationsOfUser(this.props.user.username);

    socket.on('new:thread', value => this.props.addNewConversation(value));
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.firstTime &&
      nextProps.conversations !== null &&
      nextProps.conversations.length !== 0
    ) {
      const { conversations } = nextProps;
      const { selectConversation } = this.props;
      selectConversation(conversations[0]._id);
      this.setState({ firstTime: false });
    }
  }

  render() {
    return <Inbox {...this.props} />;
  }
}

const mapStateToProps = state => ({
  conversations: state.messages.conversations,
  selectedConversation: state.messages.selectedConversation,
  isLoading: state.messages.loading,
  user: state.auth.user
});

export default connect(mapStateToProps, messagesActions)(InboxContainer);
