// VendorPage.js
import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import VendorTable from './VendorTable';
import VendorForm from './VendorForm';

const initialVendors = [
  {
    id: 1,
    vendorId: 'V001',
    vendorName: 'Vendor 1',
    contactPerson: 'John Doe',
    address: '456 Market St',
    contactNo: '9876543210',
    zipCode: '54321',
    vendorEmail: 'vendor1@example.com',
    panNo: 'ABCDE1234F',
    gstinNo: 'GSTIN54321',
    type: 'Supplier',
    approval: 'Approved',
    status: 'Active',
  },
  // Add more dummy data as needed
];

const VendorPage = () => {
  const [vendors, setVendors] = useState(initialVendors);
  const [visible, setVisible] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleEdit = (vendor) => {
    setEditingVendor(vendor);
    setVisible(true);
  };

  const handleDelete = (vendorId) => {
    // Implement delete logic here
  };

  const handleFormSubmit = (values) => {
    if (editingVendor) {
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
          placeholder="Search vendors"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '200px' }}
        />
        <Button type="primary" className='saitheme-btn' onClick={() => setVisible(true)}>
          Add Vendor
        </Button>
      </div>
      <VendorTable
        vendors={vendors.filter((vendor) =>
          vendor.vendorName.toLowerCase().includes(searchText.toLowerCase())
        )}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        title={editingVendor ? 'Edit Vendor' : 'Add Vendor'}
        visible={visible}
        onCancel={() => {
          setEditingVendor(null);
          setVisible(false);
        }}
        footer={null}
      >
        <VendorForm onSubmit={handleFormSubmit} initialValues={editingVendor} />
      </Modal>
    </div>
  );
};

export default VendorPage;
