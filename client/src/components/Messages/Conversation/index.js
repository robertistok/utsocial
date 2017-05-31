import React, { Component } from 'react';
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
    socket.on('new:message', message => this.props.addNewMessage(message));
    socket.emit('subscribeToRoom', {
      room: this.props.selectedConversation._id,
      user: this.props.loggedInUser
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedConversation !== this.props.selectedConversation) {
      socket.emit('leaveRoom', {
        room: this.props.selectedConversation._id,
        user: this.props.loggedInUser
      });
      socket.emit('subscribeToRoom', {
        room: nextProps.selectedConversation._id,
        user: this.props.loggedInUser
      });
    }
  }

  componentWillUnmount() {
    socket.emit('leaveRoom', {
      room: this.props.selectedConversation._id,
      user: this.props.loggedInUser
    });
  }

  sendMessage(values) {
    socket.emit('send:message', {
      room: this.props.selectedConversation._id,
      sender: this.props.loggedInUser.username,
      text: values.message,
      id: this.props.selectedConversation._id
    });
  }

  render() {
    return <Conversation {...this.props} onSubmit={this.sendMessage} />;
  }
}

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
