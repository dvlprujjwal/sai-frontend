// UOMPage.js
import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import UOMTable from './UOMTable';
import UOMForm from './UOMForm';

const initialUOMs = [
  {
    id: 1,
    uomCode: 'EA',
    uomName: 'EACH',
    uomDescription: 'EACH',
    className: 'QUANTITY',
    baseUomName: 'EACH',
    endDate: null,
  },
  {
    id: 2,
    uomCode: 'DZ',
    uomName: 'DOZEN',
    uomDescription: 'DOZEN',
    className: 'QUANTITY',
    baseUomName: 'EACH',
    endDate: null,
  },
  {
    id: 3,
    uomCode: 'KG',
    uomName: 'KILOGRAM',
    uomDescription: 'KILOGRAM',
    className: 'WEIGHT',
    baseUomName: 'GRAM',
    endDate: null,
  },
  // Add more dummy data as needed
];

const UOMPage = () => {
  const [uoms, setUOMs] = useState(initialUOMs);
  const [visible, setVisible] = useState(false);
  const [editingUOM, setEditingUOM] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleEdit = (uom) => {
    setEditingUOM(uom);
    setVisible(true);
  };

  const handleDelete = (uomId) => {
    // Implement delete logic here
  };

  const handleFormSubmit = (values) => {
    if (editingUOM) {
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
          placeholder="Search UOMs"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '200px' }}
        />
        <Button type="primary" className='saitheme-btn' onClick={() => setVisible(true)}>
          Add UOM
        </Button>
      </div>
      <UOMTable
        uoms={uoms.filter((uom) => uom.uomName.toLowerCase().includes(searchText.toLowerCase()))}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        title={editingUOM ? 'Edit UOM' : 'Add UOM'}
        visible={visible}
        onCancel={() => {
          setEditingUOM(null);
          setVisible(false);
        }}
        footer={null}
      >
        <UOMForm onSubmit={handleFormSubmit} initialValues={editingUOM} />
      </Modal>
    </div>
  );
};

export default UOMPage;
