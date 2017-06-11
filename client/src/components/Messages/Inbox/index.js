import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
// import { Dimmer, Loader } from 'semantic-ui-react';

import {
  addNewConversation,
  getConversationsOfUser,
  starConversation,
  readMessages,
  selectConversation,
  filterConversations,
  conversationsSelector,
  changeSearchterm
} from '../../../redux/messages';
import Inbox from './Inbox';
import { socket } from '../../../views/Authorized';

class InboxContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstTime: true
    };
  }

  componentDidMount() {
    const {
      getConversationsOfUser,
      addNewConversation,
      user: { _id: userID },
      history,
      selectedConversation
    } = this.props;

    getConversationsOfUser(userID);

    socket.on('message:sent', (value) => {
      addNewConversation(value);
      history.push('/messages');
    });

    if (selectedConversation !== null) {
      history.push(`/messages/${selectedConversation._id}`);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.location.pathname.match(/messages\/.{24}/) === null &&
      this.props.location.pathname !== '/messages' &&
      this.props.location.pathname !== '/messages/new'
    ) {
      this.props.history.push('/messages');
    }

    if (
      this.state.firstTime &&
      nextProps.conversations !== null &&
      nextProps.conversations.length !== 0 &&
      this.props.location.pathname.match(/messages\/.{24}/) !== null &&
      this.props.selectedConversation === null
    ) {
      const {
        location,
        conversations,
        history
      } = nextProps;
      const conversationID = location.pathname.split('/')[2];

      this.setState({ firstTime: false });

      if (
        conversations.find(
          conversation => conversation._id === conversationID
        ) !== undefined
      ) {
        this.props.selectConversation(conversationID);
      } else {
        history.push('/messages');
      }
    }
  }

  render() {
    return <Inbox {...this.props} />;
  }
}

const { func, shape, string, arrayOf } = PropTypes;
InboxContainer.propTypes = {
  getConversationsOfUser: func.isRequired,
  addNewConversation: func.isRequired,
  selectConversation: func.isRequired,
  selectedConversation: shape({ _id: string.isRequired }),
  location: shape({ pathname: string.isRequired }).isRequired,
  history: shape({ push: func.isRequired }).isRequired,
  conversations: arrayOf(shape({ _id: string.isRequired })),
  user: shape({ username: string.isRequired, _id: string.isRequired })
};

// const LoadingIndicator = () => (
//   <Dimmer active>
//     <Loader>Loading..</Loader>
//   </Dimmer>
// );

const mapStateToProps = state => ({
  conversations: conversationsSelector(state),
  selectedConversation: state.messages.selectedConversation,
  isLoading: state.messages.loading,
  filter: state.messages.filter,
  searchTerm: state.messages.searchTerm,
  user: state.account.auth.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addNewConversation,
      getConversationsOfUser,
      starConversation,
      readMessages,
      selectConversation,
      filterConversations,
      changeSearchterm
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(InboxContainer)
);
