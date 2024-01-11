// ItemsForm.js
import React from 'react';
import { Form, Input, Button, Select, DatePicker, Row, Col, InputNumber } from 'antd';

const { Option } = Select;

const ItemsForm = ({ onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} initialValues={initialValues} layout="vertical">
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="itemCode" label="Item Code" rules={[{ required: true, message: 'Please enter Item Code' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="itemDescription" label="Item Description" rules={[{ required: true, message: 'Please enter Item Description' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="uom" label="UOM" rules={[{ required: true, message: 'Please enter UOM' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="quantityOnHand" label="Quantity on Hand" rules={[{ required: true, message: 'Please enter Quantity on Hand' }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Please enter Location' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="locatorCode" label="Locator Code" rules={[{ required: true, message: 'Please enter Locator Code' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter Price' }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="supplierDetail" label="Supplier Detail" rules={[{ required: true, message: 'Please enter Supplier Detail' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please enter Category' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="subcategory" label="SUB-CATEGORY" rules={[{ required: true, message: 'Please enter SUB-CATEGORY' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="type" label=" Type" rules={[{ required: true, message: 'Please enter Item Type' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="disciplines" label="Disciplines" rules={[{ required: true, message: 'Please enter Disciplines' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="brand" label="Brand" rules={[{ required: true, message: 'Please enter Brand ' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="size" label="Size " rules={[{ required: true, message: 'Please enter Size' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="colour" label="Colour" rules={[{ required: true, message: 'Please enter Colour' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="minStockLevel" label="Minimum Stock Level" rules={[{ required: true, message: 'Please enter Minimum Stock Level' }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="maxStockLevel" label="Maximum Stock Level" rules={[{ required: true, message: 'Please enter Maximum Stock Level' }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="reOrderPoint" label="Reorder Point" rules={[{ required: true, message: 'Please enter Reorder Point' }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="usagecategory" label="Usage Category" rules={[{ required: true, message: 'Please enter Category' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select Status' }]}>
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="endDate" label="End Date">
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ItemsForm;
