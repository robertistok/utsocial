import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import settingsLogo from '../../../../../public/settings.svg';
import composeLogo from '../../../../../public/compose.svg';

const Wrapper = styled.div`
	height: 50px;
	border-bottom: 0.5px solid grey;
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

const Header = props => (
  <Wrapper>
    <Logo src={settingsLogo} alt="settings" />
    <StyledLink to="/messages/new">
      <Logo className="compose" src={composeLogo} alt="compose" />
    </StyledLink>
  </Wrapper>
);

export default Header;
