import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submit, reset } from 'redux-form';

import AddSchedule from './AddSchedule';
import * as modalActions from '../../../redux/modals';
import * as groupsActions from '../../../redux/groups';

class AddScheduleContainer extends Component {
  componentDidMount() {
    this.props.getGroup(this.props.selectedGroupID);
  }
  render() {
    return <AddSchedule {...this.props} />;
  }
}

const { func, string } = PropTypes;
AddScheduleContainer.propTypes = {
  getGroup: func.isRequired,
  selectedGroupID: string.isRequired
};

const mapStateToProps = state => ({
  selectedGroupID: state.schedule.scheduleOf
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...modalActions, ...groupsActions, submit, reset },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  AddScheduleContainer
);
