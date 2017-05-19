import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NewPost from './NewPost';
import { withToggle } from '../../../../../../hocs';

class NewPostContainer extends Component {
  render() {
    return <NewPost {...this.props} />;
  }
}

const enhance = withToggle;

export default enhance(NewPostContainer);
