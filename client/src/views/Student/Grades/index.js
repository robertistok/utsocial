import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import { withMountingTransition } from '../../../components/hocs';
import * as coursesActions from '../../../redux/courses';
import TableContainer from './Table';
import FilterContainer from './Filter';

class Grades extends Component {
  componentDidMount() {
    const { fetchAllCourses } = this.props;
    fetchAllCourses();
  }

  render() {
    return (
      <div>
        <FilterContainer />
        <TableContainer />
      </div>
    );
  }
}

const { func } = PropTypes;
Grades.propTypes = {
  fetchAllCourses: func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...coursesActions }, dispatch);

const enhance = compose(
  withMountingTransition,
  connect(null, mapDispatchToProps)
);

export default enhance(Grades);
