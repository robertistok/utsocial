import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { StyledDropdown } from '../../../../components/common/Dropdown';

const years = [1, 2, 3, 4];
const yearOptions = [
  ...years.map(year => ({ key: year, value: year, text: `Year ${year}` }))
];

const semesters = [1, 2];
const semesterOptions = [
  ...semesters.map(semester => ({
    key: `${semester}semester`,
    value: semester,
    text: `Semester ${semester}`
  })),
  { key: 'both', value: 'both', text: 'Both' }
];

const Filter = (props) => {
  const {
    filterState: { year, semester },
    onSemesterChange,
    onYearChange
  } = props;

  return (
    <Wrapper>
      <StyledDropdown
        selection
        label="Year"
        placeholder="Select a year"
        options={yearOptions}
        onChange={onYearChange}
        value={year}
      />
      <StyledDropdown
        selection
        label="Semester"
        placeholder="Select a semester"
        options={semesterOptions}
        onChange={onSemesterChange}
        value={semester}
      />
    </Wrapper>
  );
};

const { oneOfType, string, number, shape, func } = PropTypes;
Filter.propTypes = {
  filterState: shape({
    year: number,
    semester: oneOfType([string, number]).isRequired
  }).isRequired,
  onSemesterChange: func.isRequired,
  onYearChange: func.isRequired
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;

	@media screen and (max-width: 500px) {
		flex-direction: column;
		align-items: center;
	}
`;

export default Filter;
