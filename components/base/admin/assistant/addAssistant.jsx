import React, { useState } from "react";
import style from "../../../../styles/admin/assistant.module.css";
import { Form, Input, Button } from "antd";
import Modal from "../modal";
export default function addAssistant({
	loadAssis,
	editAssis,
	handleCloseModal,
	onProcess,
	editMode,
}) {
	console.log();
	const [dataAssis, setDataAssis] = useState({
		id: editAssis.id,
		name: editAssis.name,
		family: editAssis.family,
		email: editAssis.email,
		mobile: editAssis.mobile,
		password: editAssis.password,
		description: editAssis.description,
	});
	const [errors, setErrors] = useState({
		errorName: false,
		errorFamily: false,
		errorEmail: false,
		errorPassword: false,
		errorMobileMore: false,
		errorMobile: false,
	});
	const input1 = (e) => {
		const update = { ...dataAssis, name: e.target.value };
		setDataAssis(update);
	};
	const input2 = (e) => {
		const update = { ...dataAssis, family: e.target.value };
		setDataAssis(update);
	};
	const input3 = (e) => {
		const update = { ...dataAssis, email: e.target.value };
		setDataAssis(update);
	};
	const input4 = (e) => {
		const update = { ...dataAssis, mobile: e.target.value };
		setDataAssis(update);
	};
	const input5 = (e) => {
		const update = { ...dataAssis, password: e.target.value };
		setDataAssis(update);
	};
	const input6 = (e) => {
		const update = { ...dataAssis, description: e.target.value };
		setDataAssis(update);
	};
	const submit = (e) => {
		console.log("ssss");
		let err = {
			errorName: false,
			errorFamily: false,
			errorEmail: false,
			errorPassword: false,
			errorMobileMore: false,
			errorMobile: false,
		};
		if (dataAssis.name.length < 1) {
			err = { ...err, errorName: true };
		}
		if (dataAssis.family.length < 1) {
			err = { ...err, errorFamily: true };
		}
		if (dataAssis.email.length < 1) {
			err = { ...err, errorEmail: true };
		}
		if (dataAssis.name.length >= 1) {
		} else {
			if (dataAssis.password == undefined || dataAssis.password.length < 4) {
				err = { ...err, errorPassword: true };
			}
		}
		if (dataAssis.mobile.length < 1) {
			err = { ...err, errorMobile: true };
		}
		if (dataAssis.mobile.length > 10) {
			err = { ...err, errorMobileMore: true };
		}
		setErrors(err);
		if (
			err.errorName ||
			err.errorFamily ||
			err.errorMobile ||
			err.errorPassword ||
			err.errorEmail
		) {
			return;
		} else {
			onProcess(dataAssis);
		}
	};
	console.log(editAssis);
	console.log(errors);
	return (
		<Modal
			loadingSubmit={loadAssis}
			submit={submit}
			handleCloseModal={handleCloseModal}
			openModal={style.modalHistory}
			classContentModal={style.historyContent}
			classEmptyModal={style.histroyEmpty}
			titleText={"Add an Assistant"}>
			<Form.Item
				initialValue={dataAssis.name}
				label="Name"
				name="name"
				hasFeedback
				rules={[
					{
						required: true,
						message: errors.errorName ? "plaese input Name !" : "",
					},
				]}
				hasFeedback={errors.errorName}
				validateStatus={errors.errorName ? "error" : ""}>
				<Input onChange={input1} defaultValue={dataAssis.name} />
			</Form.Item>
			<Form.Item
				initialValue={dataAssis.family}
				label="Family"
				name="family"
				hasFeedback
				rules={[
					{
						required: true,
						message: errors.errorFamily
							? "Please input your Family!"
							: "",
					},
				]}
				hasFeedback={errors.errorFamily}
				validateStatus={errors.errorFamily ? "error" : ""}>
				<Input onChange={input2} defaultValue={dataAssis.family} />
			</Form.Item>
			<Form.Item
				initialValue={dataAssis.email}
				label="Email"
				name="email"
				rules={[
					{
						required: true,
						message: errors.errorEmail ? "Please input your Email!" : "",
					},
				]}
				hasFeedback={errors.errorEmail}
				validateStatus={errors.errorEmail ? "error" : ""}>
				<Input
					type="email"
					onChange={input3}
					defaultValue={dataAssis.email}
				/>
			</Form.Item>
			<Form.Item
				initialValue={dataAssis.mobile}
				label="Cell Phone"
				name="mobile"
				rules={[
					{
						required: true,
						message: errors.errorMobile
							? "Please input your Mobile!"
							: "",
					},
					errors.errorMobileMore && {
						max: 10,
						required: true,
						message: errors.errorMobileMore
							? "Mobile can not more than 10 !"
							: "",
					},
				]}
				hasFeedback={errors.errorMobile}
				validateStatus={errors.errorMobile ? "error" : ""}>
				<Input
					maxLength={10}
					type="number"
					onChange={input4}
					defaultValue={dataAssis.mobile}
				/>
			</Form.Item>
			{editAssis.name.length >= 1 ? (
				""
			) : (
				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: errors.errorPassword
								? "Password Can not Lower 4 !"
								: "",
						},
					]}
					hasFeedback={errors.errorPassword}
					validateStatus={errors.errorPassword ? "error" : ""}>
					<Input
						type="password"
						onChange={input5}
						defaultValue={dataAssis.password}
					/>
				</Form.Item>
			)}
			<Form.Item label="Description" name="description">
				<Input.TextArea
					onChange={input6}
					defaultValue={dataAssis.description}
					style={{ width: "100%", height: "62px" }}
				/>
			</Form.Item>
		</Modal>
	);
}
