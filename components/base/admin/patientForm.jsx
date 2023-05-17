import React, { useState, useEffect } from "react";
import Modal from "./modal";
import style from "../../../styles/admin/main.module.css";
//import 'antd/dist/antd.css';
import {
  AsYouType,
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import { Input, Switch, Select, Form, DatePicker } from "antd";
import moment from "moment";

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

export default function inputs({
  disdis,
  myCategory,
  onProgressing,
  loadsub,
  handleCloseModal,
  handleOpenModal,
  openModal,
  loadingHistory,
  editModal,
  tableData,
}) {
  const [myData, setMyData] = useState({
    token: tableData.token,
    // vCategory: tableData.vCategory,
    id: tableData.id,
    image: "",
    category: tableData.category,
    date: tableData.date,
    key: tableData.key,
    firstName: tableData.firstName,
    lastName: tableData.lastName,
    age: tableData.age,
    address: tableData.address,
    tags: tableData.tags,
    email: tableData.email,
    noca: tableData.noca,
    multi: disableInput == true ? tableData.multi : "empty",
    telephone: tableData.telephone,
    cellPhone: tableData.cellPhone,
    questions: tableData.questions.map((v) => {
      // console.log(v);
      return {
        // name: v.name,
        value: v.value,
        id: v.id,
      };
      // console.log(v);
    }),
    description: tableData.description,
  });

  console.log(myData.category);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errors, setErrors] = useState({
    errorName: false,
    errorLastname: false,
    errorEmail: false,
    errorAge: false,
    errorNoca: false,
    errorTelephone: false,
    errorCellPhone: false,
    errorCategory: false,
    errorDate: false,
    errorMulti: false,
  });
  const [disableInput, setDisableInput] = useState(true);
  const { TextArea } = Input;
  const { Option } = Select;
  const inputSelect = (
    <Select
      onChange={(value, option) => {
        console.log(value);
        setMyData({
          ...myData,
          category: value,
          // vCategory: option.children,
        });
      }}
      defaultValue={myData.category}
      style={{ width: "100%" }}
    >
      {myCategory.map((v) => {
        return <Option value={v.value}>{v.name}</Option>;
      })}
    </Select>
  );
  const handleToken = (e) => {
    const updateData = { ...myData, token: e.target.value };
    setMyData(updateData);
  };
  const handleUsername = (e) => {
    const updateData = { ...myData, firstName: e.target.value };
    setMyData(updateData);
  };
  const handleLastname = (e) => {
    const updateData = { ...myData, lastName: e.target.value };
    setMyData(updateData);
  };
  const handlePatientAge = (e) => {
    // const phoneNumber = parsePhoneNumberFromString(
    // 	v.target.value,
    // 	"CA"
    //   );
    // (18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26)

    const updateInput = { ...myData, age: e.target.value };
    setMyData(updateInput);
  };
  const handleNoca = (e) => {
    const updateInput = { ...myData, noca: e.target.value };
    setMyData(updateInput);
  };
  const handleTelephone = (e) => {
    const x = new RegExp("(0[1-9]|10|11|12)/(18|19|20|21|22|23|24|25|26)");
    console.log(x);
    const updateInput = { ...myData, telephone: e.target.value };
    setMyData(updateInput);
  };
  const handleCellPhone = (e) => {
    // console.log(^([1-9]\d*|0)(\.\d+)?$);
    const updateInput = { ...myData, cellPhone: e.target.value };
    setMyData(updateInput);

    console.log(e.target.value.match()[0]);
    // console.log(e.target.value.match('[0-9]*$')[0]);
  };
  const handleAddress = (e) => {
    const updateInput = { ...myData, address: e.target.value };
    setMyData(updateInput);
  };
  const handleDescription = (e) => {
    const updateInput = { ...myData, description: e.target.value };
    setMyData(updateInput);
  };
  const handleEmail = (e) => {
    const updateInput = { ...myData, email: e.target.value };
    setMyData(updateInput);
  };
  const submit = () => {
    let err = {
      errorEmail: false,
      errorName: false,
      errorLastname: false,
      errorAge: false,
      errorNoca: false,
      errorTelephone: false,
      errorCellPhone: false,
      errorCategory: false,
      errorDate: false,
      errorMulti: false,
    };

    if (myData.firstName.length < 1) {
      err = { ...err, errorName: true };
    }

    if (myData.lastName.length < 1) {
      err = { ...err, errorLastname: true };
    }

    if (myData.age.length < 1) {
      err = { ...err, errorAge: true };
    }
    if (myData.telephone.length < 1 || myData.telephone.length > 10) {
      err = { ...err, errorTelephone: true };
    }
    if (myData.cellPhone.length < 1 || myData.cellPhone.length > 10) {
      err = { ...err, errorCellPhone: true };
    }
    if (myData.noca.length < 1) {
      err = { ...err, errorNoca: true };
    }
    if (myData.category.length < 1) {
      err = { ...err, errorCategory: true };
    }
    if (myData.date.length < 1) {
      err = { ...err, errorDate: true };
    }
    if (myData.email.length < 1) {
      err = { ...err, errorEmail: true };
    }
    // if (myData.multi.length < 1) {
    // 	err = { ...err, errorMulti: true };
    // }
    setErrors(err);
    if (
      err.errorEmail ||
      err.errorName ||
      err.errorLastname ||
      err.errorAge ||
      err.errorCellPhone ||
      err.errorNoca ||
      err.errorTelephone ||
      err.errorCategory ||
      err.errorDate
    ) {
      return;
    } else {
      onProgressing(myData, loadingSubmit);
    }
  };
  useEffect(() => {
    if (typeof tableData.multi == "number") {
      setDisableInput(false);
    }
  }, []);

  console.log(disableInput);

  return (
    <Modal
      // loadingSubmit={loadingSubmit ? loadingSubmit : loadingHistory}
      loadingSubmit={loadsub}
      titleText={editModal === false ? "Add New Patient" : "Edit the Patient"}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      editModal={editModal}
      submit={submit}
    >
      <div className={style.inputsHeader}>
        <p>
          Enter the following information regarding adding a new patient to the
          system
        </p>
        <h4 className={style.txtTitle}>Patient information</h4>
      </div>
      <div className={style.inputs}>
        <div className={style.row}>
          <div className={style.myInputs}>
            <Form.Item
              label="Name"
              name="username"
              required
              rules={[
                {
                  required: true,
                  message: errors.errorName ? "Please input your Name!" : "",
                },
              ]}
              hasFeedback={errors.errorName}
              validateStatus={errors.errorName ? "error" : ""}
            >
              <Input
                defaultValue={tableData.firstName}
                onChange={handleUsername}
                style={{ color: "#8C8C8C" }}
              />
            </Form.Item>
          </div>
          <div className={style.myInputs}>
            <Form.Item
              label="Family"
              name="family"
              hasFeedback
              // required
              rules={[
                {
                  required: true,
                  message: errors.errorLastname
                    ? "Please input your Family!"
                    : "",
                },
              ]}
              hasFeedback={errors.errorLastname}
              validateStatus={errors.errorLastname ? "error" : ""}
            >
              <Input
                onChange={handleLastname}
                defaultValue={tableData.lastName}
                style={{ color: "#8C8C8C" }}
              />
            </Form.Item>
          </div>
        </div>
        <div className={style.row}>
          <div className={style.myInputs}>
            <Form.Item
              label="Age"
              name="age"
              hasFeedback
              // required
              rules={[
                {
                  required: true,
                  message: errors.errorAge ? "Please input your Age!" : "",
                },
              ]}
              hasFeedback={errors.errorAge}
              validateStatus={errors.errorAge ? "error" : ""}
            >
              <Input
                maxLength="2"
                onChange={handlePatientAge}
                defaultValue={tableData.age}
                style={{ color: "#8C8C8C" }}
                type="number"
              />
            </Form.Item>
          </div>
          <div className={style.myInputs}>
            <p className={style.txtAddress}>Address</p>
            <Input
              defaultValue={tableData.address}
              style={{ color: "#8C8C8C" }}
              defaultValue={tableData.address}
              onChange={handleAddress}
            />
          </div>
        </div>
        <div className={style.row}>
          <div className={style.myInputs}>
            <Form.Item
              maxLength={10}
              label="Cell Phone"
              name="Cell phone"
              // required
              rules={[
                {
                  required: true,
                  message: errors.errorCellPhone
                    ? "Please input your Cell Phone!"
                    : "",
                },
                {
                  max: 10,
                  message: "Cell Phone can not more than 10 !",
                },
              ]}
              hasFeedback={errors.errorCellPhone}
              validateStatus={errors.errorCellPhone ? "error" : ""}
            >
              <Input
                type="number"
                maxlength={10}
                style={{ color: "#8C8C8C" }}
                defaultValue={tableData.cellPhone}
                onChange={handleCellPhone}
              />
            </Form.Item>
          </div>
          <div className={style.myInputs}>
            <Form.Item
              label="Telephone"
              name="Telephone"
              // required
              rules={[
                {
                  required: true,
                  message: errors.errorTelephone
                    ? "Please input your Telephone!"
                    : "",
                },
                {
                  max: 10,
                  message: "Telephone can not more than 10 !",
                },
              ]}
              hasFeedback={errors.errorTelephone}
              validateStatus={errors.errorTelephone ? "error" : ""}
            >
              <Input
                type="number"
                maxLength="10"
                defaultValue={tableData.telephone}
                onChange={handleTelephone}
                // type="number"
                style={{ color: "#8C8C8C" }}
              />
            </Form.Item>
          </div>
        </div>
        <div className={style.row}>
          {/* <p>Number of Childeren (Alive)</p> */}
          <div className={style.myInputs}>
            <Form.Item
              label="Email"
              name="email"
              hasFeedback
              // required
              rules={[
                {
                  required: true,
                  message: errors.errorEmail ? "Please input your Email!" : "",
                },
              ]}
              hasFeedback={errors.errorEmail}
              validateStatus={errors.errorEmail ? "error" : ""}
            >
              <Input
                style={{ color: "#8C8C8C" }}
                onChange={handleEmail}
                defaultValue={tableData.email}
              />
            </Form.Item>
          </div>
          <div className={style.myInputs}>
            <Form.Item
              label="Number of Childeren (Alive)"
              name="Number of Childeren"
              hasFeedback
              // required
              rules={[
                {
                  required: true,
                  message: errors.errorNoca
                    ? "Please input your Childeren!"
                    : "",
                },
              ]}
              hasFeedback={errors.errorNoca}
              validateStatus={errors.errorNoca ? "error" : ""}
            >
              <Input
                type="number"
                style={{ color: "#8C8C8C" }}
                defaultValue={tableData.noca}
                onChange={handleNoca}
              />
              <Input
                type="hidden"
                defaultValue={tableData.token}
                onChange={handleToken}
              />
            </Form.Item>
          </div>
        </div>
      </div>
      <div className={style.generalQuestion}>
        <h4 className={style.txtTitle}>General Questions</h4>
        <div className={style.rowQuestion}>
          {console.log(tableData.questions)}
          {tableData.questions.map((v) => {
            // const myValue = v.value;
            console.log(v);
            return (
              <div className={`${style.myQuestion} switch`}>
                <p>{v.name}</p>
                <Switch
                  // style={{ height: '16px' }}
                  defaultChecked={v.value}
                  onChange={(checked) => {
                    console.log(v);
                    console.log(myData.questions);
                    console.log(checked);
                    const result = myData.questions.map((i) => {
                      return i.id === v.id ? { id: i.id, value: checked } : i;
                    });
                    console.log(result);
                    // const result = myData.questions.map(
                    // 	(i) =>
                    // 		i.value === v.value ? { name: i.name, id: i.id, value: checked } : i
                    // );
                    // console.log(result);
                    setMyData({ ...myData, questions: result });
                  }}
                />
              </div>
            );
          })}
          {/* <div className={`${style.myQuestion} switch`}>
						<p>Single Mom</p>
						<Switch
							onChange={(checked) => {
								const updateData = { ...myData, SingleMom: checked };
								setMyData(updateData);
							}}
							defaultChecked={tableData.questions[3]}
						/>
					</div> */}
        </div>
        {/* <div className={style.rowQuestion}>
					<div className={`${style.myQuestion} switch`}>
						<p>Drinking alchohol</p>
						<Switch
							onChange={(checked) => {
								const updateData = { ...myData, DrinkingAlchohol: checked };
								setMyData(updateData);
							}}
							// defaultChecked={tableData.DrinkingAlchohol}
						/>
					</div>
					<div className={`${style.myQuestion} switch`}>
						<p>Using Special Pills</p>
						<Switch
							onChange={(checked) => {
								const updateData = { ...myData, UsingSpecialPills: checked };
								setMyData(updateData);
							}}
							// defaultChecked={tableData.UsingSpecialPills}
						/>
					</div>
				</div> */}
        {/* <div className={style.rowQuestion}>
					<div className={`${style.myQuestion} switch`}>
						<p>Using Drugs</p>
						<Switch
							onChange={(checked) => {
								const updateData = { ...myData, UsingDrugs: checked };
								setMyData(updateData);
							}}
							// defaultChecked={tableData.UsingDrugs}
						/>
					</div>
				</div> */}
      </div>
      <div className={style.others}>
        <h4 className={style.txtTitle}>Other information</h4>
        <div className={style.inputDes}>
          <p>Description</p>
          <TextArea
            defaultValue={tableData.description}
            onChange={handleDescription}
            style={{ width: "100%", height: "62px" }}
          />
        </div>
        <div className={style.category}>
          <div className={style.myCategory}>
            <Form.Item
              // hasFeedback
              rules={[
                {
                  required: true,
                  message: errors.errorCategory
                    ? "Please input your Category!"
                    : "",
                },
              ]}
              validateStatus={errors.errorCategory ? "error" : ""}
              hasFeedback={errors.errorCategory}
              label="Category"
              name="category"
              // required
            >
              {inputSelect}
            </Form.Item>
          </div>
          <div className={style.myCategory}>
            <Form.Item
              label="LMP"
              name="LMP"
              hasFeedback
              // required
              rules={[
                {
                  required: true,
                  message: errors.errorDate ? "Please input your LMP!" : "",
                },
              ]}
              hasFeedback={errors.errorDate}
              validateStatus={errors.errorDate ? "error" : ""}
            >
              <DatePicker
                defaultValue={tableData.date ? moment(tableData.date) : ""}
                onChange={(date, dateString) => {
                  const updateInput = { ...myData, date: dateString };
                  setMyData(updateInput);
                }}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </div>
        </div>
        <div className={style.multiplie}>
          <span>Multiple Pregnancy</span>
          <Switch
            defaultChecked={
              tableData.multi && typeof tableData.multi == "number"
                ? true
                : false
            }
            onChange={(checked) => {
              if (checked) {
                setDisableInput(false);
              } else {
                setDisableInput(true);
              }
            }}
          />
        </div>
        <div className={style.formMultiplie}>
          <Form.Item
            style={
              disableInput
                ? { color: "#8C8C8C", marginTop: "20px" }
                : { color: "black", marginTop: "20px" }
            }
            label="Number of Potiontial Childeren"
            name="Number of Potiontial Childeren"
          >
            <Input
              defaultValue={tableData.multi}
              type="number"
              onChange={(e) => {
                const updateData = { ...myData, multi: e.target.value };
                setMyData(updateData);
              }}
              disabled={disableInput}
              style={{ width: "46%" }}
            />
          </Form.Item>
        </div>
      </div>
    </Modal>
  );
}
