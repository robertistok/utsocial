import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import io from 'socket.io-client';

export const socket = io();

class Authorized extends Component {
  constructor(props) {
    super(props);

    this.state = { User: undefined };

    this.changeUser = this.changeUser.bind(this);
  }

  componentDidMount() {
    socket.emit('join', this.props.auth.user);
    const { history, auth } = this.props;

    if (auth.authenticated === true) {
      history.push('/home');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      const { auth: { user } } = nextProps;

      switch (user && user.type) {
        case 'admin':
          import('./Admin').then(({ Admin }) => {
            this.changeUser(Admin);
          });
          break;
        case 'teacher':
          import('./Teacher').then(({ Teacher }) => {
            this.changeUser(Teacher);
          });
          break;
        case 'student':
          import('./Student').then(({ Student }) => {
            this.changeUser(Student);
          });
          break;
        default:
          return null;
      }
    }
  }

  componentWillUnmount() {
    socket.emit('leave', this.props.auth.user);
  }

  changeUser(User) {
    this.setState({ User });
  }

  render() {
    const { User } = this.state;

    if (User === undefined) {
      return null;
    }

    return <User />;
  }
}

const mapStateToProps = state => ({
  auth: state.account.auth
});

const enhance = compose(connect(mapStateToProps), withRouter);

export default enhance(Authorized);
