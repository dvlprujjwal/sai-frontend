import { BASE_URL } from "../../utils/BaseUrl";

export const setVendors = (vendors) => ({
  type: 'SET_VENDORS',
  payload: vendors,
});

export const fetchVendors = () => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/getVendorMaster`);
    const data = await response.json();

    dispatch(setVendors(data.responseData));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const updateVendor = (vendorId, values) => async (dispatch) => {
  try {
    const updateResponse = await fetch(`${BASE_URL}/updateVendorMaster`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vendorId,
        ...values,
      }),
    });

    if (updateResponse.ok) {
      dispatch(fetchVendors()); // Refresh the vendor list after updating
    } else {
      console.error('Update failed:', updateResponse.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const saveVendor = (values) => async (dispatch) => {
  try {
    const createResponse = await fetch(`${BASE_URL}/saveVendorMaster`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (createResponse.ok) {
      dispatch(fetchVendors()); // Refresh the vendor list after creating
    } else {
      console.error('Create failed:', createResponse.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const deleteVendor = (vendorId) => async (dispatch) => {
  try {
    const deleteResponse = await fetch(`${BASE_URL}/deleteVendorMaster`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vendorId,
      }),
    });

    if (deleteResponse.ok) {
      dispatch(fetchVendors()); // Refresh the vendor list after deletion
    } else {
      console.error('Delete failed:', deleteResponse.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
