import React from 'react';
import styled from 'styled-components';

import { HOURS } from '../../../../utils/constants';
import { media } from '../../../../utils/style-utils';

const InfoColumn = () => (
  <Wrapper>
    <Info annotation>Day</Info>
    <Info annotation>Semigroup</Info>
    <Info annotation>Week</Info>
    {HOURS.map(h => <Info key={h.key}>{h.text}</Info>)}
  </Wrapper>
);

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 8vw;

	${media.tablet`
		display: none
	`}
`;

const Info = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	border-bottom: ${props => props.theme.separator};
	height: 40px;
	font-weight: ${props => props.annotation && 'bolder'};
`;

export default InfoColumn;
