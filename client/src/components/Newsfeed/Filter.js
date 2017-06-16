import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { capitalizeFirstLetter } from '../../utils/string-operations';
import { StyledDropdown as Dropdown } from '../common/Dropdown';

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

const { func, bool, shape } = PropTypes;
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
	flex: 1;
	max-height: 39px !important;
	min-width: inherit !important;
`;

export default Filter;
