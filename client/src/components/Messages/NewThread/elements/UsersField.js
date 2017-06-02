import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';

import * as usersActions from '../../../../redux/users';
import { media } from '../../../../utils/style-utils';

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
      placeholder,
      meta: { touched, error },
      users
    } = this.props;
    return (
      <Wrapper error={touched && error} required>
        {users.matched &&
          <StyledDropdown
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
      </Wrapper>
    );
  }
}

const { func, bool, shape, string, arrayOf } = PropTypes;
UsersField.propTypes = {
  blur: func.isRequired,
  placeholder: string,
  meta: shape({ touched: bool.isRequired }),
  searchUsers: func.isRequired,
  users: shape({ matched: arrayOf(shape({ username: string.isRequired })) }),
  input: shape({
    value: string.isRequired
  })
};

const Wrapper = styled.div`
	margin: 20px;
	width: 100%;
`;

const StyledDropdown = styled(Dropdown)`
	font-size: 14px !important;
	border-radius: 0px !important;
	max-height: 40px !important;
	text-align: center;
	width: 100%;

	&.active {
		border-color: ${props => props.theme.primary} !important;
	}

	div {
		border-color: ${props => props.theme.primary} !important;
	}

	div .text {
		font-size: 13px !important;
	}

	${media.phone`
		font-size: 12px !important;

		div .text {
			font-size: 12px !important;
		}
	`}
`;

const mapStateToProps = state => ({ users: state.users });

export default connect(mapStateToProps, usersActions)(UsersField);
