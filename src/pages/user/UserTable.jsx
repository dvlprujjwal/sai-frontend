// UserTable.js
import React from 'react';
import { Table, Space, Button } from 'antd';

const UserTable = ({ users, onEdit, onDelete }) => {
  const columns = [
    { title: 'S NO.', dataIndex: 'id', key: 'id', fixed: 'left', width: 80 },
    { title: 'USER ID', dataIndex: 'userId', key: 'userId', fixed: 'left', },
    { title: 'USER FIRST NAME', dataIndex: 'userFirstName', key: 'userFirstName' },
    { title: 'USER LAST NAME', dataIndex: 'userLastName', key: 'userLastName' },
    { title: 'EMPLOYEE ID', dataIndex: 'employee', key: 'employee' },
    { title: 'SUB-ORGANIZATION ID', dataIndex: 'sub-organizationId', key: 'organizationId',  },
    { title: 'PASSWORD', dataIndex: 'password', key: 'password' },
    { title: 'USER TYPE', dataIndex: 'userType', key: 'userType' },
    { title: 'DEPARTMENT', dataIndex: 'department', key: 'department' },
    { title: 'EMAIL ID', dataIndex: 'emailId', key: 'emailId' },
    { title: 'CONTACT NO.', dataIndex: 'contactNo', key: 'contactNo' },
    { title: 'USER STATUS', dataIndex: 'userStatus', key: 'userStatus' },
    { title: 'PRIVILEGES', dataIndex: 'privileges', key: 'privileges' },
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
          InActive
          </Button>
        </Space>
      ),
    },
  ];

  return <Table dataSource={users} columns={columns} scroll={{ x: 'max-content' }} />;
};

export default UserTable;
