import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CourseCard = (props) => {
  const { name, year, semester, lang, _id, onClick } = props;

  return (
    <Wrapper>
      <Header>
        <Link to={`/courses/${_id}/${lang}`} onClick={onClick}>
          <Title>{name}</Title>
        </Link>
        <Info>
          <InfoLabel>{`Year: ${year}`}</InfoLabel>
          <InfoLabel>{`Semester: ${semester}`}</InfoLabel>
          <InfoLabel>{`Language: ${lang}`}</InfoLabel>
        </Info>
      </Header>
      {/* <Body>
        <StyledLink to={`/courses/${_id}/${lang}`}>
          Attendance
        </StyledLink>
        <StyledLink to={`/courses/${_id}/${lang}`}>Grades</StyledLink>
        <StyledLink to={`/courses/${_id}/${lang}`}>Notifications</StyledLink>
        <StyledLink to={`/courses/${_id}/${lang}`}>Materials</StyledLink>
        <StyledLink to={`/courses/${_id}/${lang}`}>Notes</StyledLink>
      </Body> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
	width: 300px;
	height: 350px;
	border: 1px solid grey;
	margin: 20px;
	display: flex;
	flex-direction: column;
	background-color: #9D8DF1
`;

const Header = styled.div`
	border-bottom: 1px solid rgba(0, 0, 0, .10);
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	flex: 1
`;

const Title = styled.span`
	display: inline-block;
	color: #FFFFFF;
	height: 60px;
	width: 100%;
	font-size: 15px;
	font-weight: normal;
	padding: 10px 35px 5px 35px;
	align-self: center;
	text-align: center;
`;

const Info = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0px 35px;
	color: #FFFFFF;
	font-weight: lighter;
`;

const InfoLabel = styled.span`
	font-size: 10px;
	font-weight: lighter;
`;

const Body = styled.div`
	flex: 2
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

export default CourseCard;
