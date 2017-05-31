import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from './Header';
import * as authActions from '../../redux/account/auth';

const HeaderContainer = props => <Header {...props} />;

const mapStateToProps = state => ({
  user: state.account.auth.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...authActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(HeaderContainer);
