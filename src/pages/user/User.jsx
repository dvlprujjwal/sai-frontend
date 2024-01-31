// UserPage.js
import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import UserTable from './UserTable';
import UserForm from './UserForm';

const initialUsers = [
  {
    id: 1,
    organizationId: 'O001',
    userId: 'U001',
    userFirstName: 'John',
    userLastName: 'Doe',
    password: 'password123',
    userType: 'Admin',
    department: 'IT',
    emailId: 'john.doe@example.com',
    contactNo: '9876543210',
    userStatus: 'Active',
    privileges: 'Full Access',
  },
  // Add more dummy data as needed
];

const UserPage = () => {
  const [users, setUsers] = useState(initialUsers);
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
          Add User
        </Button>
      </div>
      <UserTable
        users={users.filter((user) =>
          user.userFirstName.toLowerCase().includes(searchText.toLowerCase())
        )}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        title={editingUser ? 'Edit User' : 'Add User'}
        visible={visible}
        onCancel={() => {
          setEditingUser(null);
          setVisible(false);
        }}
        footer={null}
      >
        <UserForm onSubmit={handleFormSubmit} initialValues={editingUser} />
      </Modal>
    </div>
  );
};

export default UserPage;
