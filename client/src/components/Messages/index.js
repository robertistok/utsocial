import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'recompose';

import InboxContainer from './Inbox/index';
import ConversationContainer from './Conversation/index';
import NewThreadContainer from './NewThread/index';
import { withMountingTransition } from '../hocs';

const ForOhFor = () => <h1>No match found</h1>;

const MessageaContainer = () => (
  <Wrapper>
    <InboxContainer />
    <Switch>
      <Route
        exact
        path="/messages"
        render={() => (
          <StartingPoint>
            Select a conversation or start a new one
          </StartingPoint>
        )}
      />
      <Route path="/messages/new" component={NewThreadContainer} />
      <Route
        path="/messages/:conversationID"
        component={ConversationContainer}
      />
      <Route component={ForOhFor} />
    </Switch>
  </Wrapper>
);

const Wrapper = styled.div`
	display: flex;
	height: calc(100vh - 120px);
	max-width: 100%;
	overflow: auto;
	border: 1px solid rgba(0, 0, 0, .10);

	@media screen and (max-width: 768px) {
		height: calc(100vh - 70px);
	}
`;

const StartingPoint = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex-grow: 2;
	flex-basis: 66.6666%;
	height: 100%;
	background-color: #FFFFFF;
	color: ${props => props.theme.secondary};
	text-align: center;
	padding: 15px;
	font-size: 26px;
`;

const mapStateToProps = state => ({
  messages: state.messages
});

const enhance = compose(connect(mapStateToProps), withMountingTransition);

export default enhance(MessageaContainer);
