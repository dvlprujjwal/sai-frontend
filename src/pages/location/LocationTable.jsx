// LocationTable.js
import React from 'react';
import { Table, Space, Button } from 'antd';

const LocationTable = ({ locations, onEdit, onDelete }) => {
  const columns = [
    { title: 'S NO.', dataIndex: 'id', key: 'id', fixed: 'left', width: 80 },
    { title: 'LOCATION ID', dataIndex: 'locationId', key: 'locationId', fixed: 'left',  },
    { title: 'LOCATION NAME', dataIndex: 'locationName', key: 'locationName', fixed: 'left',  },
    { title: 'ADDRESS', dataIndex: 'address', key: 'address' },
    { title: 'CITY', dataIndex: 'city', key: 'city' },
    { title: 'ZIP CODE', dataIndex: 'zipCode', key: 'zipCode' },
    { title: 'STATE', dataIndex: 'state', key: 'state' },
    { title: 'PAN NO.', dataIndex: 'panNo', key: 'panNo' },
    { title: 'EMAIL ID', dataIndex: 'emailId', key: 'emailId' },
    { title: 'CONTACT NO.', dataIndex: 'contactNo', key: 'contactNo' },
    { title: 'Location Type', dataIndex: 'locationType', key: 'locationType' },
    { title: 'GSTIN NO.', dataIndex: 'gstinNo', key: 'gstinNo' },
    { title: 'STATUS', dataIndex: 'status', key: 'status' },
    { title: 'END DATE', dataIndex: 'endDate', key: 'endDate' },
    { title: 'LATITUDE', dataIndex: 'latitude', key: 'latitude' },
    { title: 'LONGITUDE', dataIndex: 'longitude', key: 'longitude' },
    {
      title: 'Actions',
      key: 'actions',
      fixed:'right',
      render: (_, record) => (
        <Space >
          <Button type="primary" className='saitheme-btn' onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Button danger onClick={() => onDelete(record.id)}>
          InActive
          </Button>
        </Space>
      ),
    },
  ];

  return <Table dataSource={locations} columns={columns} scroll={{ x: 'max-content' }} />;
};

export default LocationTable;
