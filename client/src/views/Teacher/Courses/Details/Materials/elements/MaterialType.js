import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import styled from 'styled-components';

import { StyledButton } from './styled-components';
import { withToggle } from '../../../../../../components/hocs';
import {
  capitalizeFirstLetter
} from '../../../../../../utils/string-operations';

import NewMaterialContainer from './NewMaterial/index';
import MaterialCardContainer from './MaterialCard/index';

const MaterialType = (props) => {
  const { type, toggle, toggledOn, materials, loggedInUser } = props;

  const isTeacher = loggedInUser.type === 'teacher';

  const renderMaterials = (materials) => {
    const filteredByType = materials.filter(material => material.type === type);
    if (filteredByType.length === 0) {
      return <InfoMessage>No materials so far...</InfoMessage>;
    }

    return filteredByType.map(material => (
      <MaterialCardContainer
        key={material._id}
        material={material}
        type={type}
        editable={isTeacher}
      />
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
              onClick={toggle}
            />
          : <StyledButton
              className="confirmation"
              size="mini"
              content="Add new"
              icon="plus"
              labelPosition="left"
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

const { func, bool, string, shape, arrayOf } = PropTypes;
MaterialType.propTypes = {
  toggle: func.isRequired,
  toggledOn: bool.isRequired,
  type: string.isRequired,
  loggedInUser: shape({ type: string.isRequired }).isRequired,
  materials: arrayOf(
    shape({
      _id: string.isRequired,
      type: string.isRequired,
      description: string.isRequired,
      link: string.isRequired,
      enteredOn: string.isRequired
    }).isRequired
  ).isRequired
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
	justify-content: center;
	align-items: center;
	height: min-content;
	margin-top: 30px;
	align-self: center;
	padding: 0px 25px;

	@media screen and (max-width: 378px) {
		flex-direction: column;
	}
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

export default withToggle(MaterialType);
