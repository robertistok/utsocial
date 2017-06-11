import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import * as messagesActions from '../../../../redux/messages';
import { withToggle } from '../../../hocs';
import Thread from '../../../common/Thread';
import DropDown from '../DropDown';

class MessagesContainer extends Component {
  componentDidMount() {
    const { getConversationsOfUser, user: { _id: userID } } = this.props;

    getConversationsOfUser(userID);
  }

  filterForUnreadMessages() {
    const { conversations, user: { _id: userID } } = this.props;
    return conversations !== null
      ? conversations.filter(
          conv =>
            conv.messages[0].unread === true &&
            conv.messages[0].sender !== userID
        ).length
      : 0;
  }

  render() {
    const { user, conversations, toggle, toggledOn } = this.props;
    return (
      <DropDown
        user={user}
        items={conversations}
        shown={toggledOn}
        toggleDropdown={toggle}
        title="MESSAGES"
        icon="envelope"
        newAlertCount={this.filterForUnreadMessages()}
        Item={Thread}
        noItemsMessage="No messages..."
        customItemProps={{ isNotification: true, customOnClickhandler: toggle }}
      />
    );
  }
}

const { bool, shape, string, func, arrayOf } = PropTypes;
MessagesContainer.propTypes = {
  getConversationsOfUser: func.isRequired,
  toggledOn: bool.isRequired,
  toggle: func.isRequired,
  conversations: arrayOf(shape({ _id: string.isRequired }).isRequired),
  user: shape({
    username: string.isRequired,
    _id: string.isRequired
  }).isRequired
};

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
