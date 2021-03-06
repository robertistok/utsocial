import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { media } from '../../../utils/style-utils';

const CourseCard = (props) => {
  const {
    name,
    year,
    semester,
    lang,
    credits,
    _id,
    student: isStudent
  } = props;

  return (
    <StyledLink to={`/courses/${_id}/${lang}`}>
      <Wrapper student={isStudent}>
        <Header>
          <Title>{name}</Title>
          <Info>
            <InfoLabel>{`Year: ${year}`}</InfoLabel>
            <InfoLabel>{`Semester: ${semester}`}</InfoLabel>
            {!isStudent &&
              lang !== undefined &&
              <InfoLabel>{`Language: ${lang}`}</InfoLabel>}
            {isStudent &&
              credits !== undefined &&
              <InfoLabel>{`credits: ${credits}`}</InfoLabel>}
          </Info>
        </Header>
      </Wrapper>
    </StyledLink>
  );
};

const { string, number, bool } = PropTypes;
CourseCard.propTypes = {
  name: string.isRequired,
  year: number.isRequired,
  semester: number.isRequired,
  lang: string.isRequired,
  credits: number,
  _id: string.isRequired,
  student: bool
};

const StyledLink = styled(Link)`
	margin: 50px 20px 0px 20px;
`;

const Wrapper = styled.div`
	width: ${props => props.student ? '200px' : '300px'};
	height: ${props => props.student ? '250px' : '350px'};
	display: flex;
	flex-direction: column;
	background-color: #9D8DF1;
	opacity: 0.8;
	box-shadow: 0px 3px 5px rgba(0,0,0,.23);
	transform: perspective(1px) translateZ(0);
	transition: all 0.25s;
	transition-property: transform;

	&:hover {
		transform: scale(1.05);
		opacity: 1;
	}

	@media screen and (max-width: 378px) {
		height: 270px;
		width: 220px;
	}
`;

const Header = styled.div`
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

	${media.phone`
		flex-direction: column;
		align-items: center;
		`}
`;

const InfoLabel = styled.span`
	font-size: 10px;
	font-weight: lighter;
`;

export default CourseCard;
