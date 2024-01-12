
// LocatorTable.js
import React from 'react';
import { Table, Space, Button } from 'antd';

const LocatorTable = ({ locators, onEdit, onDelete }) => {
  const columns = [
    { title: 'LOCATOR CODE', dataIndex: 'locatorCode', key: 'locatorCode', fixed: 'left', },
    { title: 'DESCRIPTION', dataIndex: 'description', key: 'description', fixed: 'left', width: 120 },
    { title: 'LOCATION', dataIndex: 'location', key: 'location' },
    { title: 'CAPACITY', dataIndex: 'capacity', key: 'capacity' },
    { title: 'TYPE', dataIndex: 'type', key: 'type' },
    { title: 'STATUS', dataIndex: 'status', key: 'status' },
    { title: 'OWNER/RESPONSIBLE PARTY', dataIndex: 'owner', key: 'owner' },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button type="primary" style={{ backgroundColor: '#ff8a00' }} onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Button danger onClick={() => onDelete(record.id)}>
          InActive
          </Button>
        </Space>
      ),
    },
  ];

  return <Table dataSource={locators} columns={columns} scroll={{ x: 'max-content' }} />;
};

export default LocatorTable;
