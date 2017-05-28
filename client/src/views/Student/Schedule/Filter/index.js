import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import moment from 'moment';

import * as scheduleActions from '../../../../redux/schedule';
import * as modalActions from '../../../../redux/modals';
import * as groupActions from '../../../../redux/groups';
import Filter from '../../../../components/Schedule/Filter';
import { FIRST_WEEK } from '../../../../utils/constants';

class FilterContainer extends Component {
  constructor(props) {
    super(props);

    this.onSemigroupChange = this.onSemigroupChange.bind(this);
    this.onWeekChange = this.onWeekChange.bind(this);
    this.onScheduleOfChange = this.onScheduleOfChange.bind(this);
    this.extractOptionsFromGroup = this.extractOptionsFromGroup.bind(this);
  }

  componentDidMount() {
    const {
      getGroups,
      user: {
        profile: { group: { year, _id: groupID, id }, semigroup }
      },
      history
    } = this.props;

    const currentWeek = moment().week() % 2 === FIRST_WEEK.week() % 2
      ? '1'
      : '2';

    getGroups(year);
    this.onScheduleOfChange(undefined, { value: groupID });
    this.onSemigroupChange(undefined, { value: semigroup.toString() });
    this.onWeekChange(undefined, { value: currentWeek });
    history.push(`/schedules/${id}`);
  }

  onSemigroupChange(e, { value: semigroup }) {
    this.props.changeSemigroup(semigroup);
  }

  onWeekChange(e, { value: week }) {
    this.props.changeWeek(week);
  }

  onScheduleOfChange(e, { value: group }) {
    this.props.changeScheduleOf(group);
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
      <Filter
        {...this.props}
        scheduleOfOptions={this.extractOptionsFromGroup()}
        onSemigroupChange={this.onSemigroupChange}
        onWeekChange={this.onWeekChange}
        onScheduleOfChange={this.onScheduleOfChange}
      />
    );
  }
}

const { func, number, shape, string, arrayOf } = React.PropTypes;
FilterContainer.propTypes = {
  getGroups: func.isRequired,
  changeScheduleOf: func.isRequired,
  changeSemigroup: func.isRequired,
  changeWeek: func.isRequired,
  user: shape({
    profile: shape({
      group: shape({
        year: number.isRequired,
        _id: string.isRequired,
        id: number.isRequired
      }).isRequired
    }).isRequired
  }).isRequired,
  groups: shape({
    all: arrayOf(
      shape({
        lang: string.isRequired,
        _id: string.isRequired,
        id: number.isRequired
      }).isRequired
    )
  }).isRequired,
  history: shape({ push: func.isRequired }).isRequired
};

const mapStateToProps = state => ({
  schedule: state.schedule,
  groups: state.groups,
  user: state.auth.user
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

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(FilterContainer);
