import React, { useEffect, useState } from "react";
import Modal from "./modal";
import style from "../../../styles/admin/main.module.css";
import NewModal from "./newProblemModal";
import { DeleteFilled, LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Select, Button, notification, Spin } from "antd";
import Api from "../../../config/API";
import SelectUnderlying from "./selectUnderlying";
import ConfirmModal from "./confirmModa";
export default function pregnancyHistory({
	loadsubProblem,
	editListUnderlying,
	patientHistory,
	handleCloseModal,
	onProcessUnderlying,
	underlyingSul,
}) {
	console.log(editListUnderlying);
	const [emptyVal, setEmptyVa] = useState(false);
	const inp2 = React.createRef();
	const antIcon = (
		<LoadingOutlined style={{ fontSize: 24, color: "#08979C" }} spin />
	);
	const [dataProblems, setDataProblems] = useState({
		id: patientHistory.patient_id,
		problem: editListUnderlying.underlying,
		type: editListUnderlying.type,
		des: editListUnderlying.des,
		typeName: editListUnderlying.typeName,
		underlyingName: editListUnderlying.underlyingName,
	});

	const [errors, setErrors] = useState({
		errorProblem: false,
		errorType: false,
		errorDes: false,
	});
	const [modalOpen, setModalOpen] = useState(false);
	const [formItem1, setFormitem1] = useState(
		editListUnderlying.underlyingName
	);
	const [formItem2, setFormitem2] = useState("");
	const [categoryProblem, setCategoryProblem] = useState();
	const [loading, setLoading] = useState(false);
	const [defaultValProblem, setDefaultValProblem] = useState("");
	const [defaultValType, setDefaultValType] = useState("");
	const [deleteLoad, setDeleteLoad] = useState(false);
	const [openConfirm, setOpenConfirm] = useState(false);
	const [subId, setSubId] = useState();
	const handleUserId = (e) => {
		const updateData = { ...dataProblems, id: e.target.value };
		setDataProblems(updateData);
	};
	const getCategory = () => {
		Api.subCategoryUnderlyingList()
			.then((res) => {
				console.log(res);
				setCategoryProblem(res.data.response);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const [level, setLevel] = useState("");
	useEffect(() => {
		console.log(defaultValProblem);
		console.log(dataProblems);
		getCategory();
		setLevel(localStorage.getItem("level"));
	}, []);
	const handleProblem = (v, e) => {
		console.log(v, e);
		setDefaultValProblem(e.children);
		const updateData = { ...dataProblems, problem: v };
		setDataProblems(updateData);
	};
	const handleType = (v, e) => {
		setDefaultValType(e.children);
		console.log(v, e);
		const updateData = { ...dataProblems, type: v };
		setDataProblems(updateData);
	};
	const handleDes = (e) => {
		const updateData = { ...dataProblems, des: e.target.value };
		setDataProblems(updateData);
	};
	const submit = (e) => {
		let err = {
			errorProblem: false,
			errorType: false,
			errorDes: false,
		};

		if (dataProblems.problem.length < 1) {
			err = { ...err, errorProblem: true };
		}
		if (dataProblems.type.length < 1) {
			err = { ...err, errorType: true };
		}

		setErrors(err);
		if (err.errorProblem || err.errorType) {
			return;
		} else {
			onProcessUnderlying(dataProblems);
		}
	};
	const closeNewModal = (v) => {
		setFormitem2("");
		setFormitem1("");
		setDefaultValType("");
		if (dataProblems.problem === "new1") {
			const updateData = { ...dataProblems, problem: "" };
			setDataProblems(updateData);
		}
		if (dataProblems.type === "new1") {
			const updateData = { ...dataProblems, type: "" };
			setDataProblems(updateData);
		}
	};
	const [subCat, setSubCat] = useState([]);

	const addSub = (e) => {
		console.log(typeof dataProblems.problem);
		const update = [...subCat, formItem2];
		setSubCat(update);
		setFormitem2("");
		console.log(inp2);
		console.log(formItem1);
	};
	console.log(inp2);
	console.log(editListUnderlying);
	console.log(dataProblems);
	const form1 = (e) => {
		const x = e.target.value;
		const y = x.replace(/^\,+|\,+$/g, "");
		console.log(e.target.value);
		console.log(y);
		setFormitem1(y);
	};
	const form2 = (e) => {
		setFormitem2(e.target.value);
	};
	const handleOk = () => {
		const del = subCat.filter((v, i) => {
			return i !== subId;
		});
		setSubCat(del);
		setOpenConfirm(false);
	};
	const removeSub = (id) => {
		setOpenConfirm(true);
		setSubId(id);
	};
	const closeConfirm = () => {
		setOpenConfirm(false);
	};
	const newSubmit = (e) => {
		e.preventDefault();
		console.log(dataProblems);
		if (typeof dataProblems.problem == "number") {
			subCat.map((v, i) => {
				Api.subCategoryUnderlying({
					name: v,
					category_id: dataProblems.problem,
				})
					.then((ress) => {
						getCategory();
						setSubCat([]);
						const updateData = {
							...dataProblems,
							problem: editListUnderlying.problem,
							type: "",
						};
						setDefaultValProblem(null);
						setDataProblems(updateData);
						setFormitem1("");
						setFormitem2("");
						console.log(ress);
						console.log("hello");
						notification.success({
							message: res.data.message,
						});
					})
					.catch((err) => {
						console.log(err.response);
						console.log("hello");
					});
			});
		} else {
			Api.CategoryUnderlying({ name: formItem1 })
				.then((res) => {
					console.log(res);
					const myid = res.data.response.last_id;
					subCat.map((v) => {
						Api.subCategoryUnderlying({
							name: v,
							category_id: myid,
						})
							.then((ress) => {
								getCategory();
								const updateData = {
									...dataProblems,
									type: "",
									problem: editListUnderlying.problem,
								};
								setFormitem1("");
								setFormitem2("");
								setDefaultValProblem(null);
								setDataProblems(updateData);
								console.log(ress);
								console.log("hello");
								notification.success({
									message: res.data.message,
								});
							})
							.catch((err) => {
								console.log(err.response);
								console.log("hello");
								notification.error({
									message: err.response.data.message,
								});
							});
					});
				})
				.catch((err) => {
					console.log(err.response);
					notification.error({
						message: err.response.data.message,
					});
				});
		}
	};

	console.log(defaultValProblem);
	console.log(editListUnderlying);
	console.log(formItem1);
	console.log(formItem1.length);
	return (
		<Modal
			loadingSubmit={loadsubProblem}
			handleCloseModal={handleCloseModal}
			openModal={style.modalHistory}
			classContentModal={style.historyContent}
			classEmptyModal={style.histroyEmpty}
			titleText={"Add Underlying Deseases"}
			submit={submit}>
			{dataProblems.problem === "new1" || dataProblems.type === "new1" ? (
				<NewModal
					submit={newSubmit}
					disabled={subCat.length >= 1 ? false : true}
					onClick={closeNewModal}
					containerBtn="content-btn-new"
					titleText={"Add a New Disease"}
					classEmptyModal={style.emptyNew}
					classContentModal={style.contentNew}>
					<Form layout="vertical">
						<div className="form-item-1">
							<p className={style.newModalTxt}>
								Enter the information for yuor new Problem and its
								types.
							</p>
							<Form.Item
								// required
								rules={[
									{
										required: true,
										message: "Please input your Problem!",
									},
								]}
								hasFeedback
								validateStatus
								label="Underlying Disease"
								name="underlying">
								<Input
									onChange={form1}
									defaultValue={
										underlyingSul == "add"
											? ""
											: defaultValProblem
											? defaultValProblem
											: editListUnderlying.underlyingName
									}
									value={editListUnderlying.problem}
								/>
							</Form.Item>
						</div>
						<div className="form-item-2">
							<p className={style.newModalTxt}>
								Enter problems types for the new pregnancy problem.
							</p>
							<Form.Item
								rules={[
									{
										required: true,
										message: "Please input your Problem Type!",
									},
								]}
								hasFeedback
								validateStatus
								label="Disease Type"
								name="type">
								<Input
									value={formItem2}
									onChange={form2}
									disabled={
										(formItem1 && formItem1.length) ||
										(defaultValProblem &&
											defaultValProblem.length > 1)
											? false
											: true
									}
								/>
								<Button
									disabled={
										defaultValProblem && formItem2.length >= 1
											? false
											: formItem1.length === 0 ||
											  formItem2.length == 0
											? true
											: false
									}
									onClick={addSub}
									style={{ background: "#08979C", color: "white" }}>
									+ Add
								</Button>
							</Form.Item>
							{subCat.map((v, i) => {
								return (
									<div className={style.subCatShow}>
										<span className={style.subCatShowtxt}>{v} </span>

										<DeleteFilled
											style={{ color: "#08979c" }}
											onClick={() => {
												removeSub(i);
											}}
										/>
									</div>
								);
							})}

							<ConfirmModal
								confirmModal={openConfirm}
								handleOk={handleOk}
								confirmLoading={deleteLoad}
								closeConfirmModal={closeConfirm}
							/>
						</div>
					</Form>
				</NewModal>
			) : (
				""
			)}
			<p>
				Enter following information to add pregnamcy problems for the
				patient{" "}
			</p>
			<a href="">Patient Information</a>

			<div className={`${style.contentPregnancyProblems} content-history`}>
				<Form.Item
					hasFeedback
					// required
					rules={[
						{
							required: true,
							message: errors.errorProblem
								? "Please input your Pregnancy Problem!"
								: "",
						},
					]}
					hasFeedback={errors.errorProblem}
					validateStatus={errors.errorProblem ? "error" : ""}
					label="Underlying Disease"
					name="Underlying Disease">
					<SelectUnderlying
						underlyingSul={underlyingSul}
						formItem1={formItem1}
						level={level}
						editListUnderlying={editListUnderlying}
						handleProblem={handleProblem}
						categoryProblem={categoryProblem}
						defaultValProblem={defaultValProblem}
					/>
				</Form.Item>
				<Form.Item
					hasFeedback
					// required
					rules={[
						{
							required: true,
							message: errors.errorType
								? "Please input your Problem Type!"
								: "",
						},
					]}
					hasFeedback={errors.errorType}
					validateStatus={errors.errorType ? "error" : ""}
					label="Underlying Disease Type"
					name="Underlying Disease Type">
					<Select
						onClick={(e, d) => {
							console.log(dataProblems.problem);
							console.log(defaultValProblem);
							console.log(formItem1);
						}}
						// value={editListUnderlying.typeName}
						disabled={
							formItem1.length !== 0 ||
							(defaultValProblem && defaultValProblem.length !== 0)
								? false
								: true
						}
						value={editListUnderlying.problem}
						defaultValue={editListUnderlying.typeName}
						style={{ width: "100%", height: "40px" }}
						onChange={handleType}>
						{level !== "3" && underlyingSul === "" ? (
							<Option value="new1" style={{ color: "#08979C" }}>
								+ Add a New Problem
							</Option>
						) : (
							""
						)}
						{categoryProblem &&
							categoryProblem.map((i) => {
								if (i.id === dataProblems.problem) {
									console.log(i.sub_category);
									const sub = i.sub_category.map((v) => {
										return <Option value={v.id}>{v.name}</Option>;
									});
									return sub;
								}
							})}
					</Select>
				</Form.Item>

				<Form.Item
					onChange={handleDes}
					// hasFeedback
					// // required
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
						defaultValue={editListUnderlying.des}
						style={{ width: "100%", height: "62px" }}
					/>
				</Form.Item>
				<input type="hidden" onChange={handleUserId} />
			</div>
		</Modal>
	);
}
