import React from 'react'; import PropTypes from 'prop-types'
import styled from 'styled-components';

import { formatTime } from '../../../utils/timestamp';
import { StyledButton } from '../styled-components';

const Card = (props) => {
  const {
    enteredOn,
    link,
    description,
    editMaterial,
    handleCardDelete,
    showButtons,
    student
  } = props;

  return (
    <Wrapper student>
      <Timestamp>Last updated at {formatTime(enteredOn)}</Timestamp>
      <Link href={link}>{description}</Link>
      {!student &&
        !showButtons &&
        <ButtonGroup>
          <StyledButton positive onClick={editMaterial} content="Edit" />
          <StyledButton
            negative
            onClick={handleCardDelete}
            type="Submit"
            content="Delete"
          />
        </ButtonGroup>}
    </Wrapper>
  );
};

const { string, bool, func } = PropTypes;
Card.propTypes = {
  link: string.isRequired,
  description: string.isRequired,
  editMaterial: func,
  handleCardDelete: func,
  showButtons: bool,
  student: bool,
  enteredOn: string.isRequired
};

const Wrapper = styled.div`
	display: flex;
	justify-content: ${props => props.student ? 'space-around' : 'space-between'};
	background-color: #FFFFFF;
	align-items: center;
	flex-direction: column;
	margin-left: 30px;
	width: 250px;
	height: 150px;
	margin: 10px;
	padding: 20px;
	box-shadow: 0px 3px 5px rgba(0,0,0,.23)
	transition-timing-function: ease-in;
	transition: all 0.25s;
	backface-visibility: hidden;

	&:hover {
		height: 157px;
		margin-bottom: 3px;
		padding-bottom: 27px;
		box-shadow: 0px 5px 7px rgba(0,0,0,.23)
	}
`;

const Timestamp = styled.span`
	color: rgba(0, 0, 0, .40)
	font-size: 12px;
`;

const Link = styled.a`
	text-align: center;
	align-self: center;
`;

const ButtonGroup = styled.div`
	display: flex;
	justify-content: space-between;
`;

export default Card;
