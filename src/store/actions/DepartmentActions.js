// DepartmentActions.js
import { BASE_URL } from "../../utils/BaseUrl";

export const setDepartments = (departments) => ({
  type: 'SET_DEPARTMENTS',
  payload: departments,
});

export const fetchDepartments = () => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/getDeptMaster`);
    const data = await response.json();

    dispatch(setDepartments(data.responseData));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const updateDepartment = (departmentId, values) => async (dispatch) => {
  try {
    const updateResponse = await fetch(`${BASE_URL}/updateDeptMaster`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        departmentId,
        ...values,
      }),
    });

    if (updateResponse.ok) {
      dispatch(fetchDepartments()); // Refresh the department list after updating
    } else {
      console.error('Update failed:', updateResponse.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const saveDepartment = (values) => async (dispatch) => {
  try {
    const createResponse = await fetch(`${BASE_URL}/saveDeptMaster`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (createResponse.ok) {
      dispatch(fetchDepartments()); // Refresh the department list after creating
    } else {
      console.error('Create failed:', createResponse.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const deleteDepartment = (departmentId) => async (dispatch) => {
  try {
    const deleteResponse = await fetch(`${BASE_URL}/deleteDeptMaster`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'string', // Replace 'string' with the actual user ID
        departmentId,
      }),
    });

    if (deleteResponse.ok) {
      dispatch(fetchDepartments()); // Refresh the department list after deletion
    } else {
      console.error('Delete failed:', deleteResponse.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
