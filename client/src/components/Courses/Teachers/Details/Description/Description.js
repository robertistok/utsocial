import React from 'react';
import { Message, TextArea, Button } from 'semantic-ui-react';
import styled from 'styled-components';

import { withToggle } from '../../../../hocs';
import { formatTime } from '../../../../../utils/timestamp';

const Description = (props) => {
  const {
    isTeacher,
    description,
    toggle: toggleEdit,
    toggledOn: editing,
    textAreaValue,
    handleTextBoxChange,
    handleSave,
    resetState
  } = props;

  if (editing === true) {
    return (
      <div>
        <StyledTextArea
          value={textAreaValue}
          onChange={handleTextBoxChange}
          placeholder={
            description.text === '' ? 'Edit the course description...' : null
          }
          rows={15}
        />
        <ActionButtonGroup>
          <ActionButton positive onClick={handleSave}>Save</ActionButton>
          <ActionButton
            onClick={() => {
              resetState();
              toggleEdit();
            }}
          >
            Cancel
          </ActionButton>
        </ActionButtonGroup>

      </div>
    );
  }

  console.log(description, 'from description');

  return (
    <Message onClick={() => isTeacher && toggleEdit()}>
      {description.text === ''
        ? `There is no description about this course so far...${isTeacher && ' Click on this message in order to edit the description'}`
        : <div>
            <span>
              Last updated at
              {' '}
              <strong>{formatTime(description.updatedOn)}</strong>
              {' '}
              by
              {' '}
              {description.lastUpdatedBy.name}
            </span>
            <br /> <br />
            {description.text.split('\n').map((item, index) => (
              <span key={item + index}>
                {item}
                <br />
              </span>
            ))}
          </div>}
    </Message>
  );
};

const StyledTextArea = styled(TextArea)`
	width: 100%;
	padding: 25px;
	resize: none;
`;

const ActionButtonGroup = styled.div`
	position: relative;
	top: -50px;
	display: flex;
	justify-content: flex-end;
`;

const ActionButton = styled(Button)`
	width: 90px;
	margin-right: 20px !important;
`;

export default withToggle(Description);
