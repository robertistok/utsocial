import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

import { SEMIGROUP, FREQUENCY } from '../../../../utils/constants';
import { media } from '../../../../utils/style-utils';

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
    onGroupChange,
    onAddButtonClick,
    groupOptions,
    user: { type: userType }
  } = props;

  return (
    <Wrapper>
      <StyledForm>
        <StyledFormField
          control={Select}
          options={groupOptions}
          placeholder="Group"
          onChange={onGroupChange}
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

        {userType === 'admin' &&
          <Button animated disabled={!scheduleOf} onClick={onAddButtonClick}>
            <Button.Content visible>Add schedule</Button.Content>
            <Button.Content hidden>
              <Icon name="plus" size="large" />
            </Button.Content>
          </Button>}
      </StyledForm>
      {scheduleOf &&
        <ExplanationWrapper>
          <Explanation lecture><span>Lecture</span></Explanation>
          <Explanation lab><span>Lab</span></Explanation>
          <Explanation project><span>Project</span></Explanation>
          <Explanation seminar><span>Seminar</span></Explanation>
        </ExplanationWrapper>}
    </Wrapper>
  );
};

Filter.propTypes = {
  schedule: PropTypes.shape({
    semigroup: PropTypes.string,
    week: PropTypes.string,
    group: PropTypes.string
  }),
  onGroupChange: PropTypes.func.isRequired,
  onSemigroupChange: PropTypes.func.isRequired,
  onWeekChange: PropTypes.func.isRequired,
  onAddButtonClick: PropTypes.func,
  groupOptions: PropTypes.array
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
  } else if (props.project) {
    return '#c0392b';
  }

  return '#FFFFFF';
}}
`;

export default Filter;
