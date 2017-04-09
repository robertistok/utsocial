import React from 'react';
import { connect } from 'react-redux';

import AddScheduleContainer from './AddSchedule/index';
import ShowSchedule from './ShowSchedule/ShowSchedule';

import * as modalActions from '../../redux/modals';

import { MODALS } from '../../constants';

const ModalSwitcher = (props) => {
  let Modal;
  const { modals: { currentModal, customProps } } = props;
  switch (currentModal) {
    case MODALS.ADD_SCHEDULE:
      Modal = AddScheduleContainer;
      break;
    case MODALS.SHOW_SCHEDULE:
      Modal = ShowSchedule;
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
