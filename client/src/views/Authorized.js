/* eslint consistent-return: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';

import * as messagesActions from '../redux/messages';

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
      location: { pathname },
      addNewConversation,
      addNewMessage
    } = this.props;

    if (authenticated === true) {
      socket.emit('join', user);
      socket.on('new:thread', value => addNewConversation(value));
      socket.on('new:message', message => addNewMessage(message));
      // socket.on('new:attendance', value => console.log(value));

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

    if (
      nextProps.location.pathname === '/' &&
      nextProps.auth.authenticated === true
    ) {
      nextProps.history.push('/home');
    }
  }

  componentWillUnmount() {
    const { auth: { user, authenticated } } = this.props;
    if (authenticated === true) {
      socket.emit('leave', user);
    }
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
  }),
  location: shape({ pathname: string.isRequired }).isRequired,
  addNewConversation: func.isRequired,
  addNewMessage: func.isRequired
};

const mapStateToProps = state => ({
  auth: state.account.auth
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...messagesActions }, dispatch);

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
);

export default enhance(Authorized);
