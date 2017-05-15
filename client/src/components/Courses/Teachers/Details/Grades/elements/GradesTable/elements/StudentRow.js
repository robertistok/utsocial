import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';

import GradeItem from './GradeItem';

class StudentRow extends Component {
  render() {
    const {
      name,
      index,
      _id,
      gradesList,
      types,
      numberOfGrades
    } = this.props;

    return (
      <StyledRow>
        <Table.Cell collapsing>{index + 1}</Table.Cell>
        <Table.Cell collapsing>{name}</Table.Cell>
        {types.map((type) => {
          if (numberOfGrades[type] !== undefined) {
            let index = 1;
            const grades = [];

            while (index <= numberOfGrades[type]) {
              grades.push({ index, type });
              index += 1;
            }

            return grades.map(({ type, index }) => {
              let gradeObj = {};
              if (gradesList !== undefined) {
                gradeObj = gradesList.find(
                  item => item.type === type && item.number === index
                );
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
        <GradeItem
          key={`${_id}final`}
          student={_id}
          type="final"
          number={1}
          gradesList={gradesList}
        />
      </StyledRow>
    );
  }
}

const StyledRow = styled(Table.Row)`
	.editing {
		background-color: #F8F8F8;
	}

	.edited {
		background-color: #E8E8E8;
	}
`;

export default StudentRow;
