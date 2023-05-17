import React, { useState, createRef } from "react";
import style from "../../../styles/admin/main.module.css";
import Btnmodal from "./btnModal";
import Button from "./Button";
import { Form } from "antd";
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
const empty = style.emptyModal;
const content = style.addPatient;
const modalOpen = style.modal;
const modalClose = style.closeModal;
const modal = ({
	loadingSubmit,
	onCancel,
	containerBtn,
	children,
	handleCloseModal,
	disabled,
	handleOpenModal,
	editModal,
	submit,
	classEmptyModal = ` ${empty}`,
	classContentModal = `${content}`,
	openModal = `${style.modal}`,
	closeModal = `${style.closeModal}`,
	titleText,
}) => {
	const [form] = Form.useForm();
	const onFinish = (values) => {
		console.log("Success:", values);
		console.log("hello world");
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
		console.log("hello world");
	};
	const [adminModal, setAdminModal] = useState(true);
	const [loading, setLoading] = useState(true);

	return (
		<React.Fragment>
			<Form {...layout} layout="vertical" form={form}>
				<div className={adminModal ? openModal : closeModal}>
					<div className={classEmptyModal} />
					<div className={`${classContentModal} vertical-content`}>
						<div className={style.titlePatient}>
							<p className={style.textTitle}>{titleText}</p>
							<Btnmodal
								disabled={disabled}
								containerBtn={containerBtn}
								onCancel={onCancel}
								cancelonClick={handleCloseModal}
								handleSubmit={submit}
								loadingSubmit={loadingSubmit}
							/>
						</div>
						<div className={style.line} />
						{children}
					</div>
				</div>
			</Form>
		</React.Fragment>
	);
};
export default modal;
