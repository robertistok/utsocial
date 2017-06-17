import React from 'react';
import styled from 'styled-components';

import PostList from '../../../components/Newsfeed/PostList';

const StudentsHome = props => <Wrapper><PostList {...props} /></Wrapper>;

const Wrapper = styled.div`
	margin-top: 50px;
	display: flex;
	align-items: center;
	flex-direction: column;

	@media screen and (max-width: 378px) {
		margin-top: 30px;
	}
`;

export default StudentsHome;
