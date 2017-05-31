import React, { Component } from 'react';
import { connect } from 'react-redux';

import NewThread from './NewThread';
import { socket } from '../../../views/Authorized';

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
  sender: state.account.auth.user
});

export default connect(mapStateToProps)(NewThreadContainer);
