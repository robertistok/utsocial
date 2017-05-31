import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import cancelLogo from '../../../../assets/cancel.svg';

const Wrapper = styled.div`
	height: 50px;
	display: flex;
	justify-content: flex-end;
	border-bottom: 1px solid rgba(0, 0, 0, .10);
`;

const Logo = styled.img`
	width: 20px;
	height: 20px;
`;

const StyledLink = styled(Link)`
	margin: 15px;
	height: 20px;
	width: 20px;
`;

const Header = props => (
  <Wrapper>
    <StyledLink to="/messages">
      <Logo src={cancelLogo} alt="cancel" />
    </StyledLink>
  </Wrapper>
);

export default Header;
