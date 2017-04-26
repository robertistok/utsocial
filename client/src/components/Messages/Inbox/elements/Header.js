import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';

import settingsLogo from '../../../../../public/settings.svg';
import composeLogo from '../../../../../public/compose.svg';

const Wrapper = styled.div`
	height: 50px;
	border-bottom: 1px solid rgba(0, 0, 0, .10);
	display: flex;

	:last-child {
		align-self: flex-end;
	}
`;

const Logo = styled.img`
	width: 20px;
	height: 20px;
	margin: 15px;

	&.compose {
		margin: 0px;
	}
`;

const StyledLink = styled(Link)`
	margin: 15px;
	height: 20px;
	width: 20px;
	margin-left: auto;
`;

const StyledDropdown = styled(Dropdown)`
	:nth-child(2) {
		display: none;
	}
`;

const options = [
  {
    key: 'user',
    text: <strong>Filter by:</strong>,
    disabled: true
  },
  { key: 'all', text: 'All' },
  { key: 'red', text: 'Unread' },
  { key: 'unread', text: 'Read' },
  { key: 'important', text: 'Important' }
];

const Header = props => (
  <Wrapper>
    <StyledDropdown
      trigger={<Logo src={settingsLogo} alt="settings" />}
      options={options}
    />
    <StyledLink to="/messages/new">
      <Logo className="compose" src={composeLogo} alt="compose" />
    </StyledLink>
  </Wrapper>
);

export default Header;
