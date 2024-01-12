// OrganizationTable.js
import React, { useState } from 'react';
import { Table, Button, Modal, Space, Input } from 'antd';
import OrganizationForm from './OrganizationForm';

const OrganizationTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [searchText, setSearchText] = useState('');

  const organizations = [
    // Sample data, replace this with your actual data
    {
      key: '1',
      organizationId: '1',
      organizationName: 'ABC Corp',
      location: 'City',
      locationAddress: '123 Street, City',
      contactNo: '1234567890',
      email: 'abc@example.com',
      gstin: 'GST123',
    },
    {
      key: '2',
      organizationId: '2',
      organizationName: ' Corp',
      location: 'City',
      locationAddress: '123 Street, City',
      contactNo: '1234567890',
      email: 'abc@example.com',
      gstin: 'GST123',
    },
    {
      key: '3',
      organizationId: '3',
      organizationName: 'ABC Corp',
      location: 'City',
      locationAddress: '123 Street, City',
      contactNo: '1234567890',
      email: 'abc@example.com',
      gstin: 'GST123',
    }, {
      key: '4',
      organizationId: '4',
      organizationName: 'ABC Corp',
      location: 'City',
      locationAddress: '123 Street, City',
      contactNo: '123567890',
      email: 'abc@example.com',
      gstin: 'GST123',
    },
    // Add more organization objects as needed
  ];


  const filteredOrganizations = organizations.filter((org) =>
    Object.values(org).some(
      (value) =>
        value &&
        typeof value === "string" &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns = [
    {
      title: 'Sub-Organization ID',
      dataIndex: 'organizationId',
      key: 'organizationId',
    },
    {
      title: 'Sub-Organization Name',
      dataIndex: 'organizationName',
      key: 'organizationName',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Location Address',
      dataIndex: 'locationAddress',
      key: 'locationAddress',
    },
    {
      title: 'Contact No.',
      dataIndex: 'contactNo',
      key: 'contactNo',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'GSTIN',
      dataIndex: 'gstin',
      key: 'gstin',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Button type="primary" style={{backgroundColor:'#ff8a00'}} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record.key)}>
          InActive
          </Button>
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEdit = (record) => {
    setSelectedOrganization(record);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    // Handle delete action
    const updatedOrganizations = organizations.filter((org) => org.key !== String(key));
    console.log('Delete organization with key:', key);
    console.log('Updated organizations:', updatedOrganizations);
  };


  const handleFormSubmit = (values) => {
    // Handle form submission, you can send the form data to the server or perform any other action
    console.log('Received form values:', values);
    setIsModalVisible(false);
  };

  return (
    <div>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <Input
          placeholder="Search organizations"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '200px' }}
        />
        <Button type="primary" style={{backgroundColor:'#ff8a00'}}  onClick={showModal}>
          Add Organization
        </Button>
      </div>

      <Table dataSource={filteredOrganizations} columns={columns} pagination={{ pageSize: 5 }} />

      <Modal
        title={selectedOrganization ? 'Edit Organization' : 'Add Organization'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <OrganizationForm
          initialValues={selectedOrganization}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </div>
  );
};

export default OrganizationTable;
