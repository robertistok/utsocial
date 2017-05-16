import React from 'react';
import { Segment, Button } from 'semantic-ui-react';
import styled from 'styled-components';

import { withToggle } from '../../../../../hocs';
import {
  capitalizeFirstLetter
} from '../../../../../../utils/string-operations';
import { media } from '../../../../../../utils/style-utils';

import NewMaterialContainer from './NewMaterial/index';
import MaterialCard from './MaterialCard';

const MaterialType = (props) => {
  const { type, toggle, toggledOn, materials } = props;
  console.log(props);

  const renderMaterials = (materials) => {
    const filteredByType = materials.filter(material => material.type === type);
    if (filteredByType.length === 0) {
      return <InfoMessage>No materials so far...</InfoMessage>;
    }

    return filteredByType.map(material => (
      <MaterialCard key={material._id} {...material} />
    ));
  };

  return (
    <Wrapper>
      <Header>
        <Type>{capitalizeFirstLetter(type)}</Type>
        {toggledOn
          ? <StyledButton
              size="mini"
              content="Cancel"
              icon="minus"
              labelPosition="left"
              negative
              onClick={toggle}
            />
          : <StyledButton
              size="mini"
              content="Add new"
              icon="plus"
              labelPosition="left"
              positive
              onClick={toggle}
            />}
      </Header>
      {toggledOn && <NewMaterialContainer type={type} toggle={toggle} />}
      <Body>
        {renderMaterials(materials)}
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled(Segment)`
	display: flex;
	flex-direction: column;
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
`;

const InfoMessage = styled.span`
	display: block;
	width: 100%;
	padding: 100px;
	text-align: center;
	font-size: 16px;
	font-weight: lighter;
`;

const StyledButton = styled(Button)`
	height: 20px;
	width: 100px;
	padding: 0px !important;
	margin-right: 0px !important;
`;

const Body = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	margin-top: 30px;
	margin-bottom: 30px;

	${media.tablet`justify-content: center`}

`;

export default withToggle(MaterialType);
