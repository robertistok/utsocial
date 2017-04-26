import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import InboxContainer from './Inbox/index';
import ConversationContainer from './Conversation/index';
import NewThreadContainer from './NewThread/index';

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	height: 100%;
	overflow: auto;
	border: 1px solid rgba(0, 0, 0, .10);
`;

const Messages = props => (
  <Wrapper>
    <InboxContainer />
    <Switch>
      <Route exact path="/messages" component={ConversationContainer} />
      <Route path="/messages/new" component={NewThreadContainer} />
    </Switch>
  </Wrapper>
);

export default Messages;
