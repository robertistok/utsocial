import React from 'react'; import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react';

const Header = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Date</Table.HeaderCell>
      <Table.HeaderCell>Presence</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);

export default Header;
