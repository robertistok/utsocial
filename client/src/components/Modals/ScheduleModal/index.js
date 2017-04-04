import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submit, reset } from 'redux-form';

import ScheduleModal from './ScheduleModal';
import * as modalActions from '../../../redux/modals';
import * as groupsActions from '../../../redux/groups';

class ScheduleModalContainer extends Component {
  componentDidMount() {
    this.props.getGroup(this.props.selectedGroupID);
  }
  render() {
    return <ScheduleModal {...this.props} />;
  }
}

const mapStateToProps = state => ({
  selectedGroupID: state.schedule.group
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...modalActions, ...groupsActions, submit, reset },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  ScheduleModalContainer
);
