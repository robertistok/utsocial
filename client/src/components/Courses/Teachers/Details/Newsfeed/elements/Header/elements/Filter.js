import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';

import {
  capitalizeFirstLetter
} from '../../../../../../../../utils/string-operations';

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

const StyledDropdown = styled(Dropdown)`
	width: 150px !important;
	margin: 10px !important;
`;

export default Filter;
