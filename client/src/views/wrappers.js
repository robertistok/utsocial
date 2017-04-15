import styled from 'styled-components';

import media from '../utils/media';

export const Wrapper = styled.div`
	height: 100%;
`;

export const Content = styled.div`
	margin-top: 180px;
	left: 0px;
	right: 0px;
	overflow: auto;
	height: 100%;
	width: 1178px;
	margin: auto;

	${media.tablet`width: 100%`}
`;
