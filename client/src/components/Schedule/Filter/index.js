import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import * as scheduleActions from '../../../redux/schedule';
import * as modalActions from '../../../redux/modals';
import * as groupActions from '../../../redux/groups';
import Filter from './Filter';
import { MODALS } from '../../../constants';

class FilterContainer extends Component {
  constructor(props) {
    super(props);

    this.onSemigroupChange = this.onSemigroupChange.bind(this);
    this.onWeekChange = this.onWeekChange.bind(this);
    this.onGroupChange = this.onGroupChange.bind(this);
    this.onAddButtonClick = this.onAddButtonClick.bind(this);
    this.extractOptionsFromGroup = this.extractOptionsFromGroup.bind(this);
  }

  componentDidMount() {
    this.props.getGroups();
  }

  onSemigroupChange(e, { value }) {
    this.props.changeSemigroup(value);
  }

  onWeekChange(e, { value }) {
    this.props.changeWeek(value);
  }

  onGroupChange(e, { value }) {
    this.props.changeGroup(value);
    this.props.fechSchedulesForGroup(value);
  }

  onAddButtonClick(event) {
    event.preventDefault();
    const { group, semigroup, week } = this.props.schedule;
    const customProps = {
      group,
      semigroup,
      week
    };
    this.props.showModal(MODALS.ADD_SCHEDULE, customProps);
  }

  extractOptionsFromGroup() {
    return this.props.groups.all.map(group => ({
      key: group._id,
      text: group.id,
      value: group._id,
      as: Link,
      to: `/schedules/${group.id}`
    }));
  }

  render() {
    return (
      <Filter
        {...this.props}
        groupOptions={this.extractOptionsFromGroup()}
        onSemigroupChange={this.onSemigroupChange}
        onWeekChange={this.onWeekChange}
        onGroupChange={this.onGroupChange}
        onAddButtonClick={this.onAddButtonClick}
      />
    );
  }
}

FilterContainer.propTypes = {
  getGroups: PropTypes.func.isRequired,
  changeGroup: PropTypes.func.isRequired,
  changeSemigroup: PropTypes.func.isRequired,
  changeWeek: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  schedule: state.schedule,
  groups: state.groups,
  auth: state.auth
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...scheduleActions,
      ...modalActions,
      ...groupActions
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer);
