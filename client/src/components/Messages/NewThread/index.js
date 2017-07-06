import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { reduxForm } from 'redux-form';

import NewThread from './NewThread';
import { newConversation } from '../../../redux/messages';

class NewThreadContainer extends Component {
  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.returnToOnCancel = this.returnToOnCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedConversation._id !==
        this.props.selectedConversation._id &&
      nextProps.submitSucceeded === true
    ) {
      this.props.history.push(
        `/messages/${nextProps.selectedConversation._id}`
      );
    }
  }

  returnToOnCancel() {
    const { selectedConversation } = this.props;

    if (selectedConversation !== null) {
      return `/messages/${selectedConversation._id}`;
    }

    return '/messages';
  }

  sendMessage(values) {
    const { sender: { _id: senderID }, newConversation } = this.props;
    const { target, subject, message } = values;

    newConversation(target, senderID, message, subject);
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

const { shape, string, func, bool } = PropTypes;
NewThreadContainer.propTypes = {
  sender: shape({ username: string.isRequired }).isRequired,
  selectedConversation: shape({ _id: string.isRequired }),
  newConversation: func.isRequired,
  submitSucceeded: bool.isRequired,
  history: shape({ push: func.isRequired })
};

const mapStateToProps = state => ({
  sender: state.account.auth.user,
  selectedConversation: state.messages.selectedConversation
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ newConversation }, dispatch);

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  reduxForm({ form: 'newThreadForm' })
);

export default enhance(NewThreadContainer);
