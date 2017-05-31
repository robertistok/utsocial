import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Popup, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const ActionBar = (props) => {
  const { user, logOut } = props;

  return (
    <Wrapper>
      <StyledIcon size="large" name="bell" />
      <StyledIcon size="large" name="envelope" />
      <User>{user}</User>
      <NavLink activeClassName="active" to="/preferences">
        <StyledIcon size="large" name="settings" />
      </NavLink>
      <StyledPopup
        trigger={<StyledIcon size="large" name="log out" onClick={logOut} />}
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

const StyledIcon = styled(Icon)`
	color: #FFFFFF !important;
	transition-duration: 0.3s;
	transition-timing-function: ease-out;

	&:hover {
		color: #000000 !important;
		cursor: pointer;
		transform: translateY(-2px);
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
