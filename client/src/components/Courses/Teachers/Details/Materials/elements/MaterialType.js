import React from 'react';
import { Segment, Button } from 'semantic-ui-react';
import styled from 'styled-components';

import { withToggle } from '../../../../../hocs';
import {
  capitalizeFirstLetter
} from '../../../../../../utils/string-operations';

import NewMaterial from './NewMaterial';

const MaterialType = (props) => {
  const { type, toggle, toggledOn } = props;
  const materialList = [];

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
      <Body>
        {!toggledOn &&
          materialList.length === 0 &&
          <InfoMessage>No materials so far...</InfoMessage>}
        {toggledOn && <NewMaterial />}
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
	height: 50px;
	margin-top: 20px;

	&:first-child {
		margin-left: 20px;
	}
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
	margin-left: 10px !important;
	padding: 0px !important;
`;

const Body = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	margin-bottom: 20px;
	min-height: 300px;
`;

export default withToggle(MaterialType);
