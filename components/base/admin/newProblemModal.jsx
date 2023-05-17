import React from "react";
import Modal from "./modal";
import { CloseCircleOutlined } from "@ant-design/icons";
export default function newDiseases({
	children,
	containerBtn,
	onClick,
	classContentModal,
	handleCloseModal,
	classEmptyModal,
	disabled,
	titleText,
	submit,
}) {
	console.log(classContentModal);

	return (
		<Modal
			submit={submit}
			handleCloseModal={handleCloseModal}
			containerBtn={containerBtn}
			titleText={titleText}
			classEmptyModal={classEmptyModal}
			classContentModal={classContentModal}
			disabled={disabled}
			onCancel={
				<CloseCircleOutlined
					onClick={onClick}
					style={{ color: "#08979c", cursor: "pointer", fontSize: "20px" }}
				/>
			}>
			{children}
		</Modal>
	);
}
