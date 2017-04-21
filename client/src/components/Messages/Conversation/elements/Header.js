import React from 'react';
import styled from 'styled-components';

import infoLogo from '../../../../../public/info.svg';

const Wrapper = styled.div`
	height: 49px;
	display: flex;
	justify-content: flex-end;
`;

const InfoLogo = styled.img`
	width: 20px;
	height: 20px;
	margin: 15px;
`;

const Header = props => (
  <Wrapper>
    <InfoLogo src={infoLogo} alt="info" />
  </Wrapper>
);

export default Header;
