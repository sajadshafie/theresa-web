import React, { useContext, useEffect } from "react";
import Modal from "./settingModal";
import { Form, Input, Button } from "antd";
import { useState } from "react";
import {
	DeleteFilled,
	EditOutlined,
	CloseOutlined,
	CheckOutlined,
} from "@ant-design/icons";
import style from "../../../../styles/admin/setting.module.css";
import ConfirmModal from "../confirmModa";
import Api from "../../../../config/API";
import { context } from "../../../../context/context";
export default function settingProblem({
	problemCloseModal,
	handleCloseModal,
	getName,
	editUnderlyingList,
	modalUnderlying,
	getUnderlying,
}) {
	const { setModalUnderlying } = useContext(context);
	const [dataProblem, setDataProblem] = useState({
		item1: "",
		item2: "",
	});
	console.log(editUnderlyingList);
	const [subCat, setSubCat] = useState(
		editUnderlyingList.sub.length >= 1 ? editUnderlyingList.sub : []
	);
	const [openConfirm, setOpenConfirm] = useState(false);
	const [subId, setSubId] = useState("");
	const [deleteLoad, setDeleteLoad] = useState(false);
	const addSub = () => {
		const reset = {
			...dataProblem,
			item2: "",
		};
		setDataProblem(reset);
		console.log(editUnderlyingList);
		if (editUnderlyingList.name.length >= 1) {
			const reset = {
				...dataProblem,
				item2: "",
			};
			setDataProblem(reset);
			Api.subCategoryUnderlying({
				name: dataProblem.item2,
				category_id: editUnderlyingList.id,
			})
				.then((res) => {
					const update = [
						...subCat,
						{
							name: dataProblem.item2,
							id: res.data.response.last_id,
						},
					];
					setSubCat(update);
					console.log(res);
					getUnderlying();
				})
				.catch((err) => {
					console.log(err.response);
				});
		} else {
			const update = [
				...subCat,
				{
					name: dataProblem.item2,
				},
			];
			setSubCat(update);
		}
	};

	const form1 = (e) => {
		const update = { ...dataProblem, item1: e.target.value };
		setDataProblem(update);
	};
	const form2 = (e) => {
		const update = { ...dataProblem, item2: e.target.value };
		setDataProblem(update);
	};
	const removeSub = (id, vId) => {
		console.log(id);
		console.log(vId);
		setOpenConfirm(true);
		setSubId(vId);
	};
	const handleOk = () => {
		setDeleteLoad(true);
		const remove = subCat.filter((v, i) => {
			return v.id !== subId;
		});
		setSubCat(remove);
		setTimeout(() => {
			setOpenConfirm(false);
			setDeleteLoad(false);
			Api.subCategoryUnderlyingDelete(subId)
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.log(err.response);
				});
		}, 500);
	};
	const closeConfirm = () => {
		setOpenConfirm(false);
	};
	const submit = () => {
		setModalUnderlying(false);
		console.log(dataProblem.item1);
		Api.CategoryUnderlying({
			name: dataProblem.item1,
		})
			.then((res) => {
				console.log(res);
				const myid = res.data.response.last_id;
				subCat.map((v) => {
					Api.subCategoryUnderlying({
						name: v.name,
						category_id: myid,
					})
						.then((res) => {
							console.log(res);
							getUnderlying();
							problemCloseModal();
						})
						.catch((err) => {
							console.log(err.response);
						});
				});
			})
			.catch((err) => {
				console.log(err.response);
			});
	};
	const [editMode, setEditMode] = useState("");
	const editSub = (vId, i) => {
		console.log(vId, i);

		subCat &&
			subCat.map((item) => {
				if (vId == item.id) {
					return setEditMode(item.id);
				}
			});
	};
	const [subCatVal, setSubCatVal] = useState("");
	// const subCatEdit=(e)=>{
	// 	setSubCatVal(e.target.value)
	// }
	const editModeSub = (id, value) => {
		setEditMode("");
		const x = subCat.map((item) => {
			if (item.id == value.id) {
				// const x =subCat[item.name=subCatVal]
				[subCat, (item.name = subCatVal)];
			}
			// return cat
		});
		console.log(x);
		console.log(subCat);
		Api.updateSubCategoryUnderlying(
			{
				name: subCatVal,
			},
			id
		)
			.then((res) => {
				console.log(res);
				getUnderlying();
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		if (!modalUnderlying) {
			setSubCat([]);
		}
	}, []);
	console.log(editUnderlyingList.sub);
	console.log(subCat);
	console.log(editMode);
	console.log(dataProblem);
	return (
		<div className="my-list">
			<Modal
				titleText="Add a New Disease"
				handleCloseModal={handleCloseModal}
				submit={submit}
				disabled={
					subCat.length >= 1 || dataProblem.item1.length >= 1
						? false
						: true
				}>
				<Form.Item
					label="Underlying Disease"
					required
					rules={[
						{
							required: true,
							message: "Please input your Disease!",
						},
					]}
					hasFeedback
					validateStatus>
					<Input onChange={form1} defaultValue={editUnderlyingList.name} />
				</Form.Item>
				<Form.Item
					label="Underlying Disease Type"
					required
					rules={[
						{
							required: true,
							message: "Please input your Disease Type!",
						},
					]}
					hasFeedback
					validateStatus>
					<div className={style.subCat}>
						<Input
							style={{ width: "77%" }}
							onChange={form2}
							defaultValue={dataProblem.item2}
							value={dataProblem.item2}
						/>
						<Button
							disabled={dataProblem.item2.length > 1 ? false : true}
							onClick={addSub}
							style={{
								background: "#08979C",
								color: "white",
								marginLeft: "0.6vw",
							}}>
							+ Add
						</Button>
					</div>
				</Form.Item>
				<ConfirmModal
					confirmModal={openConfirm}
					handleOk={handleOk}
					confirmLoading={deleteLoad}
					closeConfirmModal={closeConfirm}
				/>
				{subCat &&
					subCat.map((v, i) => {
						return v.id == editMode ? (
							<Input
								onChange={(e) => {
									setSubCatVal(e.target.value);
								}}
								suffix={
									<div className={style.iconsInput}>
										<CheckOutlined
											onClick={() => {
												editModeSub(v.id, v);
											}}
											style={{ color: "#08979C" }}
										/>
										<CloseOutlined
											style={{ color: "#FF4D4F" }}
											onClick={() => {
												setEditMode("");
											}}
										/>
									</div>
								}
								defaultValue={v.name}
							/>
						) : (
							<div className={style.subCatShow}>
								<span className={style.subCatShowtxt}>{v.name} </span>
								<div className={style.subCatIcons}>
									<EditOutlined
										style={{ color: "#08979c", cursor: "pointer" }}
										onClick={() => {
											editSub(v.id, v);
										}}
									/>
									<DeleteFilled
										style={{ color: "#08979c", cursor: "pointer" }}
										onClick={() => {
											removeSub(i, v.id);
										}}
									/>
								</div>
							</div>
						);
					})}
			</Modal>
		</div>
	);
}
