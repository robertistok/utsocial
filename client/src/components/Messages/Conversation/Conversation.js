import React from 'react'; import PropTypes from 'prop-types'
import styled from 'styled-components';

import Header from './elements/Header';
import Discussion from './elements/Discussion';
import NewMessageBox from './elements/NewMessageBox';

const Wrapper = styled.div`
	flex: 3;
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: #FFFFFF;
`;

const Conversation = props => (
  <Wrapper>
    <Header {...props} />
    <Discussion {...props} />
    <NewMessageBox {...props} />
  </Wrapper>
);

export default Conversation;
