import React, { PropTypes } from 'react';
import { Header, Modal, Button } from 'semantic-ui-react';

import NewScheduleFormContainer from './NewScheduleForm/index';

const ScheduleModal = (props) => {
  const { hideModal, group } = props;
  return (
    <Modal open onClose={hideModal} dimmer="blurring" size="large">
      <Header icon="calendar" content={`Schedule for ${group}`} />
      <Modal.Content>
        <NewScheduleFormContainer />
      </Modal.Content>
      <Modal.Actions>
        <Button positive content="Submit schedule" />
      </Modal.Actions>
    </Modal>
  );
};

ScheduleModal.propTypes = {
  hideModal: PropTypes.func.isRequired
};

export default ScheduleModal;
