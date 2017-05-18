import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import styled from 'styled-components';

import { StyledButton } from '../styled-components';

import { withToggle } from '../../../../../../hocs';

class ConfirmRemove extends Component {
  state = { open: false };

  close = () => this.setState({ open: false });

  render() {
    const {
      handleCardDelete,
      toggle: toggleModal,
      toggledOn: open
    } = this.props;

    return (
      <div>
        <StyledButton negative onClick={toggleModal} content="Delete" />

        <StyledModal
          open={open}
          basic
          size="small"
          closeOnDimmerClick
          closeOnDocumentClick
        >
          <Header icon="delete calendar" content="Delete material" />
          <Modal.Content>
            <p>Are you sure you want to delete the selected material?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color="red" inverted onClick={toggleModal}>
              <Icon name="remove" /> No
            </Button>
            <Button
              color="green"
              inverted
              onClick={() => {
                handleCardDelete();
                toggleModal();
              }}
            >
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </StyledModal>
      </div>
    );
  }
}

const StyledModal = styled(Modal)`
	height: min-content !important;
`;

export default withToggle(ConfirmRemove);
