import React, { useState } from 'react';
import { Form, Button } from 'antd';
import { useRouter } from 'next/router';
import { Spin } from 'antd';
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16
	}
};
export default function btnModal({
	loadingSubmit,
	containerBtn = 'content-btn',
	classSubmit = 'btn-modal-submit',
	classCancel = 'btn-modal-cancel',
	cancelonClick = () => {
		console.log('cancelBtn');
	},
	subonClick = () => {
		console.log('submitBtn');
	},
	desSubmit = 'submit',
	desCancel = 'cancel',
	disabled,
	handleSubmit = () => {},
	onCancel = (
		<button className={classCancel} onClick={cancelonClick}>
			{desCancel}
		</button>
	)
}) {
	return (
		<div className={containerBtn}>
			<Form.Item {...tailLayout}>
				<Button
					disabled={disabled}
					loading={loadingSubmit}
					type="primary"
					htmlType="submit"
					onClick={handleSubmit}
				>
					{desSubmit}
				</Button>
			</Form.Item>
			{onCancel}
		</div>
	);
}
