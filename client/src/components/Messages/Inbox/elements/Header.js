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
    key: 'title',
    text: <strong>Filter by</strong>,
    disabled: true
  },
  { key: 'all', text: 'All', value: 'all' },
  { key: 'red', text: 'Unread', value: 'unread' },
  { key: 'unread', text: 'Read', value: 'red' },
  { key: 'star', text: 'Starred', value: 'star' }
];

const Header = (props) => {
  const { filter, filterConversations } = props;

  const title = options.find(op => op.value === filter).text;
  return (
    <Wrapper>
      <StyledDropdown
        defaultValue="all"
        trigger={<Logo src={settingsLogo} alt="settings" />}
        options={options}
        onChange={(e, val) => filterConversations(val.value)}
      />
      <div>{title}</div>
      <StyledLink to="/messages/new">
        <Logo className="compose" src={composeLogo} alt="compose" />
      </StyledLink>
    </Wrapper>
  );
};

export default Header;
