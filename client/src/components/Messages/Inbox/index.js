import React, { Component } from 'react';
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

    this.onStarClick = this.onStarClick.bind(this);
  }

  componentDidMount() {
    this.props.getConversationsOfUser(this.props.user.username);

    socket.on('new:thread', value => this.props.addNewConversation(value));

    socket.on('message:sent', (value) => {
      this.props.addNewConversation(value);
      this.props.history.push('/messages');
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.firstTime &&
      nextProps.conversations !== null &&
      nextProps.conversations.length !== 0
    ) {
      const { conversations } = nextProps;
      const { selectConversation } = this.props;
      selectConversation(conversations[0]._id);
      this.setState({ firstTime: false });
    }
  }

  onStarClick(id) {
    const { starConversation, user } = this.props;

    starConversation(id, user.username);
  }

  render() {
    return <Inbox {...this.props} onStarClick={this.onStarClick} />;
  }
}

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
