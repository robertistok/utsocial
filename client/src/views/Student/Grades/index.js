import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import styled from 'styled-components';

import * as coursesActions from '../../../redux/courses';
import { withMountingTransition } from '../../../components/hocs';
import TableContainer from './Table';
import FilterContainer from './Filter';
import Loader from '../../../components/common/Loader';

class Grades extends Component {
  componentDidMount() {
    const { fetchAllCourses } = this.props;
    fetchAllCourses();
  }

  render() {
    const { loading } = this.props;
    if (loading === true) {
      return <Loader />;
    }

    return (
      <Wrapper>
        <FilterContainer />
        <TableContainer />
      </Wrapper>
    );
  }
}

const { func, bool } = PropTypes;
Grades.propTypes = {
  fetchAllCourses: func.isRequired,
  loading: bool.isRequired
};

const Wrapper = styled.div`
	margin-top: 40px;
`;

const mapStateToProps = state => ({
  loading: state.courses.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...coursesActions }, dispatch);

const enhance = compose(
  withMountingTransition,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(Grades);
