// IssueNote.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col, Typography, AutoComplete } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { fetchUserOrgDetails } from '../../../store/actions/UtilsAction'
import { connect } from 'react-redux';
import moment from 'moment';
const { Option } = Select;
const {  Title } = Typography;



const IssueNote = () => {
  const [Type, setType] = useState('1');
  const [form] = Form.useForm(); // Create form instance

  const onFinish = (values) => {
    console.log('Received values:', values);
  };
  const [currentDate, setCurrentDate] = useState(null);
  const [itemDetails, setItemDetails] = useState([]);
  useEffect(() => {
    // Set defaultDate to the current date when the component mounts
    setCurrentDate(moment());
    // Fetch item details from the API
    fetchItemDetails();
    // Dispatch the action to fetch user and organization details
    fetchUserOrgDetails(2); // Pass the userId if required
  }, []);

  const fetchItemDetails = async () => {
    try {
      const response = await fetch('https://sai-services.azurewebsites.net/sai-inv-mgmt/master/getItemMaster');
      const data = await response.json();
      if (data.responseStatus.statusCode === 200) {
        setItemDetails(data.responseData);
      } else {
        console.error('Error fetching item details:', data.responseStatus.message);
      }
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  };

  const handleValuesChange = (_, allValues) => {
    setType(allValues.type);
  };
  const dateFormat = 'YYYY/MM/DD'; // Define your desired date format

  const itemCodeSuggestions = itemDetails.map(item => item.itemMasterCd);
  const itemDescSuggestions = itemDetails.map(item => item.itemMasterDesc);

  const handleItemSelect = (value, fieldName, index) => {
    const selectedItem = itemDetails.find(item => item.itemMasterCd === value || item.itemMasterDesc === value);
    if (selectedItem) {
      form.setFieldsValue({
        [`itemDetails[${index}].itemMasterDesc`]:selectedItem.itemMasterDesc,
        [`itemDetails[${index}].uom`]: selectedItem.uom,
        [`itemDetails[${index}].quantity`]: selectedItem.quantity,
        [`itemDetails[${index}].budgetHeadProcurement`]: selectedItem.budgetHeadProcurement,
        [`itemDetails[${index}].remark`]: selectedItem.remark
      });
    }
  };
  return (

    <div className="goods-receive-note-form-container">
      <h1>Sports Authority of India - Issue Note</h1>

      <Form onFinish={onFinish} className="goods-receive-note-form" onValuesChange={handleValuesChange} layout="vertical">
        <Row>
          <Col span={6} offset={18}>
            <Form.Item label="DATE" name="date">
              <DatePicker style={{ width: '100%' }} defaultValue={currentDate} />

            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="TYPE" name="type">
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

            <Title strong underline level={2} type="danger" >CONSIGNOR DETAIL :-</Title>
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

            <Title strong level={2} underline type='danger' > CONSIGNEE DETAIL :-</Title>

            {Type === '2' && (
              <>

                <Form.Item label="CONSUMER NAME :" name="consumerName">
                  <Input />
                </Form.Item>
                <Form.Item label="CONTACT NO. :" name="contactNo">
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
              </>
            )}
          </Col>
          <Col span={8}>
            {Type === '1' && (
              <>
                <Form.Item >
                </Form.Item>
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
                <Form.Item >
                </Form.Item>
                <Form.Item label="DEMAND NOTE NO." name="demandNoteNo">
                  <Input />
                </Form.Item>
                <Form.Item label="DEMAND NOTE DATE :" name="demandNoteDate">
                  <Input />
                </Form.Item>
              </>
            )}
            {Type === '3' && (
              <>
                <Form.Item >
                </Form.Item>
                <Form.Item label="INTER RD DEMAND NOTE :" name="interRdDemandNote">
                  <Input />
                </Form.Item>
              </>
            )}

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
                        <AutoComplete
                          options={itemCodeSuggestions.map(item => ({ value: item }))}
                          placeholder="Item Code"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>

                      <Form.Item {...restField} label="ITEM DESCRIPTION" name={[name, 'itemDescription']}>
                        <AutoComplete
                          options={itemDescSuggestions.map(item => ({ value: item }))}
                          placeholder="Item Description"
                        />
                      </Form.Item>

                    </Col>
                    <Col span={5}>
                      <Form.Item {...restField} label="UOM" name={[name, 'uom']}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} label=" QUANTITY" name={[name, 'quantity']}>
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
                      <Form.Item {...restField} label="S.NO." name={[name, 'sNo']}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} label="ITEM CODE" name={[name, 'itemCode']}>
                        <AutoComplete
                          options={itemDetails.map(item => ({ value: item.itemMasterCd }))}
                          placeholder="Item Code"
                          onSelect={value => handleItemSelect(value, 'itemCode', index)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} label="ITEM DESCRIPTION" name={[name, 'itemDescription']}>
                        <AutoComplete
                          options={itemDetails.map(item => ({ value: item.itemMasterDesc }))}
                          placeholder="Item Description"
                          onSelect={value => handleItemSelect(value, 'itemDescription', index)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item {...restField} label="UOM" name={[name, 'uom']}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} label=" QUANTITY" name={[name, 'quantity']}>
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
        {/* Condition of Goods */}

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="TERMS AND CONDITION " name="termandcondition">
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
              GENERATED  BY :<Form><Input /></Form>
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
              APPROVED BY :<Form><Input /></Form>
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
              ISSUED BY (CUSTODIAN) :<Form><Input /></Form>
            </div>
            <div className='goods-receive-note-signature'>
              NAME & SIGNATURE :<Form><Input /></Form>
            </div>
            <div className='goods-receive-note-signature'>
              DATE & TIME :<Form> <Input /></Form>
            </div>


          </div>
        </div>




        {/* Submit Button */}
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
      </Form>
    </div >
  );
};

const mapDispatchToProps = {
  fetchUserOrgDetails: fetchUserOrgDetails
};

export default connect(null, mapDispatchToProps)(IssueNote);
