// utils.js

import axios from 'axios';

// Action types
export const FETCH_USER_ORG_DETAILS_REQUEST = 'FETCH_USER_ORG_DETAILS_REQUEST';
export const FETCH_USER_ORG_DETAILS_SUCCESS = 'FETCH_USER_ORG_DETAILS_SUCCESS';
export const FETCH_USER_ORG_DETAILS_FAILURE = 'FETCH_USER_ORG_DETAILS_FAILURE';

// Action creators
export const fetchUserOrgDetails = (userId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USER_ORG_DETAILS_REQUEST });
    try {
      const userResponse = await axios.post('https://sai-services.azurewebsites.net/sai-inv-mgmt/master/getUserMasterById', {
        id: userId,
        userId: ''
      });
      
      const organizationId = userResponse.data.responseData.organizationId;
      
      const orgResponse = await axios.post('https://sai-services.azurewebsites.net/sai-inv-mgmt/master/getOrgMasterById', {
        id: organizationId,
        userId: 'string'
      });
      
      const payload = {
        user: userResponse.data.responseData,
        organization: orgResponse.data.responseData
      };

      dispatch({ type: FETCH_USER_ORG_DETAILS_SUCCESS, payload });
    } catch (error) {
      dispatch({ type: FETCH_USER_ORG_DETAILS_FAILURE, payload: error.message });
    }
  };
};
