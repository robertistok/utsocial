import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Popup } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import { NavIcon } from '../../common/Icons';
import Messages from './Messages';
import Notifications from './Notifications';

const ActionBar = (props) => {
  const { user, logOut } = props;

  return (
    <Wrapper>
      <Notifications />
      <Messages />
      <User>{user}</User>
      <StyledNavLink to="/preferences">
        <NavIcon size="large" name="settings" />
      </StyledNavLink>
      <StyledPopup
        trigger={<NavIcon size="large" name="log out" onClick={logOut} />}
        content="Log out"
        size="mini"
        position="top left"
      />
    </Wrapper>
  );
};

const { string, func } = PropTypes;
ActionBar.propTypes = {
  logOut: func.isRequired,
  user: string.isRequired
};

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 220px;
	height: 100px;
	margin-left: auto;

	@media screen and (max-width: 400px) {
		width: 160px;
	}
`;

const StyledNavLink = styled(NavLink)`
	.icon {
		color: #FFFFFF;
	}

	&.active {
		.icon {
			color: #000000;
		}
	}
`;

const User = styled.span`
	color: #FFFFFF;
	margin: 1px 10px;
	font-size: 16px;

	@media screen and (max-width: 400px) {
		font-size: 14px;
	}

	@media screen and (max-width: 400px) {
		display: none;
	}
`;

const StyledPopup = styled(Popup)`
	max-height: min-content !important;
`;

export default ActionBar;
