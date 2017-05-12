import React from 'react';
import { Table } from 'semantic-ui-react';

const Header = (props) => {
  const { types, cellDescription, isNumbered } = props;

  return (
    <Table.Header>
      <Table.Row>
        {isNumbered && <Table.HeaderCell rowSpan="2">Nr.</Table.HeaderCell>}
        <Table.HeaderCell rowSpan="2">{cellDescription}</Table.HeaderCell>
        {types.map(type => (
          <Table.HeaderCell key={type}>{type}</Table.HeaderCell>
        ))}
      </Table.Row>

      <Table.Row>
        <Table.HeaderCell>Grade</Table.HeaderCell>
        <Table.HeaderCell>Grade</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
};

export default Header;
