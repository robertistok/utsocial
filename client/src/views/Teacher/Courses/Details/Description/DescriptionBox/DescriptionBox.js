import React from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

import ContentEditableDiv
  from '../../../../../../components/Courses/ContentEditableDiv';
import Box from '../../../../../../components/Courses/Description/Box';

const DescriptionBox = (props) => {
  const {
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
    <Box
      onClick={toggleEdit}
      text={text}
      updatedOn={updatedOn}
      isTeacher
      lastUpdatedBy={lastUpdatedBy}
    />
  );
};

const { bool, string, func, shape } = React.PropTypes;
DescriptionBox.propTypes = {
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
