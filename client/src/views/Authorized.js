/* eslint consistent-return: 0 */

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
    const {
      history,
      auth: { user, authenticated },
      location: { pathname }
    } = this.props;
    socket.emit('join', user);

    if (authenticated === true) {
      if (pathname === '/') {
        history.push('/home');
      }
      history.push(pathname);
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
    const { auth: { user } } = this.props;
    socket.emit('leave', user);
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

const { shape, string, bool, func } = PropTypes;
Authorized.propTypes = {
  auth: shape({
    authenticated: bool.isRequired,
    user: shape({ username: string.isRequired, type: string.isRequired })
  }).isRequired,
  history: shape({
    push: func.isRequired
  })
};

const mapStateToProps = state => ({
  auth: state.account.auth
});

const enhance = compose(connect(mapStateToProps), withRouter);

export default enhance(Authorized);
