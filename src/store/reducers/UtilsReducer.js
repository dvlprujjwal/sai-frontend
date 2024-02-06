// utilsReducers.js

import {
  FETCH_USER_ORG_DETAILS_REQUEST,
  FETCH_USER_ORG_DETAILS_SUCCESS,
  FETCH_USER_ORG_DETAILS_FAILURE
} from '../actions/UtilsAction'; // Corrected import path

const initialState = {
  userOrgDetails: null,
  loading: false,
  error: null
};

const utilsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_ORG_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_USER_ORG_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        userOrgDetails: action.payload,
        error: null
      };
    case FETCH_USER_ORG_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default utilsReducer;
