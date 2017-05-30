import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authActions from '../../../../redux/auth';
import {
  matchingPasswords
} from '../../../../components/FormComponents/validation';
import Password from './Password';

class PasswordContainer extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.resetChangePasswordStatus();
  }

  handleSubmit(values) {
    const { username, changePassword, reset } = this.props;

    reset();
    changePassword(values, username);
  }

  render() {
    return <Password {...this.props} onSubmit={this.handleSubmit} />;
  }
}

const { func, string } = React.PropTypes;
PasswordContainer.propTypes = {
  resetChangePasswordStatus: func.isRequired,
  changePassword: func.isRequired,
  reset: func.isRequired,
  username: string.isRequired
};

const mapStateToProps = state => ({
  username: state.auth.user.username,
  changePasswordStatus: state.auth.changePasswordStatus
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...authActions }, dispatch);

const enhance = compose(
  reduxForm({ form: 'changePasswordForm', validate: matchingPasswords }),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(PasswordContainer);
