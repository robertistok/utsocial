import React from 'react';
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

const { func, string } = React.PropTypes;
AddSchedule.propTypes = {
  hideModal: func.isRequired,
  submit: func.isRequired,
  reset: func.isRequired,
  group: string.isRequired
};

export default AddSchedule;
