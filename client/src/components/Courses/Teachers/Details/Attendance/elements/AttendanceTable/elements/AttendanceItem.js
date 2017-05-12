import React, { Component } from 'react';
import styled from 'styled-components';
import { Table } from 'semantic-ui-react';

class AttendanceItem extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.hasAttendance !== this.props.hasAttendance) {
      return true;
    }

    return false;
  }

  render() {
    const {
      isBeforeToday,
      hasAttendance,
      onClick
    } = this.props;

    return (
      <StyledCell
        selectable={isBeforeToday}
        disabled={!isBeforeToday}
        positive={isBeforeToday && hasAttendance}
        negative={isBeforeToday && !hasAttendance}
        onClick={onClick}
        textAlign="center"
      >
        {isBeforeToday ? hasAttendance ? 'pres' : 'abs' : ''}
      </StyledCell>
    );
  }
}

const StyledCell = styled(Table.Cell)`

`;

export default AttendanceItem;
