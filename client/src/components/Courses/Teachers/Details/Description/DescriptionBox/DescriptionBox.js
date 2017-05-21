import React from 'react';
import { Message, Button } from 'semantic-ui-react';
import styled from 'styled-components';

import { formatTime } from '../../../../../../utils/timestamp';
import ContentEditableDiv from '../../elements/ContentEditableDiv';

const DescriptionBox = (props) => {
  const {
    isTeacher,
    description: { text, lastUpdatedBy, updatedOn },
    toggle: toggleEdit,
    toggledOn: editing,
    content,
    handleTextBoxChange,
    handleSave,
    resetState
  } = props;

  if (editing === true) {
    return (
      <Wrapper>
        <ContentEditableDiv
          text={content}
          onContentChange={handleTextBoxChange}
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
DescriptionBox.propTypes = {
  isTeacher: bool.isRequired,
  description: shape({
    text: string.isRequired,
    updatedOn: string,
    lastUpdatedBy: shape({
      name: string.isRequired
    })
  }).isRequired,
  toggle: func.isRequired,
  toggledOn: bool.isRequired,
  resetState: func.isRequired,
  handleTextBoxChange: func.isRequired,
  handleSave: func.isRequired,
  content: string.isRequired
};

const Wrapper = styled.div`
	background-color: #FFFFFF;
	box-shadow: 0 3px 5px rgba(0,0,0,.23)
`;

const StyledMessage = styled(Message)`
	background-color: #FFFFFF !important;
	box-shadow: 3px 5px 7px rgba(0,0,0,.23)
`;

const ActionButtonGroup = styled.div`
	position: relative;
	height: 50px;
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

export default DescriptionBox;
