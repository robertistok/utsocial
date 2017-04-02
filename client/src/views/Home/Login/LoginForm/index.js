import React from 'react';
import { Field, reduxForm } from 'redux-form';

import './style.css';
import InputField from '../../../../components/FormComponents/InputField';

const LoginForm = (props) => {
  const { handleSubmit } = props;

  return (
    <div>
      <form className="ui form login" onSubmit={handleSubmit}>
        <Field
          name="username"
          label="Username"
          placeholder="Enter your username"
          type="text"
          component={InputField}
        />
        <Field
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          component={InputField}
        />
        <button className="ui button">Log In</button>
      </form>
    </div>
  );
};

export default reduxForm({ form: 'loginForm' })(LoginForm);
