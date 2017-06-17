import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import styled from 'styled-components';

import { capitalizeFirstLetter } from '../../../../../utils/string-operations';
import Box from '../../../../../components/Courses//Materials/Card';

const MaterialType = (props) => {
  const { type, materials } = props;

  const renderMaterials = (materials) => {
    const filteredByType = materials.filter(material => material.type === type);
    if (filteredByType.length === 0) {
      return <InfoMessage>No materials so far...</InfoMessage>;
    }

    return filteredByType.map(material => (
      <Box key={material._id} {...material} type={type} student />
    ));
  };

  return (
    <Wrapper>
      <Header>
        <Type>{capitalizeFirstLetter(type)}</Type>
      </Header>
      <Body>
        {renderMaterials(materials)}
      </Body>
    </Wrapper>
  );
};

const { shape, arrayOf, string } = PropTypes;
MaterialType.propTypes = {
  materials: arrayOf(
    shape({
      type: string.isRequired,
      link: string.isRequired,
      description: string.isRequired
    }).isRequired
  ).isRequired,
  type: string.isRequired
};

const Wrapper = styled(Segment)`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.theme.background} !important;
	border: ${props => props.theme.separator} !important;
	border-radius: 0px !important;
	box-shadow: 5px 5px 7px rgba(0,0,0,.23) !important;
`;

const Header = styled.div`
	display: flex;
	height: 30px;
	width: 150px;
	margin-top: 20px;
	justify-content: center;
	align-self: center;
	padding: 0px 25px;
	font-size: 16px;
	font-weight: bolder;
	border-bottom: ${props => props.theme.separator}
`;

const Type = styled.span`
	width: 50px;
	text-align: right;
	margin-right: 10px;
`;

const InfoMessage = styled.span`
	display: block;
	width: 100%;
	padding: 100px;
	text-align: center;
	font-size: 16px;
	font-weight: lighter;
`;

const Body = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	margin-top: 30px;
	margin-bottom: 30px;

	@media screen and (max-width: 867px) {
		justify-content: center;
	}
`;

export default MaterialType;
