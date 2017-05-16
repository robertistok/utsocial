import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MaterialCard = (props) => {
  const { _id, link, description } = props;

  return (
    <Wrapper>
      <Link to={link}>{description}</Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 30px;
	width: 200px;
	height: 100px;
	border: 1px solid grey;
	margin: 10px;
`;

export default MaterialCard;
