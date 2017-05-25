import React from 'react';
import styled from 'styled-components';
import { Form } from 'semantic-ui-react';

import { media } from '../../../../utils/style-utils';

const years = [1, 2, 3, 4];
const yearOptions = [
  { key: 'all', value: 'all', text: 'All' },
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
  const {} = props;

  return (
    <StyledForm>
      <StyledSelect
        selection
        label="Year"
        placeholder="Select a year"
        options={yearOptions}
      />
      <StyledSelect
        selection
        label="Semester"
        placeholder="Select a semester"
        options={semesterOptions}
      />
    </StyledForm>
  );
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
