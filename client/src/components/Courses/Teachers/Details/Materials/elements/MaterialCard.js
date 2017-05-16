import React from 'react';
import styled from 'styled-components';

const MaterialCard = (props) => {
  const { _id, link, description } = props;
  console.log(description, link);

  return (
    <Wrapper>
      <span>{link}</span>
      <span>{description}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
	width: 300px;
	height: 280px;
	border: 1px solid grey;
	margin: 10px;
`;

export default MaterialCard;
