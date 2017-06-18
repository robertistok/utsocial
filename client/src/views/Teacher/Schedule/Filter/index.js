import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import moment from 'moment';

import * as scheduleActions from '../../../../redux/schedule';
import * as modalActions from '../../../../redux/modals';
import * as groupActions from '../../../../redux/groups';
import * as teachersActions from '../../../../redux/teachers';
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
      fetchColleagues,
      user: { _id: teacherID },
      history,
      courses
    } = this.props;

    const currentWeek = moment().week() % 2 === FIRST_WEEK.week() % 2
      ? '1'
      : '2';

    this.onWeekChange(undefined, { value: currentWeek });
    this.onScheduleOfChange(undefined, { value: teacherID });
    fetchColleagues(courses.map(course => course._id), teacherID);
    history.push(`/schedules/${teacherID}`);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.courses !== this.props.courses) {
      const { fetchColleagues, user: { _id: teacherID } } = nextProps;
      fetchColleagues(nextProps.courses.map(course => course._id), teacherID);
    }
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
    const {
      colleagues,
      user: { _id: teacherID }
    } = this.props;

    const options = [
      {
        key: teacherID,
        text: 'Myself',
        value: teacherID,
        // flag: teacherID.lang === 'eng' ? 'gb' : 'ro',
        as: Link,
        to: `/schedules/${teacherID}`
      },
      ...colleagues.map(colleague => ({
        key: colleague._id,
        text: colleague.name,
        value: colleague._id,
        // flag: colleague.lang === 'eng' ? 'gb' : 'ro',
        as: Link,
        to: `/schedules/${colleague._id}`
      }))
    ];

    return options;
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

const { func, shape, string, arrayOf } = PropTypes;
FilterContainer.propTypes = {
  changeScheduleOf: func.isRequired,
  changeSemigroup: func.isRequired,
  changeWeek: func.isRequired,
  user: shape({
    _id: string.isRequired,
    type: string.isRequired
  }).isRequired,
  colleagues: arrayOf(
    shape({
      name: string.isRequired,
      _id: string.isRequired
    }).isRequired
  ).isRequired,
  history: shape({ push: func.isRequired }),
  fetchColleagues: func.isRequired,
  courses: arrayOf(shape({ _id: string.isRequired }).isRequired).isRequired
};

const mapStateToProps = state => ({
  schedule: state.schedule,
  groups: state.groups,
  user: state.account.auth.user,
  courses: state.teachers.courses,
  colleagues: state.teachers.colleagues
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...scheduleActions,
      ...modalActions,
      ...groupActions,
      ...teachersActions
    },
    dispatch
  );

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(FilterContainer);
