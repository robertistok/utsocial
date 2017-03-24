import React from 'react';
import { Field, reduxForm } from 'redux-form';

import './style.css';

const renderTextInput = (
  { input, label, placeholder, type, meta: { touched, error } },
) => (
  <div className="field">
    <label htmlFor={input.name}>{label}</label>
    <input {...input} type={type} placeholder={placeholder} />
  </div>
);

const LoginForm = (props) => {
  const { handleSubmit } = props;

  return (
    <div>
      <form className="ui form" onSubmit={handleSubmit}>
        <Field
          name="username"
          label="Username"
          placeholder="Enter your username"
          type="text"
          component={renderTextInput}
        />
        <Field
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          component={renderTextInput}
        />
        <button className="ui button">Log In</button>
      </form>
    </div>
  );
};

export default reduxForm({ form: 'loginForm' })(LoginForm);
