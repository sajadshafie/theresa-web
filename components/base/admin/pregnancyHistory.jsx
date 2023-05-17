import React, { useState } from "react";
import Modal from "./modal";
import style from "../../../styles/admin/main.module.css";
import { Form, Input, Select, Button } from "antd";
import { DatePicker, Space } from "antd";
import moment from "moment";

export default function pregnancyHistory({
	loadsubHistory,

	handleCloseModal,
	patientHistory,
	onProcessHistory,
	editListHistory,
}) {
	const [dataHistory, setDataHistory] = useState({
		id: patientHistory.patient_id,
		order: editListHistory.order,
		sex: editListHistory.sex,
		type: editListHistory.type,
		situation: editListHistory.situation,
		des: editListHistory.des,
		delivery: editListHistory.delivery,
	});
	const [errors, setErrors] = useState({
		errorOrder: false,
		errorDelivery: false,
		errorSituation: false,
		errorSex: false,
		errorType: false,
		errorDes: false,
	});
	const [loading, setLoading] = useState(false);

	const handleUserId = (e) => {
		const updateData = { ...dataHistory, id: e.target.value };
		setDataHistory(updateData);
	};
	const handleChildorder = (e) => {
		const updateData = { ...dataHistory, order: e.target.value };
		setDataHistory(updateData);
	};
	const handleChildSituation = (v) => {
		const updateData = { ...dataHistory, situation: v };
		setDataHistory(updateData);
		// console.log(e);
	};
	const handleChildSex = (e) => {
		const updateData = { ...dataHistory, sex: e.target.value };
		setDataHistory(updateData);
	};
	const handleDeliveryType = (v) => {
		const updateData = { ...dataHistory, type: v };
		setDataHistory(updateData);
		// console.log(e);
	};
	const handleDes = (e) => {
		const updateData = { ...dataHistory, des: e.target.value };
		setDataHistory(updateData);
	};
	function handleDelivery(date, dateString) {
		console.log(date, dateString);
		const updateData = { ...dataHistory, delivery: dateString };
		setDataHistory(updateData);
	}
	const submit = () => {
		let err = {
			errorDelivery: false,
			errorOrder: false,
			errorSituation: false,
			errorType: false,
			errorSex: false,
			errorDes: false,
		};
		if (dataHistory.order.length < 1) {
			err = { ...err, errorOrder: true };
		}
		if (dataHistory.situation.length < 1) {
			err = { ...err, errorSituation: true };
		}
		if (dataHistory.type.length < 1) {
			err = { ...err, errorType: true };
		}
		if (dataHistory.sex.length < 1) {
			err = { ...err, errorSex: true };
		}
		if (dataHistory.delivery && dataHistory.delivery.length < 1) {
			err = { ...err, errorDelivery: true };
		}
		setErrors(err);
		if (
			err.errorSituation ||
			err.errorType ||
			err.errorOrder ||
			err.errorSex
		) {
			return;
		} else {
			onProcessHistory(dataHistory);
		}
	};
	console.log(patientHistory);
	console.log(dataHistory);
	console.log(editListHistory);
	return (
		<Modal
			loadingSubmit={loadsubHistory}
			handleCloseModal={handleCloseModal}
			openModal={style.modalHistory}
			classContentModal={style.historyContent}
			classEmptyModal={style.histroyEmpty}
			titleText={"Add Pregnancy History"}
			submit={submit}>
			<p>
				Enter following information to add pregnamcy problems for the
				patient{" "}
			</p>
			<a href="">Patient Information</a>

			<div className={`${style.contentPregnancyHistory} content-history`}>
				<Form.Item
					hasFeedback
					// required
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
						type="number"
						defaultValue={editListHistory.order}
						onChange={handleChildorder}
						style={{ width: "100%", height: "40px" }}
					/>
				</Form.Item>

				<Form.Item
					rules={[
						{
							required: true,
							message: errors.errorSex
								? "Please input your Child Sex!"
								: "",
						},
					]}
					label="Child Sex"
					name="Child Sex">
					<div
						className={
							errors.errorSex
								? style.historyRowInputErr
								: style.historyRowInput
						}>
						<input
							defaultValue={editListHistory.sex}
							value="Boy"
							onClick={handleChildSex}
							type="button"
							className={
								dataHistory.sex === "Boy"
									? style.activeSex
									: style.deactiveSex
							}
						/>
						<input
							defaultValue={editListHistory.sex}
							value="Girl"
							onClick={handleChildSex}
							type="button"
							className={
								dataHistory.sex === "Girl"
									? style.activeSex
									: style.deactiveSex
							}
						/>
					</div>
				</Form.Item>
				<Form.Item
					rules={[
						{
							required: true,
							message: errors.errorType
								? "Please input your Delivery Type!"
								: "",
						},
					]}
					hasFeedback={errors.errorType}
					validateStatus={errors.errorType ? "error" : ""}
					name="Delivery Type"
					label="Delivery Type">
					<Select
						defaultValue={editListHistory.type}
						style={{ width: "100%", height: "40px" }}
						onChange={handleDeliveryType}>
						<Option value={false}> Natural</Option>
						<Option value={true}>Cesarean delivery</Option>
					</Select>
				</Form.Item>
				<Form.Item
					rules={[
						{
							required: true,
							message: errors.errorDelivery
								? "Please input your Delivery Type!"
								: "",
						},
					]}
					hasFeedback={errors.errorDelivery}
					validateStatus={errors.errorDelivery ? "error" : ""}
					label="Date of Delivery"
					name="date">
					<DatePicker
						onChange={handleDelivery}
						style={{ width: "100%" }}
						defaultValue={
							editListHistory.delivery
								? moment(editListHistory.delivery)
								: ""
						}
						// moment(editListHistory.delivery)
					/>
				</Form.Item>
				<Form.Item
					rules={[
						{
							required: true,
							message: errors.errorSituation
								? "Please input your Child Situation!"
								: "",
						},
					]}
					hasFeedback={errors.errorSituation}
					validateStatus={errors.errorSituation ? "error" : ""}
					name="Child Situation"
					label="Child Situation">
					<Select
						defaultValue={editListHistory.situation}
						style={{ width: "100%", height: "40px" }}
						onChange={handleChildSituation}>
						<Option value={true}>Live</Option>
						<Option value={false}>Dead</Option>
					</Select>
				</Form.Item>
				<Form.Item
					// hasFeedback
					// rules={[
					// 	{
					// 		required: true,
					// 		message: 'Please input your Description!'
					// 	}
					// ]}
					// hasFeedback={errors.errorDes}
					// validateStatus={errors.errorDes ? 'error' : ''}
					label="Description"
					name="Description">
					<Input.TextArea
						defaultValue={editListHistory.des}
						onChange={handleDes}
						style={{ width: "100%", height: "62px" }}
					/>
					<input type="hidden" onChange={handleUserId} />
				</Form.Item>
			</div>
		</Modal>
	);
}
