import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import * as gradesActions from '../../../../redux/grades';

import Filter from './Filter';

class FilterContainer extends Component {
  constructor(props) {
    super(props);

    this.onYearChange = this.onYearChange.bind(this);
    this.onSemesterChange = this.onSemesterChange.bind(this);
  }

  componentDidMount() {
    const { user: { profile: { group: { year } } }, changeYear } = this.props;

    changeYear(year);
  }

  onYearChange(e, { value: year }) {
    this.props.changeYear(year);
  }

  onSemesterChange(e, { value: semester }) {
    this.props.changeSemester(semester);
  }

  render() {
    return (
      <Filter
        {...this.props}
        onSemesterChange={this.onSemesterChange}
        onYearChange={this.onYearChange}
      />
    );
  }
}

const { func, number, shape, string } = React.PropTypes;
FilterContainer.propTypes = {
  changeYear: func.isRequired,
  changeSemester: func.isRequired,
  user: shape({
    profile: shape({
      group: shape({
        year: number.isRequired,
        _id: string.isRequired,
        id: number.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  schedule: state.schedule,
  groups: state.groups,
  user: state.auth.user,
  filterState: state.grades.filter
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...gradesActions
    },
    dispatch
  );

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhance(FilterContainer);
