import React from 'react';
import { Table } from 'semantic-ui-react';

const StudentRow = (props) => {
  const { name, dates, _id } = props;

  return (
    <Table.Row>
      <Table.Cell>{name}</Table.Cell>
      {dates.map(date => <Table.Cell selectable key={_id + date.day} />)}
    </Table.Row>
  );
};

export default StudentRow;
