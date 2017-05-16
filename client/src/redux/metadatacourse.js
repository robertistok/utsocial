import axios from 'axios';

const GET_METADATA = 'utsocial/metadatacourse/get-metadata';
const GET_METADATA_SUCCESS = 'utsocial/metadatacourse/get-metadata-success';
const GET_METADATA_ERROR = 'utsocial/metadatacourse/get-metadata-error';

const ADD_MATERIAL = 'utsocial/metadatacourse/add-material';
const ADD_MATERIAL_SUCCESS = 'utsocial/metadatacourse/add-material-success';
const ADD_MATERIAL_ERROR = 'utsocial/metadatacourse/add-material-error';

const UPDATE_MATERIAL = 'utsocial/metadatacourse/update-material';
const UPDATE_MATERIAL_SUCCESS = 'utsocial/metadatacourse/update-material-success';
const UPDATE_MATERIAL_ERROR = 'utsocial/metadatacourse/update-material-error';

const DELETE_MATERIAL = 'utsocial/metadatacourse/delete-material';
const DELETE_MATERIAL_SUCCESS = 'utsocial/metadatacourse/delete-material-success';
const DELETE_MATERIAL_ERROR = 'utsocial/metadatacourse/delete-material-error';

const RESET_METADATA = 'utsocial/metadatacourse/reset';

export function getMetaData(courseID, lang) {
  return (dispatch) => {
    dispatch({ type: GET_METADATA });
    axios({
      method: 'get',
      url: `/api/courses/meta/get/${courseID}/${lang}`,
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then((response) => {
        dispatch({
          type: GET_METADATA_SUCCESS,
          payload: {
            materials: response.data.materials,
            description: response.data.description
          }
        });
      })
      .catch(err => dispatch({ type: GET_METADATA_ERROR, payload: err }));
  };
}

export function addMaterial(id, lang, type, link, description) {
  return (dispatch) => {
    dispatch({ type: ADD_MATERIAL });
    axios({
      method: 'post',
      url: '/api/courses/meta/addMaterial',
      data: { id, lang, type, link, description },
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then((response) => {
        dispatch({
          type: ADD_MATERIAL_SUCCESS,
          payload: response.data.newMaterial
        });
      })
      .catch(err => dispatch({ type: ADD_MATERIAL_ERROR, payload: err }));
  };
}

export function updateMaterial(materialID, courseID, lang, link, description) {
  return (dispatch) => {
    dispatch({ type: UPDATE_MATERIAL });
    axios({
      method: 'post',
      url: '/api/courses/meta/updateMaterial',
      data: { materialID, courseID, lang, link, description },
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then((response) => {
        dispatch({
          type: UPDATE_MATERIAL_SUCCESS,
          payload: { id: materialID, newMaterial: response.data }
        });
      })
      .catch(err => dispatch({ type: UPDATE_MATERIAL_ERROR, payload: err }));
  };
}

export function deleteMaterial(id, lang, materialID) {
  return (dispatch) => {
    dispatch({ type: DELETE_MATERIAL });
    axios({
      method: 'post',
      url: '/api/courses/meta/deleteMaterial',
      data: { id, lang, materialID },
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then(() => {
        dispatch({
          type: DELETE_MATERIAL_SUCCESS,
          payload: materialID
        });
      })
      .catch(err => dispatch({ type: UPDATE_MATERIAL_ERROR, payload: err }));
  };
}

export function resetMetadataCourse() {
  return { type: RESET_METADATA };
}

const INITIAL_STATE = {
  materials: [],
  description: '',
  loading: false,
  error: ''
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case GET_METADATA:
      return { ...state, loading: true };
    case GET_METADATA_SUCCESS:
      return {
        ...state,
        materials: action.payload.materials.sort(
          (a, b) => a.enteredOn < b.enteredOn
        ),
        description: action.payload.description,
        loading: false
      };
    case GET_METADATA_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };

    case ADD_MATERIAL:
      return { ...state, loading: true };
    case ADD_MATERIAL_SUCCESS:
      return {
        ...state,
        materials: [action.payload, ...state.materials],
        loading: false
      };
    case ADD_MATERIAL_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };

    case UPDATE_MATERIAL:
      return { ...state, loading: true };
    case UPDATE_MATERIAL_SUCCESS:
      return {
        ...state,
        materials: state.materials
          .map(
            material =>
              material._id === action.payload.id
                ? action.payload.newMaterial
                : material
          )
          .sort((a, b) => a.enteredOn < b.enteredOn),
        loading: false
      };
    case UPDATE_MATERIAL_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };

    case DELETE_MATERIAL:
      return { ...state, loading: true };
    case DELETE_MATERIAL_SUCCESS:
      return {
        ...state,
        materials: state.materials.filter(
          material => material._id !== action.payload
        ),
        loading: false
      };
    case DELETE_MATERIAL_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };

    case RESET_METADATA:
      return INITIAL_STATE;
    default:
      return state;
  }
}
