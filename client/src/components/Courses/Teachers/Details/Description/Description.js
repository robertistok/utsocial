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
      <Wrapper>
        <StyledTextArea
          autoFocus
          value={textAreaValue}
          onChange={handleTextBoxChange}
          placeholder={text === '' ? 'Edit the course description...' : null}
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

      </Wrapper>
    );
  }

  return (
    <StyledMessage onClick={() => isTeacher && toggleEdit()}>
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
    </StyledMessage>
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

const Wrapper = styled.div`
	box-shadow: 0 3px 5px rgba(0,0,0,.23)
	max-height: 300px
`;

const StyledTextArea = styled(TextArea)`
	width: 100%;
	padding: 10px;
	resize: none;
	min-height: 250px;
	border: 0;

	&:focus {
		outline: none;
	}
`;

const StyledMessage = styled(Message)`
	background-color: #FFFFFF !important;
	box-shadow: 3px 5px 7px rgba(0,0,0,.23)
`;

const ActionButtonGroup = styled.div`
	position: relative;
	height: 50px;
	top: -5px;
	display: flex;
	justify-content: flex-end;
	background-color: #FFFFFF;
`;

const ActionButton = styled(Button)`
	width: 90px;
	margin-right: 20px !important;
	margin-top: 10px !important;
	margin-bottom: 10px !important;
	height: 30px;
`;

export default withToggle(Description);
