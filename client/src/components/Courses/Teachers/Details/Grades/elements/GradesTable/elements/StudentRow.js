import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class StudentRow extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.attendanceList.length !== this.props.attendanceList.length;
  }

  render() {
    const {
      name,
      index
    } = this.props;

    return (
      <Table.Row>
        <Table.Cell collapsing>{index + 1}</Table.Cell>
        <Table.Cell collapsing>{name}</Table.Cell>
      </Table.Row>
    );
  }
}

export default StudentRow;
