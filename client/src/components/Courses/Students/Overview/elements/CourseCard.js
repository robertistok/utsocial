import React from 'react';
import styled from 'styled-components';

const CourseCard = (props) => {
  const { name, year, semester, credits } = props;
  console.log(props);
  return (
    <Wrapper>
      <Header><Title>{name}</Title></Header>
      <div>
        <InfoLabel>{`Year: ${year}`}</InfoLabel>
        <InfoLabel>{`Semester: ${semester}`}</InfoLabel>
        <InfoLabel>{`Credits: ${credits}`}</InfoLabel>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
	width: 250px;
	height: 250px;
	border: 1px solid grey;
	margin: 20px;
	display: flex;
	flex-direction: column;
`;

const Header = styled.div`
	border-bottom: 1px solid rgba(0, 0, 0, .10);
	display: flex;
`;

const Title = styled.span`
	display: inline-block;
	height: 75px;
	width: 100%;
	font-size: 16px;
	padding: 20px 15px 15px 15px;
	align-self: center;
	text-align: center;
`;

const InfoLabel = styled.span`
	font-size: 12px;
	padding: 0px 15px;
`;

export default CourseCard;
