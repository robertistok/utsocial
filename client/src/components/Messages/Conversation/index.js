import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { Redirect } from 'react-router';

import Conversation from './Conversation';
import { socket } from '../../../views/Authorized';
import { addNewMessage } from '../../../redux/messages';
import { withMaybe, withEither } from '../../hocs';

class ConversationContainer extends Component {
  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    const {
      match: { params: { conversationID } },
      loggedInUser
    } = this.props;
    socket.on('new:message', message => this.props.addNewMessage(message));
    socket.emit('subscribeToRoom', {
      room: conversationID,
      user: loggedInUser
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedConversation !== this.props.selectedConversation) {
      const {
        match: { params: { conversationID: previousConversationID } },
        loggedInUser
      } = this.props;

      const {
        match: { params: { conversationID: selectedConversationID } }
      } = nextProps;

      socket.emit('leaveRoom', {
        room: previousConversationID,
        user: loggedInUser
      });
      socket.emit('subscribeToRoom', {
        room: selectedConversationID,
        user: loggedInUser
      });
    }
  }

  componentWillUnmount() {
    const { match: { params: { conversationID } }, loggedInUser } = this.props;
    socket.emit('leaveRoom', {
      room: conversationID,
      user: loggedInUser
    });
  }

  sendMessage(values) {
    const { match: { params: { conversationID } }, loggedInUser } = this.props;

    socket.emit('send:message', {
      room: conversationID,
      sender: loggedInUser.username,
      text: values.message,
      id: conversationID
    });
  }

  render() {
    return <Conversation {...this.props} onSubmit={this.sendMessage} />;
  }
}

const { shape, string, func } = PropTypes;
ConversationContainer.propTypes = {
  loggedInUser: shape({ username: string.isRequired }).isRequired,
  addNewMessage: func.isRequired,
  match: shape({
    params: shape({ conversationID: string.isRequired }).isRequired
  }).isRequired,
  selectedConversation: shape({ _id: string.isRequired })
};

const noSelectedConversations = props => props.selectedConversation === null;
const noConversations = props =>
  props.conversations && props.conversations.length === 0;

const NoConversations = () => <Redirect to="/messages/new" />;

const withConditionalRendering = compose(
  withEither(noConversations, NoConversations),
  withMaybe(noSelectedConversations)
);

const mapStateToProps = state => ({
  selectedConversation: state.messages.selectedConversation,
  conversations: state.messages.conversations,
  loggedInUser: state.account.auth.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addNewMessage }, dispatch);

const ConversationContainerWithConditionalRendering = withConditionalRendering(
  ConversationContainer
);

export default connect(mapStateToProps, mapDispatchToProps)(
  ConversationContainerWithConditionalRendering
);
