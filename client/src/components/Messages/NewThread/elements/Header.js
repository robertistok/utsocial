import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import cancelLogo from '../../../../../public/cancel.svg';

const Wrapper = styled.div`
	height: 50px;
	display: flex;
	justify-content: flex-end;
	border-bottom: 0.5px solid grey;
`;

const Logo = styled.img`
	width: 30px;
	height: 30px;
`;

const StyledLink = styled(Link)`
	margin: 10px;
	height: 30px;
	width: 30px;
`;

const Header = props => (
  <Wrapper>
    <StyledLink to="/messages">
      <Logo src={cancelLogo} alt="cancel" />
    </StyledLink>
  </Wrapper>
);

export default Header;
