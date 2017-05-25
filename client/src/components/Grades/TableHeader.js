import React from 'react';
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';

import plusIcon from '../../../public/plus.svg';
import { capitalizeFirstLetter } from '../../utils/string-operations';

const TableHeader = (props) => {
  const {
    types,
    cellDescription,
    isNumbered,
    numberOfGrades,
    addColumnGrade,
    isTeacher
  } = props;

  return (
    <Table.Header>
      <Table.Row>
        {isNumbered &&
          <Table.HeaderCell
            rowSpan="2"
            textAlign="center"
            verticalAlign="middle"
            content={'Nr'}
          />}
        <Table.HeaderCell
          rowSpan="2"
          textAlign="center"
          verticalAlign="middle"
          content={cellDescription}
        />
        {types.map((type) => {
          const numOfReasons = (numberOfGrades[type] !== undefined &&
            numberOfGrades[type]) ||
            1;
          return (
            <TypeCell
              key={type}
              colSpan={numOfReasons}
              textAlign="center"
              singleLine
            >
              {isTeacher &&
                <Icon src={plusIcon} onClick={() => addColumnGrade(type)} />}
              {capitalizeFirstLetter(type)}
            </TypeCell>
          );
        })}
        <TypeCell
          rowSpan="2"
          content="Final"
          textAlign="center"
          verticalAlign="middle"
        />
      </Table.Row>

      <Table.Row>
        {types.map((type) => {
          if (numberOfGrades[type] !== undefined) {
            let index = 1;
            const grades = [];
            while (index <= numberOfGrades[type]) {
              grades.push(
                <Table.HeaderCell
                  key={type + index}
                  textAlign="center"
                  content={`${index}.`}
                />
              );
              index += 1;
            }
            return grades;
          }
          return (
            <Table.HeaderCell
              key={`${type}first`}
              textAlign="center"
              content="1."
            />
          );
        })}
      </Table.Row>
    </Table.Header>
  );
};

const { object, string, arrayOf, bool, func } = React.PropTypes;
TableHeader.propTypes = {
  cellDescription: string.isRequired,
  numberOfGrades: object.isRequired,
  types: arrayOf(string).isRequired,
  isNumbered: bool.isRequired,
  addColumnGrade: func.isRequired,
  isTeacher: bool.isRequired
};

const Icon = styled.img`
	display: inline-block;
	height: 14px;
	width: 14px;
	margin-right: 10px;
`;

const TypeCell = styled(Table.HeaderCell)`
	min-width: 100px;
`;

export default TableHeader;
