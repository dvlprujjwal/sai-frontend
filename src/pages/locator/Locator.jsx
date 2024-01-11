
// LocatorPage.js
import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import LocatorTable from './LocatorTable';
import LocatorForm from './LocatorForm';

const initialLocators = [
  {
    id: 1,
    locatorCode: 'LOC001',
    description: 'Main Aisle',
    location: 'Warehouse',
    capacity: 'High',
    type: 'Rack',
    status: 'Active',
    owner: 'John Doe',
  },
  // Add more dummy data as needed
];

const LocatorPage = () => {
  const [locators, setLocators] = useState(initialLocators);
  const [visible, setVisible] = useState(false);
  const [editingLocator, setEditingLocator] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleEdit = (locator) => {
    setEditingLocator(locator);
    setVisible(true);
  };

  const handleDelete = (locatorId) => {
    // Implement delete logic here
  };

  const handleFormSubmit = (values) => {
    if (editingLocator) {
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
          placeholder="Search locators"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '200px' }}
        />
        <Button type="primary" style={{backgroundColor:'#ff8a00'}} onClick={() => setVisible(true)}>
          Add Locator
        </Button>
      </div>
      <LocatorTable
        locators={locators.filter((locator) =>
          locator.description.toLowerCase().includes(searchText.toLowerCase())
        )}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        title={editingLocator ? 'Edit Locator' : 'Add Locator'}
        visible={visible}
        onCancel={() => {
          setEditingLocator(null);
          setVisible(false);
        }}
        footer={null}
      >
        <LocatorForm onSubmit={handleFormSubmit} initialValues={editingLocator} />
      </Modal>
    </div>
  );
};

export default LocatorPage;
