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
      <h1>Sports Authority of India - Demand Note</h1>

      <Form onFinish={onFinish} className="goods-receive-note-form" layout="vertical">
        <Row>
          <Col span={6} offset={18}>
            <Form.Item label="DATE" name="date">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={6} >

          </Col>
          <Col span={6} offset={12}>
            <Form.Item label="DEMAND NOTE NO. :" name="grnNo">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>

            <Form.Item label="REGIONAL CENTER CODE" name="regionalCenterCodeConsignor">
              <Input />
            </Form.Item>
            <Form.Item label="REGIONAL CENTER NAME " name="regionalCenterNameConsignor">
              <Input />
            </Form.Item>
            <Form.Item label="ADDRESS :" name="consignorAddress">
              <Input />
            </Form.Item>
            <Form.Item label="ZIP CODE :" name="consignorZipCode">
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>

          </Col>

          <Col span={8}>
            <Form.Item label="CONSUMER NAME :" name="consumerName">
              <Input />
            </Form.Item>
            <Form.Item label="CONTACT NO. :" name="contactNo">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        {/* Item Details */}
        <h2>ITEM DETAILS</h2>

        <Form.List name="itemDetails" initialValue={[{}]}>
          {(fields, { add, remove }) => (
            <>
              <Form.Item style={{ textAlign: 'right' }}>
                <Button type="dashed" onClick={() => add()} style={{ marginBottom: 8 }} icon={<PlusOutlined />}>
                  ADD ITEM
                </Button>
              </Form.Item>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} style={{ marginBottom: 16, border: '1px solid #d9d9d9', padding: 16, borderRadius: 4 }}>
                  <Row gutter={24}>
                    <Col span={6}>
                      <Form.Item {...restField} label="S.NO." name={[name, 'sNo']}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} label="ITEM CODE" name={[name, 'itemCode']}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} label="ITEM DESCRIPTION" name={[name, 'itemDescription']}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item {...restField} label="UOM" name={[name, 'uom']}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} label="QUANTITY" name={[name, 'receivedQuantity']}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} label="REQUIRED FOR NO. OF DAYS" name={[name, 'budgetHeadProcurement']}>
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col span={5}>
                      <Form.Item {...restField} label="REMARK" name={[name, 'remark']}>
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
        <h2>Terms and Condition</h2>
        <Form.Item name="termsAndCondition">
          <TextArea rows={4} />
        </Form.Item>


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
              DATE & TIME :<Form> <Input /></Form>
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
              DATE & TIME :<Form> <Input /></Form>
            </div>


          </div>
          <div >
            <div className='goods-receive-note-signature'>
               RECEIVED BY (CUSTODIAN)  :<Form><Input /></Form>
            </div>
            <div className='goods-receive-note-signature'>
              NAME & SIGNATURE :<Form><Input /></Form>
            </div>
            <div className='goods-receive-note-signature'>
              DATE & TIME :<Form> <Input /></Form>
            </div>


          </div>
        </div>

      </Form>
      <div className='goods-receive-note-button-container'>

        <Form.Item >
          <Button type="primary" htmlType="save" style={{ width: '200px', margin: 16 }}>
            SAVE
          </Button>
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit" style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50', width: '200px', margin: 16 }}>
            SUBMIT
          </Button>
        </Form.Item>
        <Form.Item >
          <Button type="primary" danger htmlType="save" style={{ width: '200px', margin: 16 }}>
            PRINT
          </Button>
        </Form.Item>

      </div>
    </div>
  );
};

export default DemandNoteForm;
