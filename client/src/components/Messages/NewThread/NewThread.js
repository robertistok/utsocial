import React from 'react';
import styled from 'styled-components';

import Header from './elements/Header';
import NewThreadForm from './elements/NewThreadForm';

const Wrapper = styled.div`
	flex: 3;
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: #e8eaf6;
`;

const NewThread = props => (
  <Wrapper><Header /><NewThreadForm onSubmit={props.handleSubmit} /></Wrapper>
);

export default NewThread;
