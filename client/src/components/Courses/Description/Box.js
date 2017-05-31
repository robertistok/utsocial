import React from 'react'; import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Message } from 'semantic-ui-react';

import { formatTime } from '../../../utils/timestamp';

const Box = (props) => {
  const { onClick, text, updatedOn, isTeacher, lastUpdatedBy } = props;

  return (
    <StyledMessage onClick={onClick}>
      {text === ''
        ? `There is no description about this course so far...${isTeacher ? ' Click on this message in order to edit the description' : ''}`
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

const { string, shape, bool, func } = PropTypes;
Box.propTypes = {
  onClick: func,
  text: string.isRequired,
  isTeacher: bool,
  lastUpdatedBy: shape({ name: string.isRequired }),
  updatedOn: string
};

const StyledMessage = styled(Message)`
	background-color: #FFFFFF !important;
	box-shadow: 3px 5px 7px rgba(0,0,0,.23) !important;
`;

export default Box;
