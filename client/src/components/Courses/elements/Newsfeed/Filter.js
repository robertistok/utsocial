import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';

import { capitalizeFirstLetter } from '../../../../utils/string-operations';
import { media } from '../../../../utils/style-utils';

const Filter = (props) => {
  const { types, onChange } = props;

  const filterOptions = [
    { key: 'all', text: 'All', value: 'all' },
    { key: 'general', text: 'General', value: 'general' },
    { key: 'attendance', text: 'Attendance', value: 'attendance' },
    { key: 'grades', text: 'Grades', value: 'grades' },
    { key: 'important', text: 'Important', value: 'important' },
    { key: 'unseen', text: 'Unseen', value: 'unseen' },
    { key: 'own', text: 'Own', value: 'own' },
    ...Object.keys(types).filter(type => types[type] === true).map(type => ({
      key: type,
      text: capitalizeFirstLetter(type),
      value: type
    }))
  ];

  return (
    <StyledDropdown
      placeholder="Filter"
      selection
      defaultValue="all"
      options={filterOptions}
      onChange={(e, { value }) => onChange(value)}
    />
  );
};

const { func, bool, shape } = React.PropTypes;
Filter.propTypes = {
  onChange: func.isRequired,
  types: shape({
    lab: bool,
    lecture: bool,
    seminar: bool,
    project: bool
  }).isRequired
};

const StyledDropdown = styled(Dropdown)`
	min-width: 120px !important;
	margin: 10px !important;
	font-size: 14px !important;
	border-radius: 0px !important;
	max-height: 39px !important;
	text-align: center;

	div .text {
		font-size: 13px !important;
	}

	${media.phone`
		font-size: 12px !important;

		div .text {
			font-size: 12px !important;
		}
	`}
`;

export default Filter;
