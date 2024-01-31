import { BASE_URL } from "../../utils/BaseUrl";

export const setOrganizations = (organizations) => ({
  type: 'SET_ORGANIZATIONS',
  payload: organizations,
});

export const fetchOrganizations = () => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/getOrgMaster`);
    const data = await response.json();

    dispatch(setOrganizations(data.responseData));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const updateOrganization = (organizationId, values) => async (dispatch) => {
  try {
    const updateResponse = await fetch(`${BASE_URL}/updateOrgMaster`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        organizationId,
        ...values,
      }),
    });

    if (updateResponse.ok) {
      dispatch(fetchOrganizations()); // Refresh the organization list after updating
    } else {
      console.error('Update failed:', updateResponse.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const saveOrganization = (values) => async (dispatch) => {
  try {
    const createResponse = await fetch(`${BASE_URL}/saveOrgMaster`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (createResponse.ok) {
      dispatch(fetchOrganizations()); // Refresh the organization list after creating
    } else {
      console.error('Create failed:', createResponse.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const deleteOrganization = (organizationId) => async (dispatch) => {
  try {
    const deleteResponse = await fetch(`${BASE_URL}/deleteOrgMaster`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        organizationId,
      }),
    });

    if (deleteResponse.ok) {
      dispatch(fetchOrganizations()); // Refresh the organization list after deletion
    } else {
      console.error('Delete failed:', deleteResponse.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
