import React from 'react';
import styled from 'styled-components';

import { StyledButton } from '../styled-components';
import MaterialForm from '../MaterialForm';
// import ConfirmRemove from './ConfirmRemove';

const MaterialCard = (props) => {
  const {
    material: { _id, link, description },
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
	flex-direction: column;
	margin-left: 30px;
	width: 250px;
	height: 150px;
	border: 1px solid grey;
	margin: 10px;
	padding: 20px;
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
