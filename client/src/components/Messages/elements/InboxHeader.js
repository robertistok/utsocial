import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

import settingsLogo from '../../../../public/settings.svg';
import composeLogo from '../../../../public/compose.svg';

const Wrapper = styled.div`
	height: 50px;
	border-bottom: 0.5px solid grey;
	display: flex;
`;

const Logo = styled.img`
	width: 30px;
	height: 30px;
	margin: 10px;
`;

const ComposeLogo = styled.img`
	width: 30px;
	height: 30px;
	margin: 10px;
	margin-left: auto;
`;

const InboxHeader = props => (
  <Wrapper>
    <Logo src={settingsLogo} alt="settings" />
    <ComposeLogo src={composeLogo} alt="compose" />
  </Wrapper>
);

export default InboxHeader;
