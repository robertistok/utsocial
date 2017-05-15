import axios from 'axios';

const SHOW_NEW_MATERIAL_FORM = 'utsocial/materials/show-new-material-form';
const HIDE_NEW_MATERIAL_FORM = 'utsocial/materials/hide-new-material-form';

export function showNewMaterialForm(forType) {
  return {
    type: SHOW_NEW_MATERIAL_FORM,
    payload: forType
  };
}

export function hideNewMaterialForm() {
  return {
    type: HIDE_NEW_MATERIAL_FORM
  };
}

const INITIAL_STATE = {
  showForm: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_NEW_MATERIAL_FORM:
      return { ...state, showForm: true };
    case HIDE_NEW_MATERIAL_FORM:
      return { ...state, showForm: false };
    default:
      return state;
  }
}
