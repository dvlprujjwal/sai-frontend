// DepartmentPage.js
import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import DepartmentTable from './DepartmentTable';
import DepartmentForm from './DepartmentForm';

const initialUsers = [
  {
    id: 1,
    departmentId: 'O001',
    departmentName: 'DPT1',
    location: 'Location1',
    userStatus: 'Active',

  },
  // Add more dummy data as needed
];

const DepartmentPage = () => {
  const [departments, setDepartments] = useState(initialUsers);
  const [visible, setVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleEdit = (user) => {
    setEditingUser(user);
    setVisible(true);
  };

  const handleDelete = (userId) => {
    // Implement delete logic here
  };

  const handleFormSubmit = (values) => {
    if (editingUser) {
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
          placeholder="Search users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '200px' }}
        />
        <Button type="primary" className='saitheme-btn' onClick={() => setVisible(true)}>
          Add Department
        </Button>
      </div>
      <DepartmentTable
        departments={departments.filter((departments) =>
          departments.departmentName.toLowerCase().includes(searchText.toLowerCase())
        )}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        title={editingUser ? 'Edit Department' : 'Add Department'}
        visible={visible}
        onCancel={() => {
          setEditingUser(null);
          setVisible(false);
        }}
        footer={null}
      >
        <DepartmentForm onSubmit={handleFormSubmit} initialValues={editingUser} />
      </Modal>
    </div>
  );
};

export default DepartmentPage;
