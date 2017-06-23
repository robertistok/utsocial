import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';

import plusIcon from '../../assets/plus.svg';
import { capitalizeFirstLetter } from '../../utils/string-operations';

const TableHeader = (props) => {
  const {
    types,
    cellDescription,
    numberOfGrades,
    addColumnGrade,
    isTeacher,
    size
  } = props;

  return (
    <Table.Header>
      <Table.Row>
        {isTeacher &&
          <Table.HeaderCell
            rowSpan="2"
            textAlign="center"
            verticalAlign="middle"
            content={'Nr'}
          />}
        {isTeacher &&
          <Table.HeaderCell
            rowSpan="2"
            textAlign="center"
            verticalAlign="middle"
            content={cellDescription}
          />}
        {types.map((type) => {
          const numOfReasons = (numberOfGrades[type] !== undefined &&
            numberOfGrades[type]) ||
            1;
          const isFinal = type === 'final';
          return (
            <TypeCell
              key={type}
              colSpan={!isFinal ? numOfReasons : '1'}
              rowSpan={!isFinal ? '1' : '2'}
              textAlign="center"
              verticalAlign="middle"
              singleLine={!isFinal}
              className={`${size}`}
            >
              <Type>{capitalizeFirstLetter(type)}</Type>
              {isTeacher &&
                !isFinal &&
                <Icon src={plusIcon} onClick={() => addColumnGrade(type)} />}
            </TypeCell>
          );
        })}
      </Table.Row>

      <Table.Row>
        {types.filter(type => type !== 'final').map((type) => {
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
            return [...grades];
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

const { object, string, arrayOf, bool, func } = PropTypes;
TableHeader.propTypes = {
  cellDescription: string,
  numberOfGrades: object.isRequired,
  types: arrayOf(string).isRequired,
  addColumnGrade: func,
  isTeacher: bool.isRequired,
  size: string
};

const Type = styled.span`
	display: inline-block;
	width: 50px;
`;

const Icon = styled.img`
	display: inline-block;
	height: 19px;
	width: 19px;
	margin-left: 10px;
	vertical-align: middle;
	opacity: 0.9;
	transition-duration: 0.3s;
	transition-timing-function: ease-out;

	&:hover {
		opacity: 1;
		cursor: pointer;
		transform: scale(1.2);
	}
`;

const TypeCell = styled(Table.HeaderCell)`
	min-width: 100px;

	&.small {
		min-width: 80px;
	}
`;

export default TableHeader;
