import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import * as scheduleActions from '../../../../redux/schedule';
import * as modalActions from '../../../../redux/modals';
import * as groupActions from '../../../../redux/groups';

import Filter from './Filter';
import { MODALS } from '../../../../utils/constants';

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
    this.props.getGroups('all');
  }

  onSemigroupChange(e, { value }) {
    this.props.changeSemigroup(value);
  }

  onWeekChange(e, { value }) {
    this.props.changeWeek(value);
  }

  onGroupChange(e, { value }) {
    this.props.changeScheduleOf(value);
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
    const { groups: { all } } = this.props;
    return all.map(group => ({
      key: group._id,
      text: group.id,
      value: group._id,
      flag: group.lang === 'eng' ? 'gb' : 'ro',
      as: Link,
      to: `/schedules/${group.id}`
    }));
  }

  render() {
    return (
      // <table>
      // 	<tr>
      // 		<td>male</td>
      // 		<td>Bonta M. Sergiu Andrei</td>
      // 		<td>21021815</td>
      // 	</tr>
      // </table>

      (
        <Filter
          {...this.props}
          groupOptions={this.extractOptionsFromGroup()}
          onSemigroupChange={this.onSemigroupChange}
          onWeekChange={this.onWeekChange}
          onGroupChange={this.onGroupChange}
          onAddButtonClick={this.onAddButtonClick}
        />
      )
    );
  }
}

const { func } = PropTypes;
FilterContainer.propTypes = {
  getGroups: func.isRequired,
  changeScheduleOf: func.isRequired,
  changeSemigroup: func.isRequired,
  changeWeek: func.isRequired,
  showModal: func.isRequired
};

const mapStateToProps = state => ({
  schedule: state.schedule,
  groups: state.groups,
  user: state.account.auth.user
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
