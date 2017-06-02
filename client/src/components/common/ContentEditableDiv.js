import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { formatMultiLineText } from '../../utils/style-utils';

class ContentEditableDiv extends Component {
  componentDidMount() {
    this.contentEditableDiv.focus();
  }

  render() {
    const { onContentChange, text, autoFocus = true } = this.props;

    return (
      <Wrapper
        autoFocus={autoFocus}
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

const { func, string, bool } = PropTypes;
ContentEditableDiv.propTypes = {
  onContentChange: func.isRequired,
  text: string.isRequired,
  autoFocus: bool
};

const Wrapper = styled.div`
	padding: 10px;
	display: inline-block;

	&:focus {
		outline: none
	}
`;

export default ContentEditableDiv;
