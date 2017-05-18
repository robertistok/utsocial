import React from 'react';
import styled from 'styled-components';

import { StyledButton } from '../styled-components';
import MaterialForm from '../MaterialForm';
import { formatTime } from '../../../../../../../utils/timestamp';
// import ConfirmRemove from './ConfirmRemove';

const MaterialCard = (props) => {
  const {
    material: { _id, link, description, enteredOn },
    toggle: editMateial,
    toggledOn: editing,
    handleCardEdit,
    handleCardDelete,
    // toggleActionButtons,
    showButtons,
    initialValues
  } = props;

  if (editing === true) {
    return (
      <MaterialForm
        initialValues={initialValues}
        submitForm={handleCardEdit(_id)}
        positiveButton="Save"
        negativeButton="Cancel"
        onNegativeButtonClick={editMateial}
        newMaterial={false}
        form={`${_id}edit`}
      />
    );
  }

  return (
    <Wrapper
    // onMouseEnter={() => !editing ? toggleActionButtons() : ''}
    // onMouseLeave={() => !editing ? toggleActionButtons() : ''}
    >
      <Timestamp>Last updated at {formatTime(enteredOn)}</Timestamp>
      <Link href={link}>{description}</Link>
      {!showButtons &&
        <ButtonGroup>
          <StyledButton positive onClick={editMateial} content="Edit" />
          {/* <ConfirmRemove handleCardDelete={() => handleCardDelete(_id)} /> */}
          <StyledButton
            negative
            onClick={() => handleCardDelete(_id)}
            type="Submit"
            content="Delete"
          />
        </ButtonGroup>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	margin-left: 30px;
	width: 250px;
	height: 150px;
	border: 1px solid grey;
	margin: 10px;
	padding: 20px;
	box-shadow: 0px 3px 5px #888888
	transition-timing-function: ease-in;
	transition: all 0.25s;
	backface-visibility: hidden;

	&:hover {
		height: 157px;
		margin-bottom: 3px;
		padding-bottom: 27px;
		box-shadow: 0px 5px 7px #888888
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

export default MaterialCard;
