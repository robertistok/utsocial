import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	height: 80px;
	border: solid 1px black;

	&:hover {
		background-color: #283593;
	}

	&:active {
		background-color: #1a237e;
	}
`;

const Title = styled.h4`
	margin: 0px;
	padding: 0px 5px 0px 35px;
	margin-top: 10px !important;
	height: 20px;
	font-size: 16px;
	color: #212121;
`;

const Partner = styled.h6`
	margin: 0px;
	padding: 0px 5px 0px 35px;
	height: 21px;
	font-size: 14px;
	color: #424242;
`;

const Timestamp = styled.p`
	padding: 0px 5px 0px 35px;
	height: 15px;
	font-size: 10px;
	margin-bottom: 14px !important;
	color: #616161;
`;

const Thread = (props) => {
  const { title, partner, timestamp } = props;

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Partner>{partner}</Partner>
      <Timestamp>{timestamp}</Timestamp>
    </Wrapper>
  );
};

export default Thread;
