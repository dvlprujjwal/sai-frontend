// IssueNote.js
import React, { useState, } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col, } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';



const { Option } = Select;



const IssueNote = () => {
  const [Type, setType] = useState('1');
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const handleValuesChange = (_, allValues) => {
    setType(allValues.type);
  };

  return (

    <div className="goods-receive-note-form-container">
      <h1>Sports Authority of India - Issue Note</h1>

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
                <Option value="1">1. RETURNABLE</Option>
                <Option value="2">2. NON RETURNABLE</Option>
                <Option value="3">3. INTER - ORG. TANSFER</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6} offset={12}>
            <Form.Item label="ISSUE NOTE NO." name="issueNoteNo">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="CONSIGNOR DETAIL :" name="consignorDetail">
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
              <Form.Item label="CONSUMER NAME :" name="consumerName">
                <Input />
              </Form.Item>
              <Form.Item label="CONTACT NO. :" name="contactNo">
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
              <Form.Item label="REGIONAL CENTER CODE :" name="regionalCenterCode">
                <Input />
              </Form.Item>
              <Form.Item label="REGIONAL CENTER NAME  :" name="regionalCenterName">
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
              <>
                <Form.Item label="DEMAND NOTE NO." name="demandNoteNo">
                  <Input />
                </Form.Item>
                <Form.Item label="DEMAND NOTE DATE :" name="demandNoteDate">
                  <Input />
                </Form.Item>
              </>
            )}
            {Type === '2' && (
              <>
                <Form.Item label="DEMAND NOTE NO." name="demandNoteNo">
                  <Input />
                </Form.Item>
                <Form.Item label="DEMAND NOTE DATE :" name="demandNoteDate">
                  <Input />
                </Form.Item>
              </>
            )}
            {Type === '3' && (
              <Form.Item label="INTER RD DEMAND NOTE :" name="interRdDemandNote">
                <Input />
              </Form.Item>
            )}

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
                      <Form.Item {...restField} label=" Quantity" name={[name, 'quantity']}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} label="REQUIRED FOR NO. OF DAYS" name={[name, 'budgetHeadProcurement']}>
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

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Terms and Conditon " name="termandcondition">
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
              GENERATED  BY : :<Form><Input /></Form>
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
          <div >
            <div className='goods-receive-note-signature'>
              ISSUED By (Custodian) :<Form><Input /></Form>
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

export default IssueNote;
