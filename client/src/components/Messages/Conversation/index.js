import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { Redirect } from 'react-router';
import { getFormMeta, reset } from 'redux-form';

import Conversation from './Conversation';
import { socket } from '../../../views/Authorized';
import { addNewMessage, starConversation } from '../../../redux/messages';
import { withMaybe, withEither } from '../../hocs';

class ConversationContainer extends Component {
  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
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

  onStarClick() {
    const {
      selectedConversation: { _id: conversationID },
      loggedInUser: { _id: userID },
      starConversation
    } = this.props;

    starConversation(conversationID, userID);
  }

  sendMessage(values) {
    const {
      match: { params: { conversationID } },
      loggedInUser,
      reset
    } = this.props;

    socket.emit('send:message', {
      room: conversationID,
      sender: loggedInUser.username,
      text: values.message,
      id: conversationID
    });

    reset('newMessageForm');
  }

  render() {
    return (
      <Conversation
        {...this.props}
        onSubmit={this.sendMessage}
        onStarClick={this.onStarClick}
      />
    );
  }
}

const { shape, string, func } = PropTypes;
ConversationContainer.propTypes = {
  addNewMessage: func.isRequired,
  starConversation: func.isRequired,
  reset: func.isRequired,
  loggedInUser: shape({
    _id: string.isRequired,
    username: string.isRequired
  }).isRequired,
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
  loggedInUser: state.account.auth.user,
  fields: getFormMeta('newMessageForm')(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addNewMessage, starConversation, reset }, dispatch);

const ConversationContainerWithConditionalRendering = withConditionalRendering(
  ConversationContainer
);

export default connect(mapStateToProps, mapDispatchToProps)(
  ConversationContainerWithConditionalRendering
);
