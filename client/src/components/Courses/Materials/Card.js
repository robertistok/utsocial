import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { formatTime } from '../../../utils/timestamp';
import SettingsGroup from '../../common/SettingsGroup';

const assignOptions = (editMaterial, handleCardDelete) => {
  const options = [
    { key: 'edit', icon: 'edit', text: 'Edit', onClick: editMaterial },
    {
      key: 'delete',
      icon: 'delete',
      text: 'Remove',
      onClick: handleCardDelete
    }
  ];

  return options;
};

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
    <Wrapper>
      {!student &&
        !showButtons &&
        <SettingsGroup
          options={assignOptions(editMaterial, handleCardDelete)}
        />}
      <Timestamp>Last updated at {formatTime(enteredOn)}</Timestamp>
      <Link href={link}>{description}</Link>
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
	position: relative;
	display: flex;
	justify-content: space-around;
	background-color: ${props => props.theme.white};
	align-items: center;
	flex-direction: column;
	margin-left: 30px;
	width: 250px;
	height: 150px;
	margin: 10px;
	padding: 10px;
	box-shadow: 0px 3px 5px rgba(0,0,0,.23)
	transition-timing-function: ease-out;
	transition: all 0.25s;
	backface-visibility: hidden;

	&:hover {
		transform: scale(1.1);
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

export default Card;
