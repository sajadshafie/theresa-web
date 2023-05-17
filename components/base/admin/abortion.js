import React, { useState } from "react";
import Modal from "./modal";
import style from "../../../styles/admin/main.module.css";
import { Form, Input, Select, Button } from "antd";
//import 'antd/dist/antd.css';

export default function abortion({
	handleCloseModal,
	onProcessAbortion,
	patientHistory,
	editListAbortion,
	loadsubAbortion,
}) {
	const [dataAbortion, setDataAbortion] = useState({
		id: patientHistory.patient_id,
		order: editListAbortion.order,
		type: editListAbortion.type,
		des: editListAbortion.des,
	});
	const [errors, setErrors] = useState({
		errorOrder: false,
		errorType: false,
		errorDes: false,
	});
	const [loading, setLoading] = useState(false);
	const handleUserId = (e) => {
		const updateData = { ...dataAbortion, id: e.target.value };
		setDataAbortion(updateData);
	};
	const handleOrder = (e) => {
		const updateData = { ...dataAbortion, order: e.target.value };
		setDataAbortion(updateData);
	};
	const handleType = (e) => {
		const updateData = { ...dataAbortion, type: e };
		setDataAbortion(updateData);
	};
	const handleDes = (e) => {
		const updateData = { ...dataAbortion, des: e.target.value };
		setDataAbortion(updateData);
	};
	const submit = () => {
		let err = {
			errorOrder: false,
			errorType: false,
			errorDes: false,
		};
		if (dataAbortion.order.length < 1) {
			err = { ...err, errorOrder: true };
		}
		console.log(dataAbortion.order);
		if (dataAbortion.type.length < 1) {
			err = { ...err, errorType: true };
		}
		// if (dataAbortion.des.length < 1) {
		// 	err = { ...err, errorDes: true };
		// }
		setErrors(err);
		if (err.errorOrder || err.errorType) {
			return;
		} else {
			onProcessAbortion(dataAbortion);
		}
	};
	return (
		<Modal
			loadingSubmit={loadsubAbortion}
			handleCloseModal={handleCloseModal}
			openModal={style.modalHistory}
			classContentModal={style.historyContent}
			classEmptyModal={style.histroyEmpty}
			submit={submit}
			titleText={"Abortion"}>
			<p>
				Enter following information to add pregnamcy problems for the
				patient{" "}
			</p>
			<div className={`${style.contentAbortion} content-abortion`}>
				<input type="hidden" onChange={handleUserId} />
				<Form.Item
					style={{ width: "100%" }}
					rules={[
						{
							required: true,
							message: errors.errorOrder
								? "Please input your Child Order!"
								: "",
						},
					]}
					hasFeedback={errors.errorOrder}
					validateStatus={errors.errorOrder ? "error" : ""}
					label="Child Order"
					name="Child Order">
					<Input
						defaultValue={editListAbortion.order}
						style={{ width: "100%", height: "40px" }}
						onChange={handleOrder}
					/>
				</Form.Item>
				<Form.Item
					style={{ width: "100%" }}
					rules={[
						{
							required: true,
							message: errors.errorType
								? "Please input your Abortion Type!"
								: "",
						},
					]}
					hasFeedback={errors.errorType}
					validateStatus={errors.errorType ? "error" : ""}
					label="Abortion Type"
					name="Abortion Type">
					<Select
						defaultValue={editListAbortion.type}
						style={{ width: "100%", height: "40px" }}
						onChange={handleType}>
						<Option value={0}>Abortion</Option>
						<Option value={1}>Death</Option>
					</Select>
				</Form.Item>
				<Form.Item
					style={{ width: "100%" }}
					// rules={[
					// 	{
					// 		required: true,
					// 		message: 'Please input your Description!'
					// 	}
					// ]}
					// hasFeedback={errors.errorDes}
					// validateStatus={errors.errorDes ? 'error' : ''}
					onChange={handleDes}
					label="Description"
					name="Description">
					<Input.TextArea
						defaultValue={editListAbortion.des}
						style={{ width: "100%", height: "62px" }}
					/>
				</Form.Item>
			</div>
		</Modal>
	);
}
