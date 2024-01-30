// LocationPage.js
import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'antd';
import { connect } from 'react-redux';
import { fetchLocations, updateLocation, saveLocation, deleteLocation } from '../../store/actions/LocationAction';
import LocationTable from './LocationTable';
import LocationForm from './LocationForm';

const LocationPage = ({
  locations,
  fetchLocations,
  updateLocation,
  saveLocation,
  deleteLocation,
}) => {
  const [visible, setVisible] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Fetch data from Redux store on component mount
    fetchLocations();
  }, [fetchLocations]);

  const handleEdit = (location) => {
    setEditingLocation(location);
    setVisible(true);
  };

  const handleDelete = (locationId) => {
    // Implement delete logic using the Redux action
    deleteLocation(locationId);
  };

  const handleFormSubmit = async (values) => {
    try {
      if (editingLocation) {
        // Update logic using the Redux action
        await updateLocation(editingLocation.id, values);
      } else {
        // Create logic using the Redux action
        await saveLocation(values);
      }

      setVisible(false); // Close the modal
      setEditingLocation(null); // Reset the editing location
    } catch (error) {
      console.error('Error:', error);
    }
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

const mapStateToProps = (state) => ({
  locations: state.locations.locations,
});

const mapDispatchToProps = {
  fetchLocations,
  updateLocation,
  saveLocation,
  deleteLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationPage);
