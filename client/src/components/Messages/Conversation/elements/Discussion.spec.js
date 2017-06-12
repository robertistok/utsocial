import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Discussion from './Discussion';

describe('Discussion', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const selectedConversation = {
      participants: [{ _id: 'user1' }, { _id: 'user2' }],
      messages: [
        {
          _id: 'message1',
          sender: 'user1',
          text: 'message1',
          unread: true,
          timestamp: Date.now()
        },
        {
          _id: 'message1',
          sender: 'user1',
          text: 'message1',
          unread: true,
          timestamp: Date.now()
        }
      ]
    };
    const loggedInUser = { _id: 'user1' };

    ReactDOM.render(
      <Discussion
        selectedConversation={selectedConversation}
        loggedInUser={loggedInUser}
      />,
      div
    );
  });
});
