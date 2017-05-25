import React, { PropTypes } from 'react';
import { Form, Select, Message } from 'semantic-ui-react';
import styled from 'styled-components';

import { SEMIGROUP, FREQUENCY } from '../../constants';
import { media } from '../../utils/style-utils';

const optionsWeek = [
  { key: 'o', text: 'Odds', value: FREQUENCY.ODD },
  { key: 'e', text: 'Evens', value: FREQUENCY.EVEN },
  { key: 'b', text: 'Both', value: FREQUENCY.BOTH }
];

const optionsSemigroup = [
  { key: 'sg1', text: 'SG1', value: SEMIGROUP.FIRST },
  { key: 'sg2', text: 'SG2', value: SEMIGROUP.SECOND },
  { key: 'sgb', text: 'Both', value: SEMIGROUP.BOTH }
];

const Filter = (props) => {
  const {
    schedule: { semigroup, week, scheduleOf },
    onSemigroupChange,
    onWeekChange,
    onScheduleOfChange,
    scheduleOfOptions
  } = props;

  return (
    <Wrapper>
      <StyledForm>
        <StyledFormField
          control={Select}
          options={scheduleOfOptions}
          placeholder="Group"
          onChange={onScheduleOfChange}
          value={scheduleOf}
        />
        <StyledFormField
          control={Select}
          options={optionsSemigroup}
          placeholder="Semigroup"
          value={semigroup}
          onChange={onSemigroupChange}
        />
        <StyledFormField
          control={Select}
          options={optionsWeek}
          placeholder="Week"
          value={week}
          onChange={onWeekChange}
        />
      </StyledForm>
      {scheduleOf !== undefined
        ? <ExplanationWrapper>
            <Explanation lecture><span>Lecture</span></Explanation>
            <Explanation lab><span>Lab</span></Explanation>
            <Explanation project><span>Project</span></Explanation>
            <Explanation seminar><span>Seminar</span></Explanation>
          </ExplanationWrapper>
        : <NoGroupsSelected />}

    </Wrapper>
  );
};

const NoGroupsSelected = () => (
  <Message
    header="No groups selected"
    content="Select a group from the dropdown list below in order to check its schedule"
  />
);

Filter.propTypes = {
  schedule: PropTypes.shape({
    semigroup: PropTypes.string,
    week: PropTypes.string,
    group: PropTypes.string
  }),
  onScheduleOfChange: PropTypes.func.isRequired,
  onSemigroupChange: PropTypes.func.isRequired,
  onWeekChange: PropTypes.func.isRequired,
  scheduleOfOptions: PropTypes.array
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	&:first-child {
		margin-top: 30px;
	}
`;

const StyledForm = styled(Form)`
	padding-top: 20px;
	margin-bottom: 30px;
	display: flex;
	justify-content: center;

	${media.tablet`
		flex-direction: column;
		align-items: center;
		`}
`;

const StyledFormField = styled(Form.Field)`
	margin: 10px !important;
	text-align: center;
`;

const ExplanationWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 30px;
`;

const Explanation = styled.div`
	font-size: 12px;
	text-align: center;
	padding: 5px;
	min-width: 70px;
	min-height: 30px;
	margin: 18px 5px;

	background-color: ${(props) => {
  if (props.lecture) {
    return '#27ae60';
  } else if (props.lab) {
    return '#16a085';
  } else if (props.seminar) {
    return '#f1c40f';
  }
  return '#c0392b';
}}
`;

export default Filter;
