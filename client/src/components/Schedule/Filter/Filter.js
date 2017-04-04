import React, { PropTypes } from 'react';
import { Form, Select, Button, Icon, Message } from 'semantic-ui-react';

import { SEMIGROUP, FREQUENCY } from '../../../constants';
import './Filter.css';

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
    schedule: { semigroup, week, group },
    onSemigroupChange,
    onWeekChange,
    onGroupChange,
    onAddButtonClick,
    groupOptions
  } = props;

  return (
    <Form size="big" className="filter-form">
      <Form.Group widths="equal">
        <Form.Field
          control={Select}
          options={groupOptions}
          placeholder="Group"
          onChange={onGroupChange}
        />
        <Form.Field
          control={Select}
          options={optionsSemigroup}
          placeholder="Semigroup"
          value={semigroup}
          onChange={onSemigroupChange}
        />
        <Form.Field
          control={Select}
          options={optionsWeek}
          placeholder="Week"
          value={week}
          onChange={onWeekChange}
        />
      </Form.Group>
      <div className="explanation">
        <Message size="mini" className="type lecture" content="Lecture" />
        <Message size="mini" className="type lab" content="Lab" />
        <Message size="mini" className="type project" content="Project" />
        <Message size="mini" className="type seminar" content="Seminar" />
      </div>
      <Button
        animated
        className="add-button"
        disabled={!group}
        onClick={onAddButtonClick}
      >
        <Button.Content visible>Add schedule</Button.Content>
        <Button.Content hidden>
          <Icon name="plus" size="large" />
        </Button.Content>
      </Button>
    </Form>
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

export default Filter;
