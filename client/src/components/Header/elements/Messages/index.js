import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import Messages from './Messages';
import * as messagesActions from '../../../../redux/messages';
import { withToggle } from '../../../hocs';

class MessagesContainer extends Component {
  componentDidMount() {
    const { getConversationsOfUser, user: { username } } = this.props;

    getConversationsOfUser(username);
  }

  render() {
    return <Messages {...this.props} />;
  }
}

const mapStateToProps = state => ({
  user: state.account.auth.user,
  conversations: state.messages.conversations
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...messagesActions }, dispatch);

const enhance = compose(
  withToggle,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(MessagesContainer);
