import React from 'react';
import styled from 'styled-components';
import { Popup, Icon } from 'semantic-ui-react';

const ActionBar = (props) => {
  const { user, logOut } = props;

  return (
    <Wrapper>
      <StyledIcon size="large" name="bell" />
      <StyledIcon size="large" name="envelope" />
      <User>{user}</User>
      <StyledIcon size="large" name="settings" />
      <StyledPopup
        trigger={<StyledIcon size="large" name="log out" onClick={logOut} />}
        content="Log out"
        size="mini"
        position="top left"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 220px;
	height: 75px;
	margin-left: auto;
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
`;

const StyledPopup = styled(Popup)`
	max-height: min-content !important;
`;

export default ActionBar;
