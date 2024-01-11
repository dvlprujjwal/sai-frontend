// LocationPage.js
import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import LocationTable from './LocationTable';
import LocationForm from './LocationForm';

const initialLocations = [
  {
    id: 1,
    locationId: 'L001',
    locationName: 'Office 1',
    address: '123 Main St',
    city: 'Cityville',
    zipCode: '12345',
    state: 'Stateville',
    panNo: 'ABCDE1234F',
    emailId: 'office1@example.com',
    contactNo: '9876543210',
    gstinNo: 'GSTIN12345',
    status: 'Active',
    endDate: '2023-12-31',
    latitude: '12.345',
    longitude: '67.890',
  },
  // Add more dummy data as needed
];

const LocationPage = () => {
  const [locations, setLocations] = useState(initialLocations);
  const [visible, setVisible] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleEdit = (location) => {
    setEditingLocation(location);
    setVisible(true);
  };

  const handleDelete = (locationId) => {
    // Implement delete logic here
  };

  const handleFormSubmit = (values) => {
    if (editingLocation) {
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
          placeholder="Search locations"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '200px' }}
        />
        <Button type="primary" className='saitheme-btn' onClick={() => setVisible(true)}>
          Add Location
        </Button>
      </div>
      <LocationTable
        locations={locations.filter((location) =>
          location.locationName.toLowerCase().includes(searchText.toLowerCase())
        )}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        title={editingLocation ? 'Edit Location' : 'Add Location'}
        visible={visible}
        onCancel={() => {
          setEditingLocation(null);
          setVisible(false);
        }}
        footer={null}
      >
        <LocationForm onSubmit={handleFormSubmit} initialValues={editingLocation} />
      </Modal>
    </div>
  );
};

export default LocationPage;
