import React from 'react';
import { connect } from 'react-redux';

import AddScheduleContainer from './AddSchedule/index';
import ShowSchedule from './ShowSchedule/ShowSchedule';
import ConfirmAction from './ConfirmAction';

import * as modalActions from '../../redux/modals';
import { MODALS } from '../../constants';

const { ADD_SCHEDULE, SHOW_SCHEDULE, CONFIRM_ACTION } = MODALS;

const ModalSwitcher = (props) => {
  let Modal;
  const { modals: { currentModal, customProps } } = props;

  switch (currentModal) {
    case ADD_SCHEDULE:
      Modal = AddScheduleContainer;
      break;
    case SHOW_SCHEDULE:
      Modal = ShowSchedule;
      break;
    case CONFIRM_ACTION:
      Modal = ConfirmAction;
      break;
    default:
      return null;
  }

  return <Modal {...props} {...customProps} />;
};

const { string, object, shape } = React.PropTypes;
ModalSwitcher.propTypes = {
  modals: shape({ currentModal: string, customProps: object })
};

const mapStateToProps = state => ({
  modals: state.modals
});

export default connect(mapStateToProps, modalActions)(ModalSwitcher);
