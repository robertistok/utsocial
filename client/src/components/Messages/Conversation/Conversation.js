import React from 'react';
import styled from 'styled-components';

import Header from './elements/Header';
import Discussion from './elements/Discussion';
import NewMessageBox from './elements/NewMessageBox';

const Conversation = props => (
  <Wrapper>
    <Header {...props} />
    <Discussion {...props} />
    <NewMessageBox {...props} />
  </Wrapper>
);

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 2;
	flex-basis: 66.6666%;
	height: 100%;
	background-color: #FFFFFF;
`;

export default Conversation;
