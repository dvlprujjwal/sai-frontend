// LocatorActions.js
import { BASE_URL } from "../../utils/BaseUrl";

export const setLocators = (locators) => ({
  type: 'SET_LOCATORS',
  payload: locators,
});

export const fetchLocators = () => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/getLocatorMaster`);
    const data = await response.json();

    dispatch(setLocators(data.responseData));
  } catch (error) {
    console.error('Error fetching locator data:', error);
  }
};

export const updateLocator = (locatorId, values) => async (dispatch) => {
  try {
    const updateResponse = await fetch(`${BASE_URL}/updateLocatorMaster`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locatorMasterId: locatorId,
        ...values,
      }),
    });

    if (updateResponse.ok) {
      dispatch(fetchLocators()); // Refresh the locator list after updating
    } else {
      console.error('Update failed:', updateResponse.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const saveLocator = (values) => async (dispatch) => {
  try {
    const createResponse = await fetch(`${BASE_URL}/saveLocatorMaster`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (createResponse.ok) {
      dispatch(fetchLocators()); // Refresh the locator list after creating
    } else {
      console.error('Create failed:', createResponse.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const deleteLocator = (locatorId) => async (dispatch) => {
  try {
    const deleteResponse = await fetch(`${BASE_URL}/deleteLocatorMaster`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'string', // Replace 'string' with the actual user ID
        locatorMasterId: locatorId,
      }),
    });

    if (deleteResponse.ok) {
      dispatch(fetchLocators()); // Refresh the locator list after deletion
    } else {
      console.error('Delete failed:', deleteResponse.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
