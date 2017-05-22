import React from 'react';
import { Segment } from 'semantic-ui-react';
import styled from 'styled-components';

import { capitalizeFirstLetter } from '../../../../../utils/string-operations';
import Box from '../../../elements/Materials/Card';

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

const { shape, arrayOf, string } = React.PropTypes;
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
	flex-direction: column;
	background-color: #EDEFF0 !important;
	border: 0px !important;
`;

const Header = styled.div`
	display: flex;
	height: 30px;
	margin-top: 30px;
	align-self: center;
	padding: 0px 25px;
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
