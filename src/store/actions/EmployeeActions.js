import { BASE_URL } from "../../utils/BaseUrl";

export const setEmployees = (employees) => ({
  type: 'SET_EMPLOYEES',
  payload: employees,
});

export const fetchEmployees = () => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/getEmpMaster`);
    const data = await response.json();

    dispatch(setEmployees(data.responseData));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const updateEmployee = (employeeId, values) => async (dispatch) => {
  try {
    const updateResponse = await fetch(`${BASE_URL}/updateEmpMaster`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employeeId,
        ...values,
      }),
    });

    if (updateResponse.ok) {
      dispatch(fetchEmployees()); // Refresh the employee list after updating
    } else {
      console.error('Update failed:', updateResponse.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const saveEmployee = (values) => async (dispatch) => {
  try {
    const createResponse = await fetch(`${BASE_URL}/saveEmpMaster`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (createResponse.ok) {
      dispatch(fetchEmployees()); // Refresh the employee list after creating
    } else {
      console.error('Create failed:', createResponse.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const deleteEmployee = (employeeId) => async (dispatch) => {
  try {
    const deleteResponse = await fetch(`${BASE_URL}/deleteEmpMaster`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employeeId,
      }),
    });

    if (deleteResponse.ok) {
      dispatch(fetchEmployees()); // Refresh the employee list after deletion
    } else {
      console.error('Delete failed:', deleteResponse.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
