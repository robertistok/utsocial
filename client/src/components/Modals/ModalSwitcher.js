import React from 'react';
import { connect } from 'react-redux';

import ScheduleModalContainer from './ScheduleModal/index';

import * as modalActions from '../../redux/modals';

import { MODALS } from '../../constants';

const ModalSwitcher = (props) => {
  let Modal;
  const { modals: { currentModal, customProps } } = props;
  switch (currentModal) {
    case MODALS.ADD_SCHEDULE:
      Modal = ScheduleModalContainer;
      break;
    default:
      return null;
  }

  return <Modal {...props} {...customProps} />;
};

const mapStateToProps = state => ({
  modals: state.modals
});

export default connect(mapStateToProps, modalActions)(ModalSwitcher);
