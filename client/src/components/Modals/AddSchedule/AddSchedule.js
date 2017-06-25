import React from 'react';
import PropTypes from 'prop-types';
import { Header, Modal, Button } from 'semantic-ui-react';

import AddScheduleFormContainer from './AddScheduleForm/index';

const AddSchedule = (props) => {
  const { hideModal, submit, reset, selectedGroupID } = props;

  return (
    <Modal open onClose={hideModal} dimmer="blurring" size="large">
      <Header icon="calendar" content={`Schedule for ${selectedGroupID}`} />
      <Modal.Content>
        <AddScheduleFormContainer />
      </Modal.Content>
      <Modal.Actions>
        <Button
          positive
          content="Submit schedule"
          onClick={() => submit('addScheduleModalForm')}
        />
        <Button
          negative
          content="Clear"
          onClick={() => reset('addScheduleModalForm')}
        />
      </Modal.Actions>
    </Modal>
  );
};

const { func, string } = PropTypes;
AddSchedule.propTypes = {
  hideModal: func.isRequired,
  submit: func.isRequired,
  reset: func.isRequired,
  selectedGroupID: string.isRequired
};

export default AddSchedule;
