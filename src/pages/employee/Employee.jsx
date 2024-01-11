// EmployeePage.js
import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import EmployeeTable from './EmployeeTable';
import EmployeeForm from './EmployeeForm';

const initialEmployees = [
  {
    id: 1,
    employeeCode: 'E001',
    firstName: 'John',
    lastName: 'Doe',
    contactNo: '9876543210',
    email: 'john.doe@example.com',
    department: 'IT',
    joiningDate: '2023-01-01',
    salaryInformation: '$60,000',
    status: 'Active',
  },
  // Add more dummy data as needed
];

const EmployeePage = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [visible, setVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setVisible(true);
  };

  const handleDelete = (employeeId) => {
    // Implement delete logic here
  };

  const handleFormSubmit = (values) => {
    if (editingEmployee) {
      // Implement update logic here
    } else {
      // Implement create logic here
    }
    setVisible(false);
  };

  return (
    <div>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <Input
          placeholder="Search employees"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '200px' }}
        />
        <Button type="primary" className='saitheme-btn' onClick={() => setVisible(true)}>
          Add Employee
        </Button>
      </div>
      <EmployeeTable
        employees={employees.filter((employee) =>
          employee.firstName.toLowerCase().includes(searchText.toLowerCase())
        )}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        title={editingEmployee ? 'Edit Employee' : 'Add Employee'}
        visible={visible}
        onCancel={() => {
          setEditingEmployee(null);
          setVisible(false);
        }}
        footer={null}
      >
        <EmployeeForm onSubmit={handleFormSubmit} initialValues={editingEmployee} />
      </Modal>
    </div>
  );
};

export default EmployeePage;
