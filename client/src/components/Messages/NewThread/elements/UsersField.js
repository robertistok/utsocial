import React, { Component } from 'react';
import { connect } from 'react-redux';
import Autocomplete from 'react-autocomplete';
import { Form, Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';

import * as usersActions from '../../../../redux/users';

class UsersField extends Component {
  componentDidMount() {
    this.props.searchUsers();
  }

  renderItems(items) {
    return items.map((item, index) => {
      const text = item.props.children;

      return item;
    });
  }

  render() {
    const {
      input,
      label,
      placeholder,
      meta: { touched, error },
      users,
      blur
    } = this.props;
    return (
      <Form.Field error={touched && error}>
        <label htmlFor={input.name}>{label}</label>
        {users.matched &&
          <Autocomplete
            value={input.value}
            items={users.matched}
            getItemValue={item => item.username}
            renderItem={(item, isHighlighted) => (
              <div key={item.username}>
                <Dropdown.Item text={item.username} />
              </div>
            )}
            renderMenu={(items, value) => (
              <div>
                {value === ''
                  ? <div style={{ padding: 6 }}>
										Send to
                    </div>
                  : this.props.users.loading
                      ? <div style={{ padding: 6 }}>Loading...</div>
                      : items.length === 0
                          ? <div style={{ padding: 6 }}>
                              No matches for {value}
                            </div>
                          : this.renderItems(items)}
              </div>
            )}
            onChange={(event, value) => {
              blur('target', value);
              input.value = value;
              this.props.searchUsers(value);
            }}
            onSelect={value => blur('target', value)}
          />}
      </Form.Field>
    );
  }
}

const mapStateToProps = state => ({ users: state.users });

export default connect(mapStateToProps, usersActions)(UsersField);
