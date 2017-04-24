import React from 'react';
import styled from 'styled-components';

import { formatTime } from '../../../../utils/timestamp';

const Wrapper = styled.div`
	height: calc(100% - 49px - 40px);
	border-top: 0.5px solid grey;

	border-bottom: 0.5px solid grey;
	overflow: auto;
`;

const Discussion = (props) => {
  const { selectedConversation } = props;

  return (
    <Wrapper>
      {selectedConversation &&
        selectedConversation.messages.map(m => (
          <div key={m._id}>
            {m.text}{formatTime(m.timestamp)}{m.sender}
          </div>
        ))}
    </Wrapper>
  );
};

export default Discussion;
