import React, { useState } from 'react';
import Modal from '../modal';
import style from '../../../../styles/admin/main.module.css';
import { Form, Input, Select, Button, DatePicker, Space } from 'antd';
import moment from 'moment';
export default function formProfile({ edit, submitLoad, loadsubHistory, handleCloseModal, processData }) {
	console.log(edit);
	const [ dataProfile, setDataProfile ] = useState({
		name: edit.name,
		family: edit.family,
		email: edit.email,
		medical: edit.medical_professions,
		medical2: edit.medical_system_no,
		work: edit.work_experience
	});
	const [ errors, setErrors ] = useState({
		errorName: false,
		errorWork: false,
		errorMedical: false,
		errorFamily: false,
		errorEmail: false,
		errormedical2: false
	});
	const [ loading, setLoading ] = useState(false);

	// const handleUserId = (e) => {
	// 	const updateData = { ...dataProfile id: e.target.value };
	// 	setDataProfile(updateData);
	// };
	const form1 = (e) => {
		const updateData = { ...dataProfile, name: e.target.value };
		setDataProfile(updateData);
	};
	const form2 = (e) => {
		const updateData = { ...dataProfile, family: e.target.value };
		setDataProfile(updateData);
	};
	const form3 = (e) => {
		const updateData = { ...dataProfile, email: e.target.value };
		setDataProfile(updateData);
	};
	const form4 = (e) => {
		const updateData = { ...dataProfile, medical: e.target.value };
		setDataProfile(updateData);
	};
	const form5 = (e) => {
		const updateData = { ...dataProfile, medical2: e.target.value };
		setDataProfile(updateData);
	};
	const form6 = (e, date) => {
		console.log(e);
		const updateData = { ...dataProfile, work: date };
		setDataProfile(updateData);
	};
	const submit = () => {
		let err = {
			errorWork: false,
			errorName: false,
			errorMedical: false,
			errorEmail: false,
			errorFamily: false,
			errormedical2: false
		};
		if (dataProfile.name.length < 1) {
			err = { ...err, errorName: true };
		}
		if (dataProfile.medical.length < 1) {
			err = { ...err, errorMedical: true };
		}
		if (dataProfile.email.length < 1) {
			err = { ...err, errorEmail: true };
		}
		if (dataProfile.family.length < 1) {
			err = { ...err, errorFamily: true };
		}
		if (dataProfile.email.length < 1) {
			err = { ...err, errorEmail: true };
		}
		setErrors(err);
		if (err.errorMedical || err.errorEmail || err.errorName || err.errorFamily) {
			return;
		} else {
			processData(dataProfile);
		}
	};
	return (
		<Modal
			loadingSubmit={submitLoad}
			handleCloseModal={handleCloseModal}
			// openModal={style.modalHistory}
			classContentModal={style.historyContent}
			classEmptyModal={style.histroyEmpty}
			titleText={'Edit Profile'}
			submit={submit}
		>
			<p>Enter following information to edit your profile</p>
			<a href="">Patient Information</a>

			<div className={`${style.contentPregnancyHistory} content-history`}>
				<Form.Item
					hasFeedback
					// required
					rules={[
						{
							required: true,
							message: errors.errorName ? 'Please input your Name!' : ''
						}
					]}
					hasFeedback={errors.errorName}
					validateStatus={errors.errorName ? 'error' : ''}
					label="Name"
					name="Name"
				>
					<Input defaultValue={dataProfile.name} onChange={form1} />
				</Form.Item>

				<Form.Item
					rules={[
						{
							required: true,
							message: errors.errorFamily ? 'Please input your Family!' : ''
						}
					]}
					hasFeedback={errors.errorFamily}
					validateStatus={errors.errorFamily ? 'error' : ''}
					label="Family"
					name="Family"
				>
					<Input onChange={form2} defaultValue={dataProfile.family} />
				</Form.Item>
				<Form.Item
					rules={[
						{
							required: true,
							message: errors.errorEmail ? 'Please input your Email!' : ''
						}
					]}
					hasFeedback={errors.errorEmail}
					validateStatus={errors.errorEmail ? 'error' : ''}
					name="Email"
					label="Email"
				>
					<Input onChange={form3} defaultValue={dataProfile.email} />
				</Form.Item>
				<Form.Item
					// rules={[
					// 	{
					// 		required: true,
					// 		message: errors.errorDelivery ? 'Please input your Medical Number!' : ''
					// 	}
					// ]}
					// hasFeedback={errors.errorDelivery}
					// validateStatus={errors.errorDelivery ? 'error' : ''}
					label="Medical Number"
					name="Medical Number"
				>
					<Input onChange={form4} defaultValue={dataProfile.medical2} />
				</Form.Item>
				<Form.Item
					// rules={[
					// 	{
					// 		required: true,
					// 		message: errors.errorSituation ? 'Please input your Medical Profession!' : ''
					// 	}
					// ]}
					// hasFeedback={errors.errorSituation}
					// validateStatus={errors.errorSituation ? 'error' : ''}
					name="Medical Profession"
					label="Medical Profession"
				>
					<Input onChange={form5} defaultValue={dataProfile.medical} />
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
					label="Work Experience"
					name="Work Experience"
				>
					<DatePicker
						style={{ width: '100%' }}
						onChange={form6}
						defaultValue={dataProfile.work ? moment(dataProfile.work) : ''}
					/>
				</Form.Item>
			</div>
		</Modal>
	);
}
