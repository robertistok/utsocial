import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';

class GradeRow extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.gradesList !== nextProps.gradesList ||
      nextProps.numberOfGrades !== this.props.numberOfGrades;
  }

  render() {
    const {
      name,
      index,
      _id,
      gradesList,
      types,
      numberOfGrades,
      component: GradeItem,
      numbered,
      withName
    } = this.props;

    return (
      <StyledRow>
        {numbered && <Table.Cell collapsing>{index + 1}</Table.Cell>}
        {withName && <Table.Cell collapsing>{name}</Table.Cell>}
        {types.map((type) => {
          if (numberOfGrades[type] !== undefined) {
            let index = 1;
            const grades = [];

            while (index <= numberOfGrades[type]) {
              grades.push({ index, type });
              index += 1;
            }

            return grades.map(({ type, index }) => {
              let gradeObj;
              if (gradesList !== undefined && gradesList[type] !== undefined) {
                gradeObj = gradesList[type].find(item => item.number === index);
              }

              return (
                <GradeItem
                  key={_id + type + index}
                  student={_id}
                  type={type}
                  number={index}
                  gradeObj={gradeObj}
                />
              );
            });
          }
          return (
            <GradeItem
              key={`${_id}${type}first`}
              student={_id}
              type={type}
              number={1}
            />
          );
        })}
      </StyledRow>
    );
  }
}

const {
  string,
  number,
  arrayOf,
  shape,
  object,
  bool,
  func
} = PropTypes;

const gradeShape = arrayOf(
  shape({
    type: string.isRequired,
    grade: number.isRequired,
    number: number.isRequired
  })
);

GradeRow.propTypes = {
  _id: string,
  numberOfGrades: object.isRequired,
  name: string,
  index: number,
  gradesList: shape({
    final: gradeShape,
    lab: gradeShape,
    lecture: gradeShape,
    seminar: gradeShape,
    project: gradeShape
  }),
  types: arrayOf(string),
  numbered: bool.isRequired,
  withName: bool.isRequired,
  component: func.isRequired
};

const StyledRow = styled(Table.Row)`
	.editing {
		background-color: ${props => props.theme.selected};
	}

	.edited {
		background-color: ${props => props.theme.newNotification};
	}
`;

export default GradeRow;
