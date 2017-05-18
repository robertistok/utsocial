import React from 'react';
import { Message, TextArea, Button } from 'semantic-ui-react';
import styled from 'styled-components';

import { withToggle } from '../../../../hocs';
import { formatTime } from '../../../../../utils/timestamp';

const Description = (props) => {
  const {
    isTeacher,
    description: { text, lastUpdatedBy, updatedOn },
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
          placeholder={text === '' ? 'Edit the course description...' : null}
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

  return (
    <Message onClick={() => isTeacher && toggleEdit()}>
      {text === ''
        ? `There is no description about this course so far...${isTeacher && ' Click on this message in order to edit the description'}`
        : <div>
            <span>
              Last updated at
              {' '}
              <strong>{formatTime(updatedOn)}</strong>
              {' '}
              by
              {' '}
              {lastUpdatedBy.name}
            </span>
            <br /> <br />
            {text.split('\n').map((item, index) => (
              <span key={item + index}>
                {item}
                <br />
              </span>
            ))}
          </div>}
    </Message>
  );
};

const { bool, string, func, shape } = React.PropTypes;
Description.propTypes = {
  isTeacher: bool.isRequired,
  description: shape({
    text: string.isRequired,
    updatedOn: string,
    lastUpdatedBy: shape({
      name: string.isRequired
    })
  }).isRequired,
  toggle: func.isRequired,
  textAreaValue: string,
  toggledOn: bool.isRequired,
  resetState: func.isRequired,
  handleTextBoxChange: func.isRequired,
  handleSave: func.isRequired
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
