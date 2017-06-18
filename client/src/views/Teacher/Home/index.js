import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as coursesActions from '../../../redux/courses';
import Home from '../../../components/Home';
import { getToken } from '../../../utils/sessionOperations';
import Loader from '../../../components/common/Loader';

class TeachersHomeContainer extends Component {
  componentDidMount() {
    if (this.props.teachings.length !== 0) {
      this.fetchFeed();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.teachings.length !== this.props.teachings.length) {
      this.fetchFeed(nextProps);
    }
  }

  fetchFeed(props = this.props) {
    const {
      loggedInUser: { _id: teacherID },
      teachings,
      getFeedForTeacher
    } = props;

    const teachingsReduced = teachings.reduce(
      (acc, item) => ({
        ...acc,
        courseIDs: [...acc.courseIDs, item._id],
        langs: {
          ...acc.langs,
          [item._id]: acc.langs[item._id] !== undefined
            ? [...acc.langs[item._id], item.lang]
            : [item.lang]
        }
      }),
      { courseIDs: [], langs: {} }
    );

    const { courseIDs, langs } = teachingsReduced;

    if (getToken() !== null) {
      getFeedForTeacher(teacherID, courseIDs, langs);
    }
  }

  render() {
    const { loading } = this.props;

    if (loading === true) {
      return <Loader loadingText="Fetching posts..." />;
    }
    return <Home {...this.props} />;
  }
}

const { shape, string, arrayOf, bool } = PropTypes;
TeachersHomeContainer.propTypes = {
  teachings: arrayOf(
    shape({ _id: string.isRequired, lang: string.isRequired })
  ),
  loading: bool
};

const mapStateToProps = state => ({
  loggedInUser: state.account.auth.user,
  newsFeed: state.courses.newsFeed,
  teachings: state.teachers.courses,
  loading: state.courses.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...coursesActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  TeachersHomeContainer
);
