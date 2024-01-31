// DemandNoteForm.js
import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, DatePicker } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
// import './DemandNoteForm.css';

const { TextArea } = Input;

const DemandNoteForm = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <div className="goods-receive-note-form-container">
      <h1>Sports Authority of India - INTER RD DEMAND NOTE </h1>

      <Form onFinish={onFinish} className="goods-receive-note-form" layout="vertical">
        <Row>
          <Col span={6} offset={18}>
            <Form.Item label="Date" name="date">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={6} >

          </Col>
          <Col span={6} offset={12}>
            <Form.Item label="INTER RD DEMAND NOTE NO. :" name="grnNo">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="CONSIGNEE DETAIL :" name="consigneeDetail">
              <Input />
            </Form.Item>
            <Form.Item label="REGIONAL CENTER CODE :" name="regionalCenterCode">
              <Input />
            </Form.Item>
            <Form.Item label="REGIONAL CENTER NAME  :" name="regionalCenterName">
              <Input />
            </Form.Item>
            <Form.Item label="ADDRESS :" name="consigneeAddress">
              <Input />
            </Form.Item>
            <Form.Item label="ZIP CODE :" name="consigneeZipCode">
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>

          </Col>

          <Col span={8}>
            <Form.Item label="CONSIGNOR DETAIL :" name="consignorDetail">
              <Input />
            </Form.Item>
            <Form.Item label="Supplier Code :" name="supplierCode">
              <Input />
            </Form.Item>
            <Form.Item label="Supplier Name :" name="supplierName">
              <Input />
            </Form.Item>
            <Form.Item label="Address:" name="supplierAddress">
              <Input />
            </Form.Item>
            <Form.Item label="ZIP CODE :" name="consigneeZipCode">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        {/* Item Details */}
        <h2>Item Details</h2>

        <Form.List name="itemDetails" initialValue={[{}]}>
          {(fields, { add, remove }) => (
            <>
              <Form.Item style={{ textAlign: 'right' }}>
                <Button type="dashed" onClick={() => add()} style={{ marginBottom: 8 }} icon={<PlusOutlined />}>
                  Add Item
                </Button>
              </Form.Item>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} style={{ marginBottom: 16, border: '1px solid #d9d9d9', padding: 16, borderRadius: 4 }}>
                  <Row gutter={24}>
                    <Col span={6}>
                      <Form.Item {...restField} label="S.No." name={[name, 'sNo']}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} label="Item Code" name={[name, 'itemCode']}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} label="Item Description" name={[name, 'itemDescription']}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item {...restField} label="UOM" name={[name, 'uom']}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} label=" Quantity" name={[name, 'receivedQuantity']}>
                        <Input />
                      </Form.Item>
                    </Col>


                    <Col span={5}>
                      <Form.Item {...restField} label="Remark" name={[name, 'remark']}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={1}>
                      <MinusCircleOutlined onClick={() => remove(name)} style={{ marginTop: 8 }} />
                    </Col>
                  </Row>
                </div>
              ))}
            </>
          )}
        </Form.List>

        {/* Terms and Condition */}
        <Row gutter={24}>
          <Col span={12}>
            <h2>Terms and Condition</h2>
            <Form.Item name="termsAndCondition">
              <TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <h2>Note</h2>
            <Form.Item name="termsAndCondition">
              <TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>

        {/* Note and Signature */}

        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <div  >
            <div className='goods-receive-note-signature'>
              DEMANDED  BY : :<Form><Input /></Form>
            </div>
            <div className='goods-receive-note-signature'>
              NAME & SIGNATURE :<Form><Input /></Form>
            </div>
            <div className='goods-receive-note-signature'>
              Date & Time :<Form> <Input /></Form>
            </div>
          </div>
          <div >
            <div className='goods-receive-note-signature'>
              APPROVED BY : :<Form><Input /></Form>
            </div>
            <div className='goods-receive-note-signature'>
              NAME & SIGNATURE :<Form><Input /></Form>
            </div>
            <div className='goods-receive-note-signature'>
              Date & Time :<Form> <Input /></Form>
            </div>


          </div>

        </div>

      </Form>
      <div className='goods-receive-note-button-container'>

        <Form.Item >
          <Button type="primary" htmlType="save" style={{ width: '200px', margin: 16 }}>
            Save
          </Button>
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit" style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50', width: '200px', margin: 16 }}>
            Submit
          </Button>
        </Form.Item>
        <Form.Item >
          <Button type="primary" danger htmlType="save" style={{ width: '200px', margin: 16 }}>
            Print
          </Button>
        </Form.Item>

      </div>
    </div>
  );
};

export default DemandNoteForm;
