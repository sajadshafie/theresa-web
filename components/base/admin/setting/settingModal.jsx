import React from "react";
import Modal from "../newProblemModal";
import style from "../../../../styles/admin/setting.module.css";
export default function settingModal({
	titleText,
	submit,
	containerBtn = "content-btn-new",
	disabled,
	handleCloseModal,
	onClick,
	children,
	txtStyle,
}) {
	return (
		<Modal
			onClick={handleCloseModal}
			containerBtn={containerBtn}
			classContentModal={style.contentNew}
			classEmptyModal={style.emptyNew}
			titleText={titleText}
			submit={submit}
			disabled={disabled}
			handleCloseModal={handleCloseModal}>
			<p className={style.txtStart}>
				Enter the information for yuor new pregnancy problem and its types.
			</p>
			{children}
		</Modal>
	);
}
