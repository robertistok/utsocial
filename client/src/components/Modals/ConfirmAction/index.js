import React from 'react'; import PropTypes from 'prop-types'
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import styled from 'styled-components';

const ConfirmAction = (props) => {
  const { confirmAction, hideModal, content } = props;

  const confirm = () => {
    confirmAction();
    hideModal();
  };

  return (
    <StyledModal open basic size="small">
      <Header icon="delete calendar" content="Delete material" />
      <Modal.Content>
        <p>{content}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted onClick={hideModal}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" inverted onClick={confirm}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </StyledModal>
  );
};

const { string, func } = PropTypes;
ConfirmAction.propTypes = {
  hideModal: func.isRequired,
  confirmAction: func.isRequired,
  content: string.isRequired
};

const StyledModal = styled(Modal)`
	height: min-content !important;
`;

export default ConfirmAction;
