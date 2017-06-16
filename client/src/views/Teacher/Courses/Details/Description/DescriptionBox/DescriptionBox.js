import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import enhanceWithClickOutside from 'react-click-outside';

import ContentEditableDiv
  from '../../../../../../components/common/ContentEditableDiv';
import Box from '../../../../../../components/Courses/Description/Box';

class DescriptionBox extends Component {
  handleClickOutside() {
    const { toggledOn: editing, toggle } = this.props;

    if (editing === true) {
      toggle();
    }
  }

  render() {
    const {
      description: { text, lastUpdatedBy, updatedOn },
      toggle: toggleEdit,
      toggledOn: editing,
      content,
      handleTextBoxChange,
      handleSave,
      resetState
    } = this.props;

    if (editing === true) {
      return (
        <Wrapper>
          <ContentEditableDiv
            text={content}
            onContentChange={handleTextBoxChange}
          />
          <ActionButtonGroup>
            <ActionButton className="confirmation" onClick={handleSave}>
              Save
            </ActionButton>
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
  }
}

const { bool, string, func, shape } = PropTypes;
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
	width: 100%;
	height: 35px;
	position: relative;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
`;

const ActionButton = styled(Button)`
	width: 50px;
	margin: 7px !important;
	height: 25px;
	font-size: 10px !important;

	&.confirmation {
		background-color: ${props => props.theme.confirmation} !important;
		color: ${props => props.theme.white} !important;
	}

	@media screen and (max-width: 768px) {
		font-size: 10px;
	}
`;

export default enhanceWithClickOutside(DescriptionBox);
