import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';

import filterLogo from '../../../../assets/filter.svg';
import composeLogo from '../../../../assets/compose.svg';

const options = [
  {
    key: 'title',
    text: <strong>Filter by</strong>,
    disabled: true
  },
  { key: 'all', text: 'All', value: 'all' },
  { key: 'red', text: 'Unread', value: 'unread' },
  { key: 'unread', text: 'Read', value: 'red' },
  { key: 'star', text: 'Starred', value: 'star' },
  { key: 'unstar', text: 'Unstarred', value: 'unstar' }
];

const Header = (props) => {
  const { filter, filterConversations } = props;

  const filtertext = options.find(op => op.value === filter).text;
  return (
    <div>
      <Wrapper>
        <StyledDropdown
          defaultValue="all"
          trigger={<Logo src={filterLogo} alt="settings" />}
          options={options}
          onChange={(e, val) => filterConversations(val.value)}
        />
        <Filter>{filtertext}</Filter>
        <StyledLink to="/messages/new">
          <Logo className="compose" src={composeLogo} alt="compose" />
        </StyledLink>
      </Wrapper>
    </div>
  );
};

const { func, string } = PropTypes;
Header.propTypes = {
  filter: string,
  filterConversations: func.isRequired
};

const Wrapper = styled.div`
	height: 50px;
	border-bottom: 1px solid rgba(0, 0, 0, .10);
	display: flex;
	justify-content: space-between;

	@media screen and (max-width: 768px) {
		justify-content: center;
		align-items: center;

		.dropdown {
			display: none !important;
		}
	}
`;

const StyledLink = styled(Link)`
	margin: 15px;
	height: min-content;
	width: min-content;
`;

const Logo = styled.img`
	width: 20px;
	height: 20px;
	margin: 15px;

	&.compose {
		margin: 0px;
	}
`;

const Filter = styled.span`
	margin: 15px 0px;
	font-size: 20px;
	color: ${props => props.theme.secondary};

	@media screen and (max-width: 768px) {
		display: none;
	}

`;

const StyledDropdown = styled(Dropdown)`
	:nth-child(2) {
		display: none;
	}
`;

export default Header;
