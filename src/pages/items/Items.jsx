
// ItemsPage.js
import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import ItemsTable from './ItemsTable';
import ItemsForm from './ItemsForm';

const initialItems = [
  {
    id: 1,
    itemCode: 'I001',
    itemDescription: 'Product A',
    uom: 'Each',
    quantityOnHand: 100,
    location: 'Warehouse',
    locatorCode: 'A001',
    price: 25.99,
    supplierDetail: 'Supplier XYZ',
    category: 'Electronics',
    minStockLevel: 20,
    maxStockLevel: 150,
    reOrderPoint: 30,
    status: 'Active',
    endDate: '2023-12-31',
  },
  // Add more dummy data as needed
];

const ItemsPage = () => {
  const [items, setItems] = useState(initialItems);
  const [visible, setVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleEdit = (item) => {
    setEditingItem(item);
    setVisible(true);
  };

  const handleDelete = (itemId) => {
    // Implement delete logic here
  };

  const handleFormSubmit = (values) => {
    if (editingItem) {
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
          placeholder="Search items"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '200px' }}
        />
        <Button type="primary" className='saitheme-btn' onClick={() => setVisible(true)}>
          Add Item
        </Button>
      </div>
      <ItemsTable
        items={items.filter((item) =>
          item.itemDescription.toLowerCase().includes(searchText.toLowerCase())
        )}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        title={editingItem ? 'Edit Item' : 'Add Item'}
        visible={visible}
        onCancel={() => {
          setEditingItem(null);
          setVisible(false);
        }}
        footer={null}
      >
        <ItemsForm onSubmit={handleFormSubmit} initialValues={editingItem} />
      </Modal>
    </div>
  );
};

export default ItemsPage;
