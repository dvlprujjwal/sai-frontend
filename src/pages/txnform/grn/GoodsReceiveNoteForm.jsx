// GoodsReceiveNoteForm.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col, Typography, AutoComplete, Modal, message } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import './GoodsReceiveNoteForm.css';
import dayjs from 'dayjs';
import axios from 'axios';
const dateFormat = 'YYYY/MM/DD';
const { Option } = Select;
const { Title } = Typography;



const GoodsReceiveNoteForm = () => {
  const [Type, setType] = useState('IRP');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [itemData, setItemData] = useState([]);
  const [formData, setFormData] = useState({
    genDate: '',
    genName: '',
    issueDate: '',
    issueName: '',
    approvedDate: '',
    approvedName: '',
    processId: '',
    type: '',
    grnDate: '',
    grnNo: '',
    ceRegionalCenterCd: '',
    ceRegionalCenterName: '',
    ceAddress: '',
    ceZipcode: '',
    crRegionalCenterCd: '',
    crRegionalCenterName: '',
    crAddress: '',
    crZipcode: '',
    consumerName: '',
    contactNo: '',
    noaNo: '',
    noaDate: '',
    dateOfDelivery: '',
    acceptanceNoteNo: '',
    returnVoucher: '',
    challanNo: '',
    supplierCode: '',
    supplierName: '',
    noteType: '',
    items: [
      {
        srNo: 0,
        itemCode: '',
        itemDesc: '',
        uom: '',
        quantity: 0,
        noOfDays: 0,
        remarks: '',
        conditionOfGoods: '',
        budgetHeadProcurement: '',
        locatorId: ''
      }
    ],
    userId: '',
    conditionOfGoods: '',
    note: ''
  });


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleChange = (fieldName, value) => {
    setFormData(prevValues => ({
      ...prevValues,
      [fieldName]: value === "" ? null : value
    }));
  };

  const itemHandleChange = (fieldName, value, index) => {
    setFormData(prevValues => {
      const updatedItems = [...(prevValues.items || [])];
      updatedItems[index] = {
        ...updatedItems[index],
        [fieldName]: value === "" ? null : value,
        uom: "string",
        conditionOfGoods: "string", // Hard-coded data
        budgetHeadProcurement: "string", // Hard-coded data
        locatorId: "string", // Hard-coded data
      };
      return {
        ...prevValues,
        items: updatedItems
      };
    });
  };

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
        userCd: "dkg",
        password: "string"
      });

      const { responseData } = response.data;
      const { organizationDetails } = responseData;
      const { userDetails } = responseData;
      console.log('Fetched data:', organizationDetails);
      const currentDate = dayjs();
      // Update form data with fetched values
      setFormData({
        ceRegionalCenterCd: "20",
        ceRegionalCenterName: organizationDetails.location,
        ceAddress: organizationDetails.locationAddr,
        ceZipcode: "131021",
        genName: userDetails.firstName,
        userId: "string",
        noaDate: currentDate.format(dateFormat),
        dateOfDelivery: currentDate.format(dateFormat),
        genDate: currentDate.format(dateFormat),
        issueDate: currentDate.format(dateFormat),
        approvedDate: currentDate.format(dateFormat),
        grnDate: currentDate.format(dateFormat),
        grnNo: "string",

      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleReturnNoteNoChange = async (value) => {
    try {
      const apiUrl = 'https://sai-services.azurewebsites.net/sai-inv-mgmt/getSubProcessDtls';
      const response = await axios.post(apiUrl, {
        processId: value,
        processStage: "RN",
      });
      const responseData = response.data.responseData;
      const { processData, itemList } = responseData;
      console.log('API Response:', response.data);
      setFormData(prevFormData => ({
        ...prevFormData,

        issueName: processData?.issueName,
        approvedName: processData?.approvedName,
        processId: processData?.processId,

        crRegionalCenterCd: processData?.crRegionalCenterCd,
        crRegionalCenterName: processData?.crRegionalCenterName,
        crAddress: processData?.crAddress,
        crZipcode: processData?.crZipcode,

        consumerName: processData?.consumerName,
        contactNo: processData?.contactNo,

        items: itemList.map(item => ({
          srNo: item?.sNo,
          itemCode: item?.itemCode,
          itemDesc: item?.itemDesc,
          uom: item?.uom,
          quantity: item?.quantity,
          noOfDays: item?.requiredDays,
          remarks: item?.remarks,
          conditionOfGoods: item?.conditionOfGoods,
          budgetHeadProcurement: item?.budgetHeadProcurement,
          locatorId: item?.locatorId
        }))
      }));
      // Handle response data as needed
    } catch (error) {
      console.error('Error fetching sub process details:', error);
      // Handle error
    }
  };


  const onFinish = async (values) => {
    try {

      const formDataCopy = { ...formData };

      const allFields = [
        "genDate",
        "genName",
        "issueDate",
        "issueName",
        "approvedDate",
        "approvedName",
        "processId",
        "type",
        "grnDate",
        "grnNo",
        "ceRegionalCenterCd",
        "ceRegionalCenterName",
        "ceAddress",
        "ceZipcode",
        "crRegionalCenterCd",
        "crRegionalCenterName",
        "crAddress",
        "crZipcode",
        "consumerName",
        "contactNo",
        "noaNo",
        "noaDate",
        "dateOfDelivery",
        "acceptanceNoteNo",
        "returnVoucher",
        "challanNo",
        "supplierCode",
        "supplierName",
        "noteType",
        "userId",
        "conditionOfGoods",
        "note",
        "items"
      ];

      allFields.forEach(field => {
        if (!(field in formDataCopy)) {
          formDataCopy[field] = "";
        }
      });


      const apiUrl = 'https://sai-services.azurewebsites.net/sai-inv-mgmt/saveGRN';
      const response = await axios.post(apiUrl, formDataCopy);
      console.log('API Response:', response.data);
      if (response.status === 200 && response.data && response.data.responseStatus && response.data.responseStatus.message === 'Success') {
        // Access the specific success message data if available
        const { processId, processType, subProcessId } = response.data.responseData;
        setFormData({
          grnNo: processId,
        });
        setSuccessMessage(` Goods Receive Note NO : ${processId}, Process Type: ${processType}, Sub Process ID: ${subProcessId}`);
        showModal();
        message.success(`Goods Receive Note successfully! Process ID: ${processId}, Process Type: ${processType}, Sub Process ID: ${subProcessId}`);

      } else {
        // Display a generic success message if specific data is not available
        message.error('Failed to Goods Receive Note. Please try again later.');
      }
      // Handle success response here
    } catch (error) {
      console.error('Error saving Goods Receive Note:', error);
      message.error('Failed to Goods Receive Note. Please try again later.');

      // Handle error response here
    }
  };


  const handleValuesChange = (_, allValues) => {
    setType(allValues.type);
  };

  return (

    <div className="goods-receive-note-form-container">
      <h1>Sports Authority of India - Goods Receive Note</h1>

      <Form onFinish={onFinish} className="goods-receive-note-form" onValuesChange={handleValuesChange} layout="vertical">
        <Row>
          <Col span={6} offset={18}>
            <Form.Item label="DATE" name="grnDate">
              <DatePicker defaultValue={dayjs()} format={dateFormat} style={{ width: '100%' }} name="grnDate" onChange={(date, dateString) => handleChange("grnDate", dateString)} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="TYPE" name="type">
              <Select onChange={(value) => handleChange("type", value)}>
                <Option value="IRP">1. Issue/Return</Option>
                <Option value="PO">2. Purchase Order</Option>
                <Option value="IOP">3. Inter-Org Transaction</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6} offset={12}>
            <Form.Item label="GRN NO." name="grnNo">
              <Input disabled onChange={(e) => handleChange("grnNo", e.target.value)} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Title strong level={2} underline type='danger' > CONSIGNEE DETAIL :-</Title>

            <Form.Item label="REGIONAL CENTER CODE" name="ceRegionalCenterCd">
              <Input value={formData.ceRegionalCenterCd} />
              <div style={{ display: 'none' }}>
                {formData.ceRegionalCenterCd}
              </div>
            </Form.Item>
            <Form.Item label="REGIONAL CENTER NAME " name="ceRegionalCenterName">
              <Input value={formData.ceRegionalCenterName} />
              <div style={{ display: 'none' }}>
                {formData.ceRegionalCenterCd}
              </div>
            </Form.Item>
            <Form.Item label="ADDRESS :" name="ceAddress">
              <Input value={formData.ceAddress} />
              <div style={{ display: 'none' }}>
                {formData.ceRegionalCenterCd}
              </div>
            </Form.Item>
            <Form.Item label="ZIP CODE :" name="ceZipcode">
              <Input value={formData.ceZipcode} />
              <div style={{ display: 'none' }}>
                {formData.ceRegionalCenterCd}
              </div>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Title strong underline level={2} type="danger" >CONSIGNOR DETAIL :-</Title>

            {Type === 'PO' && (
              <>
                <Form.Item label="SUPPLIER CODE :" name="supplierCode">
                  <Input onChange={(e) => handleChange("supplierCode", e.target.value)} />
                </Form.Item>
                <Form.Item label="SUPPLIER NAME :" name="supplierName">
                  <Input onChange={(e) => handleChange("supplierName", e.target.value)} />
                </Form.Item>
                <Form.Item label="ADDRESS:" name="supplierAddress">
                  <Input onChange={(e) => handleChange("supplierAddress", e.target.value)} />
                </Form.Item>
              </>
            )}

            {Type === 'IRP' && (
              <>
                <Form.Item label="CONSUMER NAME :" name="consumerName" initialValue={formData.consumerName}>
                  <Input value={formData.consumerName} onChange={(e) => handleChange("consumerName", e.target.value)} />
                  <div style={{ display: 'none' }}>
                    {formData.crZipcode}
                  </div>
                </Form.Item>
                <Form.Item label="CONTACT NO. :" name="contactNo" initialValue={formData.contactNo}>
                  <Input value={formData.contactNo} onChange={(e) => handleChange("contactNo", e.target.value)} />
                  <div style={{ display: 'none' }}>
                    {formData.crZipcode}
                  </div>
                </Form.Item>
              </>
            )}

            {Type === 'IOP' && (
              <>
                <Form.Item label="REGIONAL CENTER CODE" name="crRegionalCenterCd">
                  <Input onChange={(e) => handleChange("crRegionalCenterCd", e.target.value)} />
                </Form.Item>
                <Form.Item label="REGIONAL CENTER NAME " name="crRegionalCenterName">
                  <Input onChange={(e) => handleChange("crRegionalCenterName", e.target.value)} />
                </Form.Item>
                <Form.Item label="ADDRESS :" name="crAddress">
                  <Input onChange={(e) => handleChange("crAddress", e.target.value)} />
                </Form.Item>
                <Form.Item label="ZIP CODE :" name="crZipcode">
                  <Input onChange={(e) => handleChange("crZipcode", e.target.value)} />
                </Form.Item>
              </>
            )}
          </Col>
          <Col span={8}>
            <Form.Item>
            </Form.Item>
            {Type === 'IRP' && (
              <Form.Item label="RETURN NOTE NO" name="returnVoucherNo">
                <Input onChange={(e) => handleReturnNoteNoChange(e.target.value)} />
              </Form.Item>
            )}
            {Type === 'PO' && (
              <Form.Item label="ACCEPTANCE NOTE NO." name="acceptanceNoteNo">
                <Input />
              </Form.Item>
            )}
            {Type === 'IOP' && (
              <Form.Item label="INWARD GATE PASS" name="inwardGatePass">
                <Input />
              </Form.Item>
            )}
            {(Type === 'IOP' || Type === 'PO') && (
              <>
                <Form.Item label="NOA NO." name="noaNo">
                  <Input onChange={(e) => handleChange("noaNo", e.target.value)} />
                </Form.Item>
                <Form.Item label="NOA DATE" name="noaDate">
                  <DatePicker format={dateFormat} style={{ width: '100%' }} onChange={(date, dateString) => handleChange("noaDate", dateString)} />
                </Form.Item>
                <Form.Item label="DATE OF DELIVERY" name="dateOfDelivery">
                  <DatePicker format={dateFormat} style={{ width: '100%' }} onChange={(date, dateString) => handleChange("dateOfDelivery", dateString)} />
                </Form.Item>
              </>
            )}
          </Col>
        </Row>

        {/* Item Details */}
        <h2>ITEM DETAILS</h2>

        <Form.List name="itemDetails" initialValue={formData.items || [{}]}>
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
                      <Form.Item {...restField} label="S.NO." name={[name, 'srNo']}  >
                        <Input value={formData.items?.[index]?.srNo} onChange={(e) => e.target && itemHandleChange(`srNo`, e.target.value, index)} />
                        <span style={{ display: 'none' }}>{index + 1}</span>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} label="ITEM CODE" name={[name, 'itemCode']} initialValue={formData.items?.[index]?.itemCode}>
                        <AutoComplete
                          style={{ width: '100%' }}
                          options={itemData.map(item => ({ value: item.itemMasterCd }))}
                          placeholder="Enter item code"
                          filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                          }
                          value={formData.items?.[index]?.itemCode}
                          onChange={(value) => itemHandleChange(`itemCode`, value, index)}
                        />
                        <span style={{ display: 'none' }}>{index + 1}</span>
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item {...restField} label="ITEM DESCRIPTION" name={[name, 'itemDesc']}>
                        <AutoComplete
                          style={{ width: '100%' }}
                          options={itemData.map(item => ({ value: item.itemMasterDesc }))}
                          placeholder="Enter item description"
                          filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                          }
                          onChange={(value) => itemHandleChange(`itemDesc`, value, index)}
                          value={formData.items?.[index]?.itemDesc}

                        />
                        <span style={{ display: 'none' }}>{index + 1}</span>
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
                          onChange={(value) => itemHandleChange(`uom`, value, index)}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item {...restField} label="RECEIVED QUANTITY" name={[name, 'quantity']}>
                        <Input value={formData.items?.[index]?.quantity} onChange={(e) => itemHandleChange(`quantity`, e.target.value, index)} />
                        <span style={{ display: 'none' }}>{index + 1}</span>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} label="BUDGET HEAD PROCUREMENT" name={[name, 'budgetHeadProcurement']}>
                        <Input onChange={(e) => itemHandleChange(`budgetHeadProcurement`, e.target.value, index)} />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} label="LOCATOR" name={[name, 'locatorId']}>
                        <Input onChange={(e) => itemHandleChange(`locatorId`, e.target.value, index)} />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item {...restField} label="REMARK" name={[name, 'remarks']}>
                        <Input value={formData.items?.[index]?.remarks} onChange={(e) => itemHandleChange(`remarks`, e.target.value, index)} />
                        <span style={{ display: 'none' }}>{index + 1}</span>
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
            <Form.Item label="CONDITION OF GOODS" name="conditionOfGoods">
              <Input.TextArea onChange={(e) => handleChange("conditionOfGoods", e.target.value)} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="NOTE" name="note">
              <Input.TextArea onChange={(e) => handleChange("note", e.target.value)} />
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
              NAME & SIGNATURE :<Form><Input value={formData.genName} name="genName" onChange={(e) => handleChange("genName", e.target.value)} /></Form>
            </div>
            <div className='goods-receive-note-signature'>
              DATE & TIME :<DatePicker defaultValue={dayjs()} format={dateFormat} style={{ width: '58%' }} name="genDate" onChange={(date, dateString) => handleChange("genDate", dateString)} />
            </div>
          </div>

          <div >
            <div className='goods-receive-note-signature'>
              VARIFIED BY
            </div>
            <div className='goods-receive-note-signature'>
              NAME & SIGNATURE :<Form><Input name='issueName' onChange={(e) => handleChange("issueName", e.target.value)} /></Form>
            </div>
            <div className='goods-receive-note-signature'>
              DATE & TIME :<DatePicker defaultValue={dayjs()} format={dateFormat} style={{ width: '58%' }} name='issueDate' onChange={(date, dateString) => handleChange("issueDate", dateString)} />
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
          <Modal title="Goods Receive Note successfully" visible={isModalOpen} onOk={handleOk} >
            {successMessage && <p>{successMessage}</p>}
            {errorMessage && <p>{errorMessage}</p>}
          </Modal>
        </div>
      </Form>
    </div >
  );
};

export default GoodsReceiveNoteForm;
