import React from 'react';
import styled from 'styled-components';
import { Table, Input } from 'semantic-ui-react';

import { withToggle } from '../../../../../../../hocs';

const ReasonCell = (props) => {
  const { reason } = props;
  const editing = props.toggledOn;
  const edit = props.toggle;

  return (
    <Wrapper onClick={!editing ? edit : () => {}}>
      {editing ? <ReasonInput value={reason} focus /> : <span>{reason}</span>}
    </Wrapper>
  );
};

const Wrapper = styled(Table.HeaderCell)`
	max-width: 100px;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	font-size: 12px;
	padding: 0px;
`;

const ReasonInput = styled(Input)`
	width: 100%;

	input {
		padding-left: 5px !important;
		padding-right: 5px !important;
		border-radius: 0px !important;
	}
`;

export default withToggle(ReasonCell);
