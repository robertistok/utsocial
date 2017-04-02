import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFormValues, reset } from 'redux-form';

import NewScheduleForm from './NewScheduleForm';
import * as groupActions from '../../../../redux/groups';

class NewScheduleFormContainer extends Component {
  constructor(props) {
    super(props);

    this.resetTypes = this.resetTypes.bind(this);
  }

  resetTypes() {
    this.props.reset('addScheduleModalForm');
  }

  render() {
    return <NewScheduleForm {...this.props} resetTypes={this.resetTypes} />;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ reset }, dispatch);

const mapStateToProps = state => ({
  selectedGroup: state.groups.selected,
  formValues: getFormValues('addScheduleModalForm')(state),
  initialValues: {
    group: state.schedule.group,
    semigroup: state.schedule.semigroup
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  NewScheduleFormContainer
);
