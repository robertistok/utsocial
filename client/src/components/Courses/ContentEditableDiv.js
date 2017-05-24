import React, { Component } from 'react';
import styled from 'styled-components';

import { formatMultiLineText } from '../../utils/style-utils';

class ContentEditableDiv extends Component {
  componentDidMount() {
    this.contentEditableDiv.focus();
  }

  render() {
    const { onContentChange, text } = this.props;

    return (
      <Wrapper
        autoFocus
        onInput={onContentChange}
        contentEditable
        suppressContentEditableWarning
        innerRef={(node) => {
          this.contentEditableDiv = node;
        }}
      >
        {formatMultiLineText(text)}
      </Wrapper>
    );
  }
}

const { func, string } = React.PropTypes;
ContentEditableDiv.propTypes = {
  onContentChange: func.isRequired,
  text: string.isRequired
};

const Wrapper = styled.div`
	padding: 10px;

	&:focus {
		outline: none
	}
`;

export default ContentEditableDiv;
