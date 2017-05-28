import React from 'react';
import styled from 'styled-components';

import PasswordContainer from './elements/Password';

const Settings = () => <Wrapper><PasswordContainer /></Wrapper>;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export default Settings;
