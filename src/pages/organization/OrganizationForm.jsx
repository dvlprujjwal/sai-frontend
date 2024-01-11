// OrganizationForm.js
import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

const OrganizationForm = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Form.Item label="Organization ID" name="organizationId">
        <Input disabled />
      </Form.Item>

      <Form.Item label="Organization Name" name="organizationName" rules={[{ required: true }]}>
        <Input placeholder="Enter Organization Name" />
      </Form.Item>

      <Form.Item label="Location" name="location" rules={[{ required: true }]}>
        <Input placeholder="Enter Location" />
      </Form.Item>

      <Form.Item label="Location Address" name="locationAddress" rules={[{ required: true }]}>
        <Input.TextArea placeholder="Enter Location Address" />
      </Form.Item>

      <Form.Item label="Contact No." name="contactNo" rules={[{ required: true }]}>
        <Input placeholder="Enter Contact No." />
      </Form.Item>

      <Form.Item label="Email" name="email" rules={[{ type: 'email', required: true }]}>
        <Input placeholder="Enter Email" />
      </Form.Item>

      <Form.Item label="GSTIN" name="gstin" rules={[{ required: true }]}>
        <Input placeholder="Enter GSTIN" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
        <Row gutter={16}>
          <Col span={12}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default OrganizationForm;
