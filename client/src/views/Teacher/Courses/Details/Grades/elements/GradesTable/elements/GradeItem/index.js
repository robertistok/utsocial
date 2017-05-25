import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as gradesActions from '../../../../../../../../../redux/grades';
import GradeItem from './GradeItem';

class GradeItemContainer extends Component {
  constructor(props) {
    super(props);

    const { gradeObj } = this.props;

    this.state = {
      editing: false,
      focus: false,
      edited: false,
      pristine: true,
      grade: (gradeObj && gradeObj.grade) || '',
      error: false
    };

    this.editGrade = this.editGrade.bind(this);
    this.onGradeChange = this.onGradeChange.bind(this);
    this.onGradeBlur = this.onGradeBlur.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state ||
      nextProps.gradeObj !== this.props.gradeObj;
  }

  onGradeChange(e) {
    const grade = e.target.value;
    this.setState({
      grade,
      error: grade !== '' && (grade < 1 || grade > 10)
    });
  }

  onGradeBlur(e) {
    const newGrade = e.target.value;
    const { error } = this.state;
    const {
      insertGrade,
      deleteGrade,
      updateGrade,
      gradeObj,
      number,
      student,
      assignor,
      selectedGroup: group,
      type,
      course
    } = this.props;

    if (!error) {
      if (gradeObj === undefined && newGrade !== '') {
        this.setState({ edited: true });
        insertGrade({
          grade: newGrade,
          number,
          course,
          student,
          assignor,
          type,
          group
        });
      } else if (
        gradeObj !== undefined &&
        newGrade !== '' &&
        (gradeObj.grade !== parseInt(newGrade, 10) ||
          gradeObj.assignor !== assignor)
      ) {
        this.setState({ edited: true });
        updateGrade(gradeObj._id, student, newGrade, assignor);
      } else if (gradeObj !== undefined && newGrade === '') {
        this.setState({ edited: true });
        deleteGrade(gradeObj._id, student);
      }
    }

    this.setState({ editing: false });
  }

  editGrade() {
    this.setState(prevState => ({
      editing: !prevState.editing
    }));
  }

  render() {
    return (
      <GradeItem
        {...this.state}
        {...this.props}
        onGradeChange={this.onGradeChange}
        onGradeBlur={this.onGradeBlur}
        editGrade={this.editGrade}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const { student, type, number } = props;
  let gradeObj;

  if (state.grades.gradesList[student] !== undefined) {
    gradeObj = state.grades.gradesList[student].find(
      item => item.type === type && item.number === number
    );
  }

  return {
    course: state.courses.selectedCourse.course._id,
    assignor: state.auth.user._id,
    selectedGroup: state.grades.selectedGroup,
    gradeObj
  };
};

const { number, string, shape, func } = React.PropTypes;
GradeItemContainer.propTypes = {
  gradeObj: shape({
    _id: string.isRequired,
    assignor: string.isRequired,
    grade: number.isRequired
  }),
  number: number.isRequired,
  assignor: string.isRequired,
  student: string.isRequired,
  selectedGroup: string.isRequired,
  course: string.isRequired,
  type: string.isRequired,
  insertGrade: func.isRequired,
  updateGrade: func.isRequired,
  deleteGrade: func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...gradesActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GradeItemContainer);
