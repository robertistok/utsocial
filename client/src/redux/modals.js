const HIDE_MODAL = 'utsocial/modals/hidemodal';
const SHOW_MODAL = 'utsocial/modals/showmodal';

export function showModal(modal, customprops) {
  return {
    type: SHOW_MODAL,
    payload: {
      modal,
      customprops
    }
  };
}

export function hideModal() {
  return {
    type: HIDE_MODAL
  };
}

const INITIAL_STATE = { currentModal: undefined, customProps: {} };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        currentModal: action.payload.modal,
        customProps: action.payload.customprops
      };
    case HIDE_MODAL:
      return {
        ...state,
        currentModal: undefined,
        customProps: {}
      };
    default:
      return state;
  }
}
