import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Message } from 'semantic-ui-react';
import styled from 'styled-components';

import { SEMIGROUP, FREQUENCY } from '../../utils/constants';

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
      <DropdownsWrapper>
        <StyledDropdown
          options={scheduleOfOptions}
          placeholder="Group"
          onChange={onScheduleOfChange}
          value={scheduleOf}
          selection
        />
        <StyledDropdown
          options={optionsSemigroup}
          placeholder="Semigroup"
          value={semigroup}
          selection
          onChange={onSemigroupChange}
        />
        <StyledDropdown
          options={optionsWeek}
          placeholder="Week"
          value={week}
          selection
          onChange={onWeekChange}
        />
      </DropdownsWrapper>
      {scheduleOf !== undefined
        ? <ExplanationWrapper>
            <Explanation type="lecture">Lecture</Explanation>
            <Explanation type="lab">Lab</Explanation>
            <Explanation type="project">Project</Explanation>
            <Explanation type="seminar">Seminar</Explanation>
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

const DropdownsWrapper = styled.div`
	display: flex;
	margin-bottom: 20px;

	@media screen and (max-width: 768px) {
		flex-direction: column;
	}
`;

const StyledDropdown = styled(Dropdown)`
	flex: 1;
	font-size: 14px !important;
	border-radius: 0px !important;
	max-height: 40px !important;
	text-align: center;
	margin: 10px;

	&.active {
		border-color: ${props => props.theme.primary} !important;
	}

	div {
		border-color: ${props => props.theme.primary} !important;
	}

	div .text {
		font-size: 13px !important;
	}

	@media screen and (max-width: 378px) {
		font-size: 12px !important;

		div .text {
			font-size: 12px !important;
		}
	}
`;

const ExplanationWrapper = styled.div`
	display: flex;
	margin-bottom: 30px;
`;

const Explanation = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 12px;
	padding: 5px;
	min-width: 70px;
	min-height: 29px;
	margin: 0px 5px;

	background-color: ${props => props.theme[props.type]}
`;

export default Filter;
