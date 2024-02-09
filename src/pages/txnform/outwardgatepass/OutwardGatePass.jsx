// OutwardGatePass.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col, Typography, AutoComplete } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import axios from 'axios';
const dateFormat = 'YYYY/MM/DD';
const { Option } = Select;
const { Text, Title } = Typography;


const OutwardGatePass = () => {
  const [Type, setType] = useState('1');
  const [selectedOption, setSelectedOption] = useState(null);
  const [itemData, setItemData] = useState([]);
  const [formData, setFormData] = useState({
    regionalCenterCode: '',
    regionalCenterName: '',
    consignorAddress: '',
    consignorZipCode: ''
  });
  useEffect(() => {

    fetchItemData()
    fetchUserDetails()
  }, []);

  const fetchItemData = async () => {
    try {
      const apiUrl = 'https://sai-services.azurewebsites.net/sai-inv-mgmt/master/getItemMaster';
      const response = await axios.get(apiUrl);
      const { responseData } = response.data;
      setItemData(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchUserDetails = async () => {
    try {
      const apiUrl = 'https://sai-services.azurewebsites.net/sai-inv-mgmt/login/authenticate';
      const response = await axios.post(apiUrl, {
        userCd: "string",
        password: "string"
      });

      const { responseData } = response.data;
      const { organizationDetails } = responseData;
      const { userDetails } = responseData;
      console.log('Fetched data:', organizationDetails);
      // Update form data with fetched values
      setFormData({
        regionalCenterCode: organizationDetails.location,
        regionalCenterName: organizationDetails.organizationName,
        consignorAddress: organizationDetails.locationAddr,
        consignorZipCode: organizationDetails.contactNo,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName

      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



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
            <Form.Item label="DATE" name="date">
              <DatePicker defaultValue={dayjs()} format={dateFormat} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="TYPE" name="type">
              <Select>
                <Option value="1">1. Issue/Return</Option>
                <Option value="2">2. Purchase Order</Option>
                <Option value="3">3. Inter-Org Transaction</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6} offset={12}>
            <Form.Item label="OUTER GATE PASS NO." name="grnNo">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Title strong underline level={2} type="danger" >CONSIGNOR DETAIL :-</Title>
            <Form.Item label="REGIONAL CENTER CODE" name="regionalCenterCode">
              <Input value={formData.regionalCenterCode} />
              <div style={{ display: 'none' }}>
                {formData.regionalCenterCode}
              </div>
            </Form.Item>
            <Form.Item label="REGIONAL CENTER NAME " name="regionalCenterNameConsignor">
              <Input value={formData.regionalCenterName} />
              <div style={{ display: 'none' }}>
                {formData.regionalCenterCode}
              </div>
            </Form.Item>
            <Form.Item label="ADDRESS :" name="consignorAddress">
              <Input value={formData.consignorAddress} />
              <div style={{ display: 'none' }}>
                {formData.regionalCenterCode}
              </div>

            </Form.Item>
            <Form.Item label="ZIP CODE :" name="consignorZipCode">
              <Input value={formData.consignorZipCode} />
              <div style={{ display: 'none' }}>
                {formData.regionalCenterCode}
              </div>
            </Form.Item>

          </Col>
          <Col span={8}>
            <Title strong level={2} underline type='danger' > CONSIGNEE DETAIL :-</Title>

            {Type === '2' && (
              <>
                <Form.Item label="CONSIGNEE DETAIL:" name="consignorDetail">
                  <Input />
                </Form.Item>
                <Form.Item label="SUPPLIER CODE :" name="supplierCode">
                  <Input />
                </Form.Item>
                <Form.Item label="SUPPLIER NAME :" name="supplierName">
                  <Input />
                </Form.Item>
                <Form.Item label="ADDRESS:" name="supplierAddress">
                  <Input />
                </Form.Item>
              </>
            )}

            {Type === '1' && (
              <>
                <Form.Item label="CONSUMER NAME :" name="consumerName">
                  <Input />
                </Form.Item>
                <Form.Item label="CONTACT NO. :" name="contactNo">
                  <Input />
                </Form.Item>
              </>
            )}

            {Type === '3' && (
              <>

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
              </>
            )}
          </Col>
          <Col span={8}>
            <Form.Item>
            </Form.Item>
            {Type === '1' && (
              <Form.Item label="ISSUE NOTE NO. :" name="issuenoteno">
                <Input />
              </Form.Item>
            )}
            {Type === '2' && (
              <Form.Item label="REJECTION NOTE NO.  :" name="rejectionNoteNo">
                <Input />
              </Form.Item>
            )}
            {Type === '3' && (
              <>
                <Form.Item label="SELECT NOTE TYPE" name="noteType">
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
            <Form.Item label="NOA NO." name="noaNo">
              <Input />
            </Form.Item>
            <Form.Item label="NOA DATE" name="noaDate">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="DATE OF DELIVERY" name="dateOfDelivery">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label=" CHALLAN / INVOICE NO. :" name="consignorDetail">
              <Input />
            </Form.Item>

          </Col>
          <Col span={8}>

            <Form.Item label="MODE OF DELIVERY  :" name="supplierCode">
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
              {fields.map(({ key, name, ...restField }, index) => (
                <div key={key} style={{ marginBottom: 16, border: '1px solid #d9d9d9', padding: 16, borderRadius: 4 }}>
                  <Row gutter={24}>
                    <Col span={6}>
                      <Form.Item {...restField} label="S.NO." name={[name, 'sNo']} >
                        <Input value={index + 1} />
                        <span style={{ display: 'none' }}>{index + 1}</span>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} label="ITEM CODE" name={[name, 'itemCode']}>
                        <AutoComplete
                          style={{ width: '100%' }}
                          options={itemData.map(item => ({ value: item.itemMasterCd }))}
                          placeholder="Enter item code"
                          filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} label="ITEM DESCRIPTION" name={[name, 'itemDescription']}>
                        <AutoComplete
                          style={{ width: '100%' }}
                          options={itemData.map(item => ({ value: item.itemMasterDesc }))}
                          placeholder="Enter item description"
                          filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item {...restField} label="UOM" name={[name, 'uom']}>
                        <AutoComplete
                          style={{ width: '100%' }}
                          options={itemData.map(item => ({ value: item.uom }))}
                          placeholder="Enter UOM"
                          filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                          }
                        />
                      </Form.Item>
                    </Col>
                    {Type === '1' && (
                      <>
                        <Col span={6}>
                          <Form.Item {...restField} label=" QUANTITY" name={[name, 'quantity']}>
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item {...restField} label="REQUIRED FOR NO. OF DAYS" name={[name, 'budgetHeadProcurement']}>
                            <Input />
                          </Form.Item>
                        </Col>  </>
                    )}
                    {Type === '2' && (
                      <>

                        <Col span={6}>
                          <Form.Item {...restField} label=" REJECTED QUANTITY" name={[name, 'rejectQuantity']}>
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item {...restField} label=" RETURN QUANTITY " name={[name, 'returnQuantity']}>
                            <Input />
                          </Form.Item>
                        </Col>
                      </>
                    )}
                    {Type === '3' && (
                      selectedOption === 'ISSUE' ? (
                        <Col span={6}>
                          <Form.Item {...restField} label="DELIVERED QUANTITY" name={[name, 'deliveredQuantity']}>
                            <Input />
                          </Form.Item>
                        </Col>
                      ) : (
                        <>
                          <Col span={6}>
                            <Form.Item {...restField} label="REJECTED QUANTITY" name={[name, 'rejectQuantity']}>
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item {...restField} label="RETURN QUANTITY" name={[name, 'returnQuantity']}>
                              <Input />
                            </Form.Item>
                          </Col>
                        </>
                      )
                    )}
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

        {/* Condition of Goods 
        <h2>CONDITION OF GOODS</h2>*/}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="CONDITION OF GOODS" name="conditionOfGoods">
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="NOTE" name="note">
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>

        {/* Note and Signature */}


        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <div  >
            <div className='goods-receive-note-signature'>
              GENERATED  BY
            </div>
            <div className='goods-receive-note-signature'>
              NAME & SIGNATURE :<Form><Input value={formData.firstName + " " + formData.lastName} /></Form>
            </div>
            <div className='goods-receive-note-signature'>
              DATE & TIME :<DatePicker defaultValue={dayjs()} format={dateFormat} style={{ width: '58%' }} />
            </div>
          </div>
          <div >
            <div className='goods-receive-note-signature'>
              APPROVED BY
            </div>
            <div className='goods-receive-note-signature'>
              NAME & SIGNATURE :<Form><Input /></Form>
            </div>
            <div className='goods-receive-note-signature'>
              DATE & TIME :<DatePicker defaultValue={dayjs()} format={dateFormat} style={{ width: '58%' }} />
            </div>


          </div>
          <div >
            <div className='goods-receive-note-signature'>
              ISSUED BY (CUSTODIAN)
            </div>
            <div className='goods-receive-note-signature'>
              NAME & SIGNATURE :<Form><Input /></Form>
            </div>
            <div className='goods-receive-note-signature'>
              DATE & TIME :<DatePicker defaultValue={dayjs()} format={dateFormat} style={{ width: '58%' }} />
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
