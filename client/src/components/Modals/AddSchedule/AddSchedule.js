import React, { PropTypes } from 'react';
import { Header, Modal, Button } from 'semantic-ui-react';

import AddScheduleFormContainer from './AddScheduleForm/index';

const AddSchedule = (props) => {
  const { hideModal, group, submit, reset } = props;
  return (
    <Modal open onClose={hideModal} dimmer="blurring" size="large">
      <Header icon="calendar" content={`Schedule for ${group}`} />
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

AddSchedule.propTypes = {
  hideModal: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired
};

export default AddSchedule;
