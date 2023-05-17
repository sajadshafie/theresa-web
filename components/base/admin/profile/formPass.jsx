import React, { useState } from 'react';
import Modal from '../modal';
import style from '../../../../styles/admin/main.module.css';
import { Form, Input, Select, Button } from 'antd';
import { DatePicker, Space } from 'antd';
export default function formProfile({ onProcessPass, handleCloseModalPass, loadPass }) {
	const [ dataPass, setDataPass ] = useState({
		// id: patientHistory.patient_id,
		// oldPass: editProfileList.oldPass,
		// newPass: editProfileList.newPass,
		// rePass: editProfileList.rePass,
		// medical: editProfileList.Medical,
		// medical2: editProfileList.medical2,
		// work: editProfileList.Work
		oldPass: '',
		newPass: '',
		rePass: ''
	});
	const [ errors, setErrors ] = useState({
		errorOldPass: false,
		errorRePass: false,
		errorNew: false
	});
	const [ loading, setLoading ] = useState(false);

	// const handleUserId = (e) => {
	// 	const updateData = { ...dataPass id: e.target.value };
	// 	setdataPass(updateData);
	// };
	const form1 = (e) => {
		const updateData = { ...dataPass, oldPass: e.target.value };
		setDataPass(updateData);
	};
	const form2 = (e) => {
		const updateData = { ...dataPass, newPass: e.target.value };
		setDataPass(updateData);
	};
	const form3 = (e) => {
		const updateData = { ...dataPass, rePass: e.target.value };
		setDataPass(updateData);
	};

	const submit = () => {
		let err = {
			errorRePass: false,
			errorOldPass: false,
			errorNew: false
		};
		if (dataPass.oldPass.length < 4) {
			err = { ...err, errorOldPass: true };
		}
		if (dataPass.newPass.length < 4) {
			err = { ...err, errorNew: true };
		}
		if (dataPass.rePass.length < 4) {
			err = { ...err, errorRePass: true };
		}

		setErrors(err);
		if (err.errorNew || err.errorRePass || err.errorOldPass) {
			return;
		} else {
			onProcessPass(dataPass);
		}
	};
	return (
		<Modal
			disabled={
				dataPass.rePass.length > 1 && dataPass.newPass.length > 1 && dataPass.oldPass.length > 1 ? false : true
			}
			loadingSubmit={loadPass}
			handleCloseModal={handleCloseModalPass}
			// openModal={style.modalHistory}
			classContentModal={style.historyContent}
			classEmptyModal={style.histroyEmpty}
			titleText={'Change Password'}
			submit={submit}
		>
			<p>Enter following information to edit your profile</p>
			<a href="">Password</a>

			<div classoldPass={`${style.contentPregnancyHistory} content-history`}>
				<Form.Item
					hasFeedback
					// required
					rules={[
						{
							required: true,
							message: errors.errorOldPass ? 'Please input your Old Password!' : ''
						}
					]}
					hasFeedback={errors.errorOldPass}
					validateStatus={errors.errorOldPass ? 'error' : ''}
					label="Old Password"
					oldPass="Old Password"
				>
					<Input type="password" onChange={form1} />
				</Form.Item>

				<Form.Item
					rules={[
						{
							required: true,
							message: errors.errorNew ? 'Please input your New Password!' : ''
						}
					]}
					hasFeedback={errors.errorNew}
					validateStatus={errors.errorNew ? 'error' : ''}
					label="New Password"
					oldPass="New Password"
				>
					<Input type="password" onChange={form2} />
				</Form.Item>
				<Form.Item
					rules={[
						{
							required: true,
							message: errors.errorRePass ? 'Please input your Repeat Password!' : ''
						}
					]}
					hasFeedback={errors.errorRePass}
					validateStatus={errors.errorRePass ? 'error' : ''}
					oldPass="Repeat Password"
					label="Repeat Password"
				>
					<Input type="password" onChange={form3} />
				</Form.Item>
			</div>
		</Modal>
	);
}
