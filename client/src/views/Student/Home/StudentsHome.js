import React from 'react';
import styled from 'styled-components';

import PostList from '../../../components/Newsfeed/PostList';
// import { withMountingTransition } from '../../../components/hocs';

const StudentsHome = props => <Wrapper><PostList {...props} /></Wrapper>;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

export default StudentsHome;
