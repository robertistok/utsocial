import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import Admin from './Admin';
import Student from './Student';
import Teacher from './Teacher';

export const socket = io();

class Authorized extends Component {
  componentDidMount() {
    socket.emit('join', this.props.auth.user);
  }

  componentWillUnmount() {
    socket.emit('leave', this.props.auth.user);
  }

  render() {
    const { auth: { user } } = this.props;
    let User;

    switch (user && user.type) {
      case 'admin':
        User = Admin;
        break;
      case 'teacher':
        User = Teacher;
        break;
      case 'student':
        User = Student;
        break;
      default:
        return null;
    }

    return <User />;
  }
}

const mapStateToprops = state => ({
  auth: state.auth
});

export default connect(mapStateToprops)(Authorized);
