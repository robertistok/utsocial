import styled from 'styled-components';

import { media } from '../utils/style-utils';

export const Wrapper = styled.div`
	display: block;
	overflow: auto;
	height: 100%;
	background-color: #F0F7EE;
`;

export const Content = styled.div`
	background-color: #F0F7EE;
	margin-top: 110px;
	left: 0px;
	right: 0px;
	min-height: calc(100% - 220px);
	max-width: 1178px;
	margin: auto;

	${media.tablet`width: 100%`}
`;
