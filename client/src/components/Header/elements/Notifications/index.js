import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import * as notificationsActions from '../../../../redux/notifications';
import { withToggle } from '../../../hocs';
import NotificationItem from './NotificationItem';
import DropDown from '../DropDown';

class MessagesContainer extends Component {
  constructor(props) {
    super(props);

    this.onIconClick = this.onIconClick.bind(this);
  }

  componentDidMount() {
    const {
      fetchNotifications,
      user: { _id: userID, profile: { group } }
    } = this.props;

    const groupID = group !== undefined ? group._id : undefined;

    fetchNotifications({ userID, groupID });
  }

  onIconClick() {
    const {
      markAsSeen,
      user: { _id: userID },
      opened,
      openNotifications,
      toggledOn,
      toggle
    } = this.props;

    if (opened === false && toggledOn === true) {
      openNotifications();
      markAsSeen({ userID });
    }

    toggle();
  }

  render() {
    const { user, notifications, unseen, toggledOn } = this.props;
    return (
      <DropDown
        user={user}
        items={notifications}
        shown={toggledOn}
        toggleDropdown={this.onIconClick}
        title="NOTIFICATIONS"
        icon="bell"
        newAlertCount={unseen}
        noItemsMessage="No notifications..."
        Item={NotificationItem}
        bellNotifications
        customItemProps={{ onClick: this.onIconClick }}
      />
    );
  }
}

const { bool, shape, string, func, arrayOf, number } = PropTypes;
MessagesContainer.propTypes = {
  fetchNotifications: func.isRequired,
  markAsSeen: func.isRequired,
  toggledOn: bool.isRequired,
  toggle: func.isRequired,
  notifications: arrayOf(shape({ _id: string.isRequired }).isRequired),
  user: shape({
    username: string.isRequired,
    _id: string.isRequired
  }).isRequired,
  unseen: number.isRequired,
  opened: bool.isRequired,
  openNotifications: func.isRequired
};

const mapStateToProps = state => ({
  user: state.account.auth.user,
  notifications: state.notifications.items,
  opened: state.notifications.opened,
  unseen: notificationsActions.unseenNotificationsSelector(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...notificationsActions }, dispatch);

const enhance = compose(
  withToggle,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(MessagesContainer);
