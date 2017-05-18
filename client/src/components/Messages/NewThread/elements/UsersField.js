import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Dropdown } from 'semantic-ui-react';

import * as usersActions from '../../../../redux/users';

const renderOptions = users =>
  users.map(({ username }) => ({
    key: username,
    text: username,
    value: username
  }));

class UsersField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noResultsMessage: 'Start typing...',
      firstTime: true
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onItemChange = this.onItemChange.bind(this);
  }

  onSearchChange(event, value) {
    this.props.searchUsers(value);
    this.setState({
      noResultsMessage: 'No users found...',
      firstTime: false
    });
  }

  onItemChange(e, { value }) {
    this.props.blur('target', value);
  }

  render() {
    const {
      input,
      label,
      placeholder,
      meta: { touched, error },
      users
    } = this.props;
    return (
      <Form.Field error={touched && error} required>
        <label htmlFor={input.name}>{label}</label>
        {users.matched &&
          <Dropdown
            options={renderOptions(users.matched)}
            value={input.value}
            search
            selection
            placeholder={placeholder}
            onSearchChange={this.onSearchChange}
            onChange={this.onItemChange}
            closeOnChange
            noResultsMessage={this.state.noResultsMessage}
          />}
      </Form.Field>
    );
  }
}

const mapStateToProps = state => ({ users: state.users });

export default connect(mapStateToProps, usersActions)(UsersField);
