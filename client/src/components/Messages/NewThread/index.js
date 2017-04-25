import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewThread from './NewThread';
import { socket } from '../../../views/Authorized';
import * as messagesActions from '../../../redux/messages';

class NewThreadContainer extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    socket.emit('new:thread', {
      target: values.target,
      sender: this.props.sender.username,
      subject: values.subject,
      text: values.message
    });
  }

  render() {
    return <NewThread {...this.props} handleSubmit={this.handleSubmit} />;
  }
}

const mapStateToProps = state => ({
  sender: state.auth.user
});

export default connect(mapStateToProps, messagesActions)(NewThreadContainer);
