// UOMTable.js
import React from 'react';
import { Table, Space, Button } from 'antd';

const UOMTable = ({ uoms, onEdit, onDelete }) => {
  const columns = [
    { title: 'UOM CODE', dataIndex: 'uomCode', key: 'uomCode', fixed: 'left', width: 120 },
    { title: 'UOM NAME', dataIndex: 'uomName', key: 'uomName' },
    { title: 'UOM DESCRIPTION', dataIndex: 'uomDescription', key: 'uomDescription' },
    { title: 'CLASS NAME', dataIndex: 'className', key: 'className' },
    { title: 'BASE UOM NAME', dataIndex: 'baseUomName', key: 'baseUomName' },
    { title: 'END DATE', dataIndex: 'endDate', key: 'endDate' },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button type="primary" className='saitheme-btn' onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Button danger onClick={() => onDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return <Table dataSource={uoms} columns={columns} scroll={{ x: 'max-content' }} />;
};

export default UOMTable;
