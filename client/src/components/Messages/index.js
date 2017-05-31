import React from 'react'; import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'recompose';

import InboxContainer from './Inbox/index';
import ConversationContainer from './Conversation/index';
import NewThreadContainer from './NewThread/index';
import { withMountingTransition } from '../hocs';

const ForOhFor = () => <h1>No match found</h1>;

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	height: calc(100vh - 105px);
	overflow: auto;
	border: 1px solid rgba(0, 0, 0, .10);
`;

const MessageaContainer = () => (
  <Wrapper>
    <InboxContainer />
    <Switch>
      <Route exact path="/messages" component={ConversationContainer} />
      <Route path="/messages/new" component={NewThreadContainer} />
      <Route component={ForOhFor} />
    </Switch>
  </Wrapper>
);

const mapStateToProps = state => ({
  messages: state.messages
});

const enhance = compose(withMountingTransition, connect(mapStateToProps));

export default enhance(MessageaContainer);
