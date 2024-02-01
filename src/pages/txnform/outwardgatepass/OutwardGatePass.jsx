// OutwardGatePass.js
import React, { useState, } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col, } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
const { Option } = Select;



const OutwardGatePass = () => {
  const [Type, setType] = useState('1');
  const [selectedOption, setSelectedOption] = useState(null);
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const handleValuesChange = (_, allValues) => {
    setType(allValues.type);
  };

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  return (

    <div className="goods-receive-note-form-container">
      <h1>Sports Authority of India - Outward Gate Pass</h1>

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
                <Option value="1">1. Issue/Return</Option>
                <Option value="2">2. Purchase Order</Option>
                <Option value="3">3. Inter-Org Transaction</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6} offset={12}>
            <Form.Item label="OUTER GATE PASS NO." name="grnNo">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="CONSIGNOR DETAIL :" name="consigneeDetail">
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

          {Type === '1' && (
            <Col span={8}>
              <Form.Item label="CONSUMER NAME :" name="consumerName">
                <Input />
              </Form.Item>
              <Form.Item label="CONTACT NO. :" name="contactNo">
                <Input />
              </Form.Item>
            </Col>
          )}

          {Type === '3' && (
            <Col span={8}>
              <Form.Item label="CONSIGNEE DETAIL" name="consignorDetail">
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
            {Type === '1' && (
              <Form.Item label="RETURN VOUCHER NO" name="returnVoucherNo">
                <Input />
              </Form.Item>
            )}
            {Type === '2' && (
              <Form.Item label="ACCEPTANCE NOTE NO." name="acceptanceNoteNo">
                <Input />
              </Form.Item>
            )}
            {Type === '3' && (
              <>
                <Form.Item label="Select Note Type" name="noteType">
                  <Select onChange={handleSelectChange}>
                    <Option value="ISSUE">ISSUE NOTE NO.</Option>
                    <Option value="REJECTION">REJECTION NOTE NO.</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label={selectedOption === 'ISSUE' ? 'ISSUE NOTE NO.' : 'REJECTION NOTE NO.'}
                  name="inwardGatePass"
                >
                  <Input />
                </Form.Item>
              </>
            )}
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
                      <Form.Item {...restField} label="Received Quantity" name={[name, 'receivedQuantity']}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} label="Budget Head Procurement" name={[name, 'budgetHeadProcurement']}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} label="Locator" name={[name, 'locator']}>
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
              Generated By :<Form><Input /></Form>
            </div>
            <div className='goods-receive-note-signature'>
              NAME & SIGNATURE :<Form><Input /></Form>
            </div>
            <div className='goods-receive-note-signature'>
              Date & Time :<Form> <DatePicker showTime /></Form>
            </div>
          </div>

          <div >
            <div className='goods-receive-note-signature'>
              Received By (Custodian) :<Form><Input /></Form>
            </div>
            <div className='goods-receive-note-signature'>
              NAME & SIGNATURE :<Form><Input /></Form>
            </div>
            <div className='goods-receive-note-signature'>
              Date & Time :<Form> <DatePicker showTime /></Form>
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

export default OutwardGatePass;
