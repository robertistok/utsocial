import styled from 'styled-components';
import { StickyContainer } from 'react-sticky';

import { media } from '../utils/style-utils';

export const Wrapper = styled(StickyContainer)`
	display: block;
	overflow: auto;
	height: 100%;
	background-color: #f5f8fa;
`;

export const Content = styled.div`
	background-color: #f5f8fa;
	margin-top: 110px;
	left: 0px;
	right: 0px;
	min-height: calc(100% - 110px);
	max-width: 1178px;
	margin: auto;
	margin-top: 20px;
	${media.tablet`width: 100%`}
`;
