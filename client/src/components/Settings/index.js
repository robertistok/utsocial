import React from 'react';
import styled from 'styled-components';

import PasswordContainer from './elements/Password/';
import AccountContainer from './elements/Account/';

const Settings = () => (
  <Wrapper><PasswordContainer /><AccountContainer /></Wrapper>
);

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export default Settings;
