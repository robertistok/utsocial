import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { reduxForm } from 'redux-form';

import NewThread from './NewThread';
import { socket } from '../../../views/Authorized';

class NewThreadContainer extends Component {
  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.returnToOnCancel = this.returnToOnCancel.bind(this);
  }

  returnToOnCancel() {
    const { selectedConversation } = this.props;

    if (selectedConversation !== null) {
      return `/messages/${selectedConversation._id}`;
    }

    return '/messages';
  }

  sendMessage(values) {
    socket.emit('new:thread', {
      target: values.target,
      sender: this.props.sender._id,
      subject: values.subject,
      text: values.message
    });
  }

  render() {
    return (
      <NewThread
        {...this.props}
        onSubmit={this.sendMessage}
        returnToOnCancel={this.returnToOnCancel}
      />
    );
  }
}

const { shape, string } = PropTypes;
NewThreadContainer.propTypes = {
  sender: shape({ username: string.isRequired }).isRequired,
  selectedConversation: shape({ _id: string.isRequired })
};

const mapStateToProps = state => ({
  sender: state.account.auth.user,
  selectedConversation: state.messages.selectedConversation
});

const enhance = compose(
  connect(mapStateToProps),
  withRouter,
  reduxForm({ form: 'newThreadForm' })
);

export default enhance(NewThreadContainer);
