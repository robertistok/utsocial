import React from 'react'; import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Form } from 'semantic-ui-react';

const years = [1, 2, 3, 4];
const yearOptions = [
  ...years.map(year => ({ key: year, value: year, text: year }))
];

const semesters = [1, 2];
const semesterOptions = [
  { key: 'both', value: 'both', text: 'Both' },
  ...semesters.map(semester => ({
    key: `${semester}semester`,
    value: semester,
    text: semester
  }))
];

const Filter = (props) => {
  const {
    filterState: { year, semester },
    onSemesterChange,
    onYearChange
  } = props;

  return (
    <StyledForm>
      <StyledSelect
        selection
        label="Year"
        placeholder="Select a year"
        options={yearOptions}
        onChange={onYearChange}
        value={year}
      />
      <StyledSelect
        selection
        label="Semester"
        placeholder="Select a semester"
        options={semesterOptions}
        onChange={onSemesterChange}
        value={semester}
      />
    </StyledForm>
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

const StyledForm = styled(Form)`
	display: flex;
	justify-content: center;

	@media screen and (max-width: 500px) {
		flex-direction: column;
		align-items: center;
	}
`;

const StyledSelect = styled(Form.Select)`
	margin-right: 30px !important;
`;

export default Filter;
