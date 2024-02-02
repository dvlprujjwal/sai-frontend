// RejectionNote.js
import React, { useState, } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col, } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
const { Option } = Select;



const RejectionNote = () => {
  const [Type, setType] = useState('2');
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const handleValuesChange = (_, allValues) => {
    setType(allValues.type);
  };

  return (

    <div className="goods-receive-note-form-container">
      <h1>Sports Authority of India - Rejection Note</h1>

      <Form onFinish={onFinish} className="goods-receive-note-form" onValuesChange={handleValuesChange} layout="vertical">
        <Row>
          <Col span={6} offset={18}>
            <Form.Item label="Date" name="date">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Type" name="type">
              <Select>
                <Option value="2"> Purchase Order</Option>
                <Option value="3"> Inter-Org Transaction</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6} offset={12}>
            <Form.Item label="REJECTION NOTE NO ." name="RejectionNoteNo">
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

          {Type === '2' && (
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
            </Col>
          )}



          {Type === '3' && (
            <Col span={8}>
              <Form.Item label="CONSIGNOR DETAIL" name="consignorDetail">
                <Input />
              </Form.Item>
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
          )}

          <Col span={8}>

            <Form.Item label="INSPECTION REPORT NO. :" name="inspectionreportno">
              <Input />
            </Form.Item>


            <Form.Item label="NOA No." name="noaNo">
              <Input />
            </Form.Item>
            <Form.Item label="NOA Date" name="noaDate">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Date of Delivery" name="dateOfDelivery">
              <DatePicker style={{ width: '100%' }} />
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
                      <Form.Item {...restField} label="INSPECTED QUANTITY " name={[name, 'inspectedQuantity']}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} label="REJECTED QUANTITY " name={[name, 'rejectedquantity']}>
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

        {/* Condition of Goods */}
        <h2>Condition of Goods</h2>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Condition of Goods" name="conditionOfGoods">
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Note" name="note">
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>

        {/* Note and Signature */}

    
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <div  >
            <div className='goods-receive-note-signature'>
              GENERATED  BY  :<Form><Input /></Form>
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
              APPROVED BY :<Form><Input /></Form>
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
            RECEIVED BY : <Form><Input /></Form>
            </div>
            <div className='goods-receive-note-signature'>
              NAME & SIGNATURE :<Form><Input /></Form>
            </div>
            <div className='goods-receive-note-signature'>
              Date & Time :<Form> <Input /></Form>
            </div>


          </div>
        </div>



        {/* Submit Button */}
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
      </Form>
    </div >
  );
};

export default RejectionNote;
