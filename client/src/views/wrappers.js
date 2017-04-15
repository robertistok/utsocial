import styled from 'styled-components';

import media from '../utils/media';

export const Wrapper = styled.div`
	height: 100%;
`;

export const Content = styled.div`
	margin-top: 110px;
	left: 0px;
	right: 0px;
	min-height: calc(100% - 110px);
	height: 1px;
	width: 1178px;
	margin: auto;

	${media.tablet`width: 100%`}
`;
