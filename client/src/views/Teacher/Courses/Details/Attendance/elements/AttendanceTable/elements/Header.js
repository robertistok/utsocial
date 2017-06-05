import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const Header = (props) => {
  const { dates, cellDescription, isNumbered } = props;

  return (
    <Table.Header>
      <Table.Row>
        {isNumbered && <Table.HeaderCell>Nr.</Table.HeaderCell>}
        <Table.HeaderCell>{cellDescription}</Table.HeaderCell>
        {dates.map(date => (
          <Table.HeaderCell key={date.day}>{date.day}</Table.HeaderCell>
        ))}
        <Table.HeaderCell>Total</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
};

const { bool, string, arrayOf, shape } = PropTypes;
Header.propTypes = {
  dates: arrayOf(
    shape({
      day: string.isRequired
    })
  ).isRequired,
  cellDescription: string.isRequired,
  isNumbered: bool.isRequired
};

export default Header;
