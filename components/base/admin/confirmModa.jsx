import { Modal, Button } from 'antd';
import React, { useEffect } from 'react';
export default function confirmModal({
	confirmLoading,
	nameConfirmModal,
	title,
	handleOk,
	removeData,
	confirmModal,
	closeConfirmModal
}) {
	// const [ visible, setVisible ] = React.useState();

	const showModal = () => {
		setVisible(true);
	};

	// const handleCancel = () => {
	// 	console.log('Clicked cancel button');
	// 	setVisible(false);
	// };
	console.log(removeData);
	return (
		<div className="confirm-modal">
			{/* <Button type="primary" onClick={showModal}>

			</Button> */}
			<Modal
				okText="Remove"
				okType="danger"
				bodyStyle={{ display: 'none' }}
				title={`Are You Sure to Delete ?`}
				visible={confirmModal}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={closeConfirmModal}
			/>
		</div>
	);
}
