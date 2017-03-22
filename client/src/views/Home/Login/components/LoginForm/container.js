import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import LoginForm from './index';
import * as actions from '../../../../../redux/auth';

const mapStateToProps = state => state;

export default connect(null, actions)(
	reduxForm({ form: 'loginForm' })(LoginForm),
);
