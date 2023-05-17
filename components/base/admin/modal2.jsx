import React from 'react'
import Modal from "./modal"
import style from "../../../styles/admin/main.module.css"
// //import 'antd/dist/antd.css';
import { Input , Switch , Select ,Form , DatePicker,Button} from 'antd';
import Btnmodal from './btnModal';
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
export default function modal({closeModal}) {
    const {TextArea } = Input
    const { Option } = Select;
    const inputSelect = <Select defaultValue="Select Category" style={{ width: "100%" }}>
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="disabled" disabled>
      Disabled
    </Option>
    <Option value="Yiminghe">yiminghe</Option>
  </Select>
     const onFinish = (values) => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
        
        <>  
        <Form 
            layout="vertical"
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
        <div className={style.modal}>
        <div className={style.addPatient}>
            <div className={style.titlePatient}>
                <h3 className={style.textTitle}>Add New Patient</h3>
                <div className="content-btn">
			    <Form.Item {...tailLayout}>
        		<Button  style={{backgroundColor:"#08979C",color:"white",borderRadius:"2px",        margin:"0 !important"}} type="primary" htmlType="submit">
          			submit
        		</Button>
      		    </Form.Item>
			<button className="btn-modal-cancel" onClick={closeModal}>
				cancel
			</button>
		    </div>
            </div>
            <div className={style.line}></div>
            
            <div className={style.inputsHeader}>
                <p>Enter the following information regarding adding a new patient to the system</p>
                <h4 className={style.txtTitle}>Patient information</h4>
            </div>
            <div className={style.inputs}>
                <div className={style.row}>
                    <div className={style.myInputs}>
                        <Form.Item
                            label="Family"
                            name="name"
                            rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                ]}
                            >
                            <div><Input /></div>
                         </Form.Item>
                    </div>
                    <div className={style.myInputs}>
                    <Form.Item
                            label="Family"
                            name="name"
                            rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                ]}
                            >
                            <div><Input /></div>
                         </Form.Item>
                    </div>
                </div>
                <div className={style.row}>
                    <div className={style.myInputs}>
                    <Form.Item
                            label="Age"
                            name="number"
                            rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                ]}
                            >
                            <div><Input /></div>
                         </Form.Item>
                    </div>
                    <div className={style.myInputs}>
                        <p>Address</p>
                        <Input placeholder=""/>
                    </div>
                </div>
                <div className={style.row}>
                    <div className={style.myInputs}>
                    <Form.Item
                            label="Cell Phone"
                            name="phone"
                            rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                ]}
                            >
                            <div><Input /></div>
                         </Form.Item>
                    </div>
                    <div className={style.myInputs}>
                        <Form.Item
                            label="Telephone"
                            name="phone"
                            rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                ]}
                            >
                            <div><Input /></div>
                         </Form.Item>
                    </div>
                </div>
                <div className={style.row}>
                    <div className={style.myInputs}>
                    <Form.Item
                            label="Number of Childeren (Alive)"
                            name="phone"
                            rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                ]}
                            >
                            <div><Input /></div>
                         </Form.Item>
                    </div>
                </div>
            </div>
            <div className={style.generalQuestion}>
                <h4 className={style.txtTitle}>General Questions</h4>
                <div className={style.rowQuestion}>
                    <div className={`${style.myQuestion} ant-main-color`}>
                        <p>Smoking</p>
                        <Switch />
                    </div>
                    <div className={`${style.myQuestion} ant-main-color`}>
                        <p>Single Mom</p>
                        <Switch />
                    </div>
                </div>
                <div className={style.rowQuestion}>
                    <div className={`${style.myQuestion} ant-main-color`}>
                        <p>Drinking alchohol</p>
                        <Switch />
                    </div>
                    <div className={`${style.myQuestion} ant-main-color`}>
                        <p>Using Special Pills</p>
                        <Switch />
                    </div>
                </div>
                <div className={style.rowQuestion}>
                    <div className={`${style.myQuestion} ant-main-color`}>
                        <p>Using Drugs</p>
                        <Switch />
                    </div>
                    
                </div>
            </div>
            <div className={style.others}>
                <h4 className={style.txtTitle}>Other information</h4>
                <div className={style.inputDes}>
                    <p>Description</p>
                    <TextArea style={{width:"100%",height:"62px"}}/>
                </div>
                <div className={style.category}>
                    <div className={style.myCategory}>
                        <p>Category</p>
                        {inputSelect}
                    </div>
                    <div className={style.myCategory}>
                        <p>LMP</p>
                        <DatePicker style={{width:"100%"}}/>
                    </div>
                </div>
            </div>
            </div>
            </div>
            </Form>
        </>
    )
}
