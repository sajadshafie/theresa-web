import React from "react";
import Main from "../../components/base/admin/main";
import style from "../../styles/admin/main.module.css";
import Button from "../../components/base/admin/Button";
import { useState, useEffect } from "react";
import PatientList from "../../components/base/admin/patientList";
import PatientForm from "../../components/base/admin/patientForm";
import PregnancyHistory from "../../components/base/admin/pregnancyHistory";
import PregnancyProblem from "../../components/base/admin/pregnancyProblem";
import Underlying from "../../components/base/admin/underlying";
import Abortion from "../../components/base/admin/abortion";
import { UserOutlined, DownOutlined } from "@ant-design/icons";

import { Input, notification, Dropdown, Menu, Select, Popover } from "antd";
import API from "../../config/API";
import Cookies, { get } from "js-cookie";
import Router from "next/router";
import Api from "../../config/API";
import ConfirmModal from "../../components/base/admin/confirmModa";
import Drop from "../../components/base/admin/dropDown";

import {
	AsYouType,
	isValidPhoneNumber,
	parsePhoneNumberFromString,
} from "libphonenumber-js";

export async function getServerSideProps(context) {
	// const res = await fetch(`https://...`)
	const test = true;
	const cookies = context.req.headers.cookie;
	if ((cookies && !cookies.includes("patienttoken")) || cookies == undefined) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}

	return {
		props: {
			data: cookies ? cookies : null,
		}, // will be passed to the page component as props
	};
}
const { Option } = Select;
const { Search } = Input;
const myImg = (
	<UserOutlined
		style={{
			fontSize: "35px",
			borderRadius: "100px",
			border: "1px solid black",
			color: "black",
			padding: "3px",
		}}
	/>
);

export default function admin(props) {
	const [userData, setUserData] = useState();

	const [myCategory, setMyCategory] = useState([
		{ name: "Normal", value: 1 },
		{ name: "High Risk", value: 3 },
		{ name: "Pre HighRisk", value: 2 },
	]);
	const [table, setTable] = useState(["sss"]);
	const [value, setValue] = useState("");
	const [openModal, setOpenModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [patientPage, setPatientPage] = useState(false);
	const [patientHistory, setPatientHistory] = useState();
	const [pregnancyHistoryPage, setPregnancyHistoryPage] = useState(false);
	const [pregnancyProblemPage, setPregnancyProblemPage] = useState(false);
	const [underlyingPage, setUnderlyingPage] = useState(false);
	const [abortionPage, setAbortionPage] = useState(false);
	const [disable, setDisable] = useState(true);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [titleConfirmModal, setTitleConfirmModal] = useState("");
	const [dataHistory, setDataHistory] = useState();
	const [dataProblems, setDataProblem] = useState([]);
	const [dataUnderlying, setDataUnderlying] = useState([]);
	const [modalText, setModalText] = React.useState("Content of the modal");
	const [nameConfirmModal, setNameConfirmModal] = useState("");
	const [addOrEddit, setAddOrEdit] = useState("");
	const [confirmModal, setConfirmModal] = useState(false);
	const [dataAbortion, setDataAbortion] = useState([]);
	const [removeData, setRemoveData] = useState();
	const [loadsub, setLoadsub] = useState(false);
	const [loadsubHistory, setloadsubHistory] = useState(false);
	const [loadsubProblem, setLoadsubProblem] = useState(false);
	const [loadsubUnderlying, setLoadsubUnderlying] = useState(false);
	const [loadsubAbortion, setLoadsubAbortion] = useState(false);

	const [editListHistory, setEditListHistory] = useState({
		id: "",
		order: "",
		sex: "",
		type: "",
		situation: "",
		des: "",
		delivery: "",
	});
	const [editListProblems, setEditListProblems] = useState({
		id: "",
		problem: "",
		type: "",
		des: "",
		problemName: "",
		typeName: "",
	});
	const [editListUnderlying, setEditListUnderlying] = useState({
		id: "",
		underlying: "",
		type: "",
		des: "",
		underlyingName: "",
		typeName: "",
	});
	const [editListAbortion, setEditListAbortion] = useState({
		id: "",
		order: "",
		type: "",
		des: "",
	});
	const [loadingHistory, setLoadingHistory] = useState();
	const [tableData, setTableData] = useState({
		token: "",
		id: "",
		key: "",
		firstName: "",
		multi: "",
		date: "",
		lastName: "",
		age: "",
		address: "",
		email: "",
		category: "",
		questions: [
			{
				name: "Smoking",
				value: false,
			},
			{
				name: "DrinkingAlchohol",
				value: false,
			},
			{
				name: "SingleMom",
				value: false,
			},
			{
				name: "UsingDrugs",
				value: false,
			},
			{
				name: "UsingSpecialPills",
				value: false,
			},
		],
		description: "",
		image: "",
		noca: "",
	});
	const [checkEdit, setCheckEdit] = useState("");
	const [editId, setEditId] = useState();
	const editConvert = (data) => {
		if (data == "first") {
			return "1";
		}
		if (data == "secend") {
			return "2";
		}
		if (data == "third") {
			return "3";
		}
		if (data == "fourth") {
			return "4";
		}
		if (data == "fiveth") {
			return "5";
		}
		if (data == "sixth") {
			return "6";
		}
		if (data == "seventh") {
			return "7";
		}
	};
	const myPatient = () => {
		const token = Cookies.get("patienttoken");
		console.log(token);
		Api.patientList()
			.then((res) => {
				setDisable(false);
				console.log(res.data.response);
				setUserData(res.data.response);
			})
			.catch((err) => {
				setDisable(false);
				console.log(err.response);
			});
	};
	const getHistory = (id) => {
		API.problemHistoryList({
			params: {
				patient_id: id,
			},
		})
			.then((res) => {
				let dh = res.data.response;
				console.log(res);
				setDataHistory(res.data.response);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getProblem = (id) => {
		API.problemPregnancyProblemList({
			params: {
				patient_id: id,
			},
		})
			.then((res) => {
				console.log(res);
				setDataProblem(res.data.response);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const getUnderlying = (id) => {
		API.problemUnderlyingList({
			params: {
				patient_id: id,
			},
		})
			.then((res) => {
				setDataUnderlying(res.data.response);
				console.log("UnderlyingList");
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const getAbortion = (id) => {
		API.problemAbortionList({
			params: {
				patient_id: id,
			},
		})
			.then((res) => {
				console.log(res);
				setDataAbortion(res.data.response);
				console.log("AbortionList");
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const [name, setName] = useState("");
	const [lastname, setLastname] = useState("");
	const getName = () => {
		Api.profileList()
			.then((res) => {
				console.log(res.data.response.name);
				setName(res.data.response.name);
				setLastname(res.data.response.family);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		// userData;
		console.log(localStorage.getItem("level"));
		console.log(props.data);
		console.log(userData);
		console.log(patientHistory);
		myPatient();
		getName();
	}, []);
	const editHistory = (e, d) => {
		setCheckEdit("history");
		console.log(d);
		setEditId(d.id);
		setPregnancyHistoryPage(true);
		const updateHistory = {
			...editListHistory,
			id: d.id,
			order: editConvert(d.childOrder),
			sex: d.childSex == 0 ? "Boy" : "Girl",
			situation: d.childSituation == 1 ? "Live" : "Dead",
			type: d.typeOfchildbirth == 0 ? "Natural" : "Cesarean Delivery",
			des: d.description,
			delivery: d.dateOfDelivery,
		};
		setEditListHistory(updateHistory);
	};
	const convertEdit = (data) => {
		if (data == "first") {
			return "1";
		}
		if (data == "secend") {
			return "2";
		}
		if (data == "third") {
			return "3";
		}
		if (data == "fourth") {
			return "4";
		}
		if (data == "fiveth") {
			return "5";
		}
		if (data == "sixth") {
			return "6";
		}
		if (data == "seventh") {
			return "7";
		}
	};
	const convert = (data) => {
		if (data == "1") {
			return "first";
		}
		if (data == "2") {
			return "secend";
		}
		if (data == "3") {
			return "third";
		}
		if (data == "4") {
			return "fourth";
		}
		if (data == "5") {
			return "fiveth";
		}
		if (data == "6") {
			return "sixth";
		}
		if (data == "7") {
			return "seventh";
		}
	};
	const typeHistory = (d) => {
		if (d == "Natural") {
			return false;
		} else {
			return true;
		}
	};
	const onProcessHistory = (d, loading) => {
		setloadsubHistory(true);
		console.log(d);

		if (checkEdit == "history") {
			console.log("this is update");
			API.updateProblemHistory(
				{
					description: d.des,
					child_order: convert(d.order),
					child_sex: d.sex == "Girl" ? true : false,
					type_of_childbirth:
						d.type.length > 1 ? typeHistory(d.type) : d.type,
					child_situation:
						d.situation.length > 1
							? typeHistory(d.situation)
							: d.situation,
					date_of_delivery: d.delivery,
				},
				editId
			)
				.then((res) => {
					setPregnancyHistoryPage(false);
					getHistory(d.id);
					console.log(res);
					setDataHistory(res.data.res);
					setloadsubHistory(false);
					notification.success({
						message: res.data.message,
					});
				})
				.catch((err) => {
					notification.error({
						message: "Failed to Register",
					});
					console.log(err.response);
					setloadsubHistory(false);
				});
		} else {
			console.log("this is add new");
			API.addProblemHistory({
				patient_id: d.id,
				description: d.des,
				child_order: convert(d.order),
				child_sex: d.sex == "Girl" ? true : false,
				type_of_childbirth: d.type,
				child_situation: d.situation,
				date_of_delivery: d.delivery,
			})
				.then((res) => {
					setPregnancyHistoryPage(false);
					getHistory(d.id);
					notification.success({
						message: res.data.message,
					});
					console.log(res);
					setloadsubHistory(false);
				})
				.catch((err) => {
					console.log(err);
					notification.error({
						message: "Failed to Register",
					});
					setloadsubHistory(false);
				});
		}
		// } else {
		// const updateEdit = dataHistory.map((i) => {
		// 	if (i.id === d.id) {
		// 		return { ...d };
		// 	} else {
		// 		return { ...i };
		// 	}
		// });
		// setDataHistory(updateEdit);
		// }
	};
	console.log(patientHistory);
	const removeHistory = (e, d) => {
		// const remove = dataHistory.filter((i) => {
		// 	return i.id !== d.id;
		// });
		// setDataHistory(remove);
		setTitleConfirmModal("Patient History?");
		setNameConfirmModal("History");
		e.stopPropagation();
		console.log(d);
		setConfirmModal(true);
		setRemoveData(d);
	};
	const onProcessProblems = (d, form1, form2) => {
		setLoadsubProblem(true);
		console.log(d);
		console.log(form1, form2);
		if (addOrEddit == "") {
			console.log("Create Problem");
			API.addPregnancyProblems({
				patient_id: d.id,
				description: d.des,
				category_id: d.problem,
				sub_category_id: d.type,
			})
				.then((res) => {
					getProblem(d.id);
					console.log(res);
					setLoadsubProblem(false);
					setPregnancyProblemPage(false);
				})
				.catch((err) => {
					setLoadsubProblem(false);
					console.log(err.response.data.message);
					notification.error({
						message: err.response.data.message,
					});
				});
		} else {
			console.log("update Problem");
			API.updateProblemPregnancyProblem(
				{
					description: d.des,
					category_id: d.problem,
					sub_category_id: d.type,
				},
				editId
			)
				.then((res) => {
					getProblem(d.id);
					console.log(res);
					setAddOrEdit("");
					setLoadsubProblem(false);
					setPregnancyProblemPage(false);
				})
				.catch((err) => {
					notification.error({
						message: err.response.data.message,
					});
					console.log(err.response);
					setAddOrEdit("");
					setLoadsubProblem(false);
				});
		}
	};
	const editProblem = (e, d) => {
		setAddOrEdit("edit");
		setAddProblemSul("");
		setEditId(d.id);
		console.log(d);
		setPregnancyProblemPage(true);
		const editProblem = {
			...editListProblems,
			id: d.id,
			problem: d.problemCategory,
			type: d.problemSubCategory,
			des: d.description,
			typeName: d.sub_category_name,
			problemName: d.category_name,
		};
		setEditListProblems(editProblem);
	};
	const removeProblem = (e, d) => {
		// const remove = dataProblems.filter((i) => {
		// 	return d.id !== i.id;
		// });
		// setDataProblems(remove);
		setTitleConfirmModal("Patient List ?");
		setNameConfirmModal("Problem");
		e.stopPropagation();
		console.log(d);
		setConfirmModal(true);
		setRemoveData(d);
	};
	const onProcessUnderlying = (d) => {
		console.log(d);
		setLoadsubUnderlying(true);
		if (addOrEddit == "") {
			console.log("add new underlying");
			Api.addProblemUnderlying({
				patient_id: d.id,
				description: d.des,
				category_id: d.problem,
				sub_category_id: d.type,
			})
				.then((res) => {
					getUnderlying(d.id);
					console.log(res);
					setLoadsubUnderlying(false);
					setUnderlyingPage(false);
				})
				.catch((err) => {
					setLoadsubUnderlying(false);
					console.log(err.response);
				});
		} else {
			console.log("edit underlying");
			API.updateUnderlying(
				{
					// patient_id: d.id,
					description: d.des,
					category_id: d.problem,
					sub_category_id: d.type,
				},
				editId
			)
				.then((res) => {
					getUnderlying(d.id);
					console.log(res);
					setAddOrEdit("");
					setLoadsubUnderlying(false);
					setUnderlyingPage(false);
				})
				.catch((err) => {
					setLoadsubUnderlying(false);
					console.log(err.response);
					setAddOrEdit("");
				});
		}
	};
	const editUnderlying = (e, d) => {
		setUnderlyingSul("");
		console.log(d);
		setAddOrEdit("underlying");
		console.log("hi");
		setEditId(d.id);
		setUnderlyingPage(true);
		const updateData = {
			...editListUnderlying,
			id: d.id,
			underlying: d.diseasesCategory,
			type: d.diseasesSubCategory,
			des: d.description,
			underlyingName: d.category_name,
			typeName: d.sub_category_name,
		};
		setEditListUnderlying(updateData);
	};
	const removeUnderlying = (e, d) => {
		// const remove = dataUnderlying.filter((i) => {
		// 	return i.id !== d.id;
		// });
		// setDataUnderlying(remove);
		setNameConfirmModal("Underlying");
		e.stopPropagation();
		console.log(d);
		setConfirmModal(true);
		setRemoveData(d);
	};
	const abortionType = (d) => {
		if (d == "Abortion") {
			return 0;
		}
		if (d == "Death") {
			return 1;
		}
	};
	const onProcessAbortion = (d) => {
		console.log(d);
		setLoadsubAbortion(true);
		if (addOrEddit == "") {
			API.addProblemAbortion({
				patient_id: d.id,
				description: d.des,
				child_order: convert(d.order),
				abortion_type: d.type,
			})
				.then((res) => {
					getAbortion(d.id);
					console.log(res);
					setAbortionPage(false);
					setLoadsubAbortion(false);
				})
				.catch((err) => {
					console.log(err.response);
					setLoadsubAbortion(false);
				});
		} else {
			API.updateAbortion(
				{
					description: d.des,
					child_order: convert(d.order),
					abortion_type: d.type.length > 1 ? abortionType(d.type) : d.type,
				},
				editId
			)
				.then((res) => {
					getAbortion(d.id);
					console.log(res);
					setAbortionPage(false);
					setLoadsubAbortion(false);
				})
				.catch((err) => {
					setLoadsubAbortion(false);
					console.log(err.response);
				});
		}
	};

	const editAbortion = (e, d) => {
		console.log(d);
		setEditId(d.id);
		setAbortionPage(true);
		setAddOrEdit("abortion");
		const updateData = {
			...editListAbortion,
			id: d.id,
			order: editConvert(d.childOrder),
			type: d.abortionType == 0 ? "Abortion" : "Death",
			des: d.description,
		};
		setEditListAbortion(updateData);
	};
	const removeAbortion = (e, d) => {
		// const remove = dataAbortion.filter((i) => {
		// 	return i.id !== d.id;
		// });
		// setDataAbortion(remove);
		setTitleConfirmModal("Patient History?");
		setNameConfirmModal("Abortion");
		e.stopPropagation();
		console.log(d);
		setConfirmModal(true);
		setRemoveData(d);
	};
	const setMyData = (data) => {
		console.log(data.questions);
		console.log(data.vCategory);
		const updateData = {
			...tableData,
			token: data.token,
			date: data.lmp,
			multi: data.multiplePregnancy,
			id: data.patient_id,
			vCategory: data.vCategory,
			key: data.key,
			email: data.email,
			firstName: data.name,
			lastName: data.family,
			age: data.age,
			address: data.address,
			cellPhone: data.mobile,
			telephone: data.telephone,
			noca: data.numberOfLiveChildren,
			category: data.categorizepatient_id,
			questions: JSON.parse(data.generalquestions).map((v) => {
				return {
					name: v.title,
					value: v.value,
					id: v.id,
				};
			}),
			// questions: data.questions.map((v) => {
			// 	return {
			// 		name: v.name,
			// 		value: v.value
			// 	};
			// }),
			description: data.description,
			image: data.image,
		};
		setTableData(updateData);
	};

	const handleOpenModal = () => {
		const updateData = {
			...tableData,
			key: ``,
			id: ``,
			token: ``,
			cellPhone: "",
			multi: "",
			telephone: "",
			noca: "",
			firstName: "",
			date: "",
			lastName: "",
			email: "",
			age: "",
			category: "",
			questions: [
				{
					name: "Smoking",
					id: 1,
					value: false,
				},
				{
					name: "DrinkingAlchohol",
					id: 2,
					value: false,
				},
				{
					name: "SingleMom",
					id: 3,
					value: false,
				},
				{
					name: "UsingDrugs",
					id: 4,
					value: false,
				},
				{
					name: "UsingSpecialPills",
					id: 5,
					value: false,
				},
			],
			address: "",
			description: "",
			image: "",
		};
		setTableData(updateData);
		if (patientPage) {
			return;
		} else {
			setEditModal(false);
			setOpenModal(true);
		}
	};
	const handleCloseModal = () => {
		setOpenModal(false);
		setPregnancyHistoryPage(false);
		setPregnancyProblemPage(false);
		setUnderlyingPage(false);
		setAbortionPage(false);
	};
	const openPatientHistory = (data) => {
		console.log(patientHistory);
		setPatientHistory({ ...data });
		setPatientPage(true);
	};
	const closePatientHistory = () => {
		setPatientPage(false);
	};
	const handleEditModal = (data, e) => {
		console.log(data);
		setMyData(data);
		if (patientPage === false) {
			e.stopPropagation();
		}
		setPatientPage(false);
		setOpenModal(true);
		setEditModal(true);
	};
	const [dis, setDis] = useState("");
	const handleEdit = (data) => {
		if (data.multi.length >= 1) {
			setDis("edit");
		}
		console.log(data);
		setMyData(data);
		setPatientPage(false);
		setOpenModal(true);
		setEditModal(true);
	};
	const historyPregnancy = () => {
		const addNew = {
			...editListHistory,
			id: "",
			order: "",
			sex: "",
			type: "",
			situation: "",
			des: "",
		};
		setEditListHistory(addNew);
		console.log("god");
		setPregnancyHistoryPage(true);
	};
	const [addProblemSul, setAddProblemSul] = useState("");
	const problemPregnancy = () => {
		setAddProblemSul("add");
		const resetData = {
			...editListProblems,
			problem: "",
			type: "",
			des: "",
			typeName: "",
			problemName: "",
		};
		setEditListProblems(resetData);
		setPregnancyProblemPage(true);
		console.log("problem");
	};
	const [underlyingSul, setUnderlyingSul] = useState("");
	const handleUnderlying = () => {
		setUnderlyingSul("add");
		console.log("under");
		setUnderlyingPage(true);
		const resetData = {
			...editListUnderlying,
			id: "",
			underlying: "",
			type: "",
			des: "",
			underlyingName: "",
			typeName: "",
		};
		setEditListUnderlying(resetData);
	};
	const getPatient = () => {
		API.deletePatient(removeData.patient_id)
			.then((res) => {
				console.log(res);
				setConfirmModal(false);
				setConfirmLoading(false);
				myPatient();
				if (res) {
					notification.success({
						message: "removed",
					});
				}
			})
			.catch((err) => {
				console.log(err.response);
				setConfirmModal(false);
				setConfirmLoading(false);
			});
	};
	const handleOk = () => {
		setConfirmLoading(true);
		if (nameConfirmModal == "Patient") {
			getPatient();
		}
		if (nameConfirmModal == "History") {
			console.log(removeData);
			API.deleteProblemHistory(removeData.id)
				.then((res) => {
					getHistory(removeData.patient);
					console.log(res);
					setConfirmModal(false);
					setConfirmLoading(false);
					if (res) {
						notification.success({
							message: "removed",
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
		if (nameConfirmModal == "Problem") {
			console.log("in the problem list");
			console.log(removeData);
			API.deleteProblemPregnancyProblem(removeData.id)
				.then((res) => {
					getProblem(removeData.patient);
					console.log(res);
					setConfirmModal(false);
					setConfirmLoading(false);
					if (res) {
						notification.success({
							message: "removed",
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
		if (nameConfirmModal == "Underlying") {
			console.log(removeData);
			API.deleteProblemUnderlying(removeData.id)
				.then((res) => {
					getUnderlying(removeData.patient);
					console.log(res);
					setConfirmModal(false);
					setConfirmLoading(false);
					if (res) {
						notification.success({
							message: "removed",
						});
					}
				})
				.catch((err) => {
					console.log(err);
					setConfirmModal(false);
					setConfirmLoading(false);
				});
		}
		if (nameConfirmModal == "Abortion") {
			console.log(removeData);
			API.deleteProblemAbortion(removeData.id)
				.then((res) => {
					getAbortion(removeData.patient);
					console.log(res);
					setConfirmModal(false);
					setConfirmLoading(false);
					if (res) {
						notification.success({
							message: "removed",
						});
					}
				})
				.catch((err) => {
					console.log(err);
					setConfirmModal(false);
					setConfirmLoading(false);
				});
		}
	};

	const handleAbortion = () => {
		setAddOrEdit("");
		const resetData = {
			...editListAbortion,
			id: "",
			order: "",
			type: "",
			des: "",
		};
		setEditListAbortion(resetData);
		console.log("abortion");
		setAbortionPage(true);
	};
	const closeConfirmModal = () => {
		setConfirmModal(false);
	};
	const handleRemove = (e, data, del) => {
		setTitleConfirmModal("Patient List ?");
		setNameConfirmModal("Patient");
		e.stopPropagation();
		console.log(data);
		setConfirmModal(true);
		setRemoveData(data);
	};
	const onProgressing = (myData, loadingSubmit) => {
		setLoadsub(true);
		console.log(myData);
		let age = parseInt(myData.age);
		let noca = parseInt(myData.noca);
		const myObj = {
			mobile: myData.cellPhone,
			name: myData.firstName,
			family: myData.lastName,
			description: myData.description,
			telephone: myData.telephone,
			age: age,
			category: myData.category,
			email: myData.email,
			number_of_children: noca,
			lmp: myData.date,
			multiplePregnancy: myData.multi,
			address: myData.address,
			general_questions: myData.questions,
		};
		if (myData.address && myData.address.length > 1) {
			myObj["address"] = myData.address;
		} else {
			delete myObj.address;
		}
		console.log(myData.multi);

		setOpenModal(true);
		console.log(myData.id < 1);
		if (myData.id.length == 0) {
			console.log("add new patient");
			Api.addNewPatient(myObj)
				.then((res) => {
					console.log(res);
					setLoadsub(false);
					setOpenModal(false);
					myPatient();
				})
				.catch((err) => {
					setLoadsub(false);
					setOpenModal(true);
					console.log(err.response);
					console.log(myData);
					notification.error({
						message: err.response.data.message,
					});
				});
		} else {
			console.log("edit patient");
			API.editPatientList(myObj, `/${myData.id}`)
				.then((res) => {
					console.log(res);
					setOpenModal(false);
					setLoadsub(false);
					myPatient();
					notification.success({
						message: res.data.message,
					});
				})
				.catch((err) => {
					setOpenModal(true);
					setLoadsub(false);
					console.log(err.response);
					if (err) {
						notification.error({
							message: err.response.data.message,
						});
					}
				});
		}
	};
	const searchList = (value) => {
		// setValue(value);
		// console.log(value.currentTarget.value);
	};

	const [searchVal, setSearchVal] = useState("");
	console.log(loadingHistory);
	const handleSearch = (v) => {
		console.log(v);
		console.log(searchVal);
		if (searchVal == "Name") {
			Api.searchPatient({
				params: {
					start_index: 0,
					limit_index: "10",
					order_by: "patient_id",
					sort: "asc",
					name: v,
					family: "",
				},
			})
				.then((res) => {
					console.log(res);
					setUserData(res.data.response);
					if (!res.data.response.length > 1) {
						notification.warning({
							message: "Not Found",
						});
					}
				})
				.catch((err) => {
					console.log(err.response);
				});
		}
		if (searchVal == "Family") {
			Api.searchPatient({
				params: {
					start_index: 0,
					limit_index: "10",
					order_by: "",
					sort: "asc",
					name: "",
					family: v,
				},
			})
				.then((res) => {
					console.log(res);
					setUserData(res.data.response);
					if (!res.data.response.length > 1) {
						notification.warning({
							message: "Not Found",
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
		if (searchVal == "Cell phone") {
			console.log("mobile");
			Api.searchPatient({
				params: {
					start_index: 0,
					limit_index: "10",
					order_by: "patient_id",
					sort: "asc",
					name: "",
					family: "",
					mobile: v,
				},
			})
				.then((res) => {
					console.log(res.data.response);
					setUserData(res.data.response);
					if (v.length > 10) {
						notification.warning({
							message: "Cell phone most 10 number !",
						});
					}
				})
				.catch((err) => {
					console.log(err.response);
				});
		}
		if (searchVal == "All Field") {
			Api.searchPatient({
				params: {
					start_index: 0,
					limit_index: "10",
					order_by: "patient_id",
					sort: "asc",
					name: "",
					family: "",
				},
			})
				.then((res) => {
					console.log(res.data.response);
					setUserData(res.data.response);
					if (userData.length === res.data.response) {
						notification.warning({
							message: "You Have All Fields",
						});
					}
				})
				.catch((err) => {
					console.log(err.response);
				});
		}
	};
	console.log(editListUnderlying);
	const logout = () => {
		console.log(Cookies.get("patienttoken"));

		Api.logout()
			.then((res) => {
				console.log(res);
				Router.push("/login");
				document.cookie =
					"patienttoken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
				Cookies.remove("patienttoken", { path: "" });
			})
			.catch((err) => {
				console.log(err);
			});
	};
	console.log(Cookies.get("patienttoken"));
	const onProcessSearch = (val) => {
		setSearchVal(val);
	};
	const [categoryProblem, setCategoryProblem] = useState();
	const getCategory = () => {
		Api.categoryProblemList()
			.then((res) => {
				console.log(res);
				setCategoryProblem(res.data.response);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const onProcessNewProblem = (one, two, idProblem) => {
		console.log(one, two);
		if (typeof idProblem == "number") {
			Api.subcategoryProblem({
				name: two,
				category_id: idProblem,
			})
				.then((res) => {
					console.log(res);
					getCategory();
				})
				.catch((err) => {
					console.log(err.response);
				});
		} else {
			Api.categoryProblem({
				name: one,
			})
				.then((res) => {
					Api.subcategoryProblem({
						name: two,
						category_id: res.data.response.last_id,
					})
						.then((res) => {
							console.log(res);
							getCategory();
						})
						.catch((err) => {
							console.log(err);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	return (
		<Main
			titleName="List of Patient"
			arrowIcon={
				<Dropdown
					overlay={
						<Menu>
							<Menu.Item
								onClick={() => {
									Router.push("/admin/profile");
								}}
								style={{ fontSize: "14px" }}>
								Profile
							</Menu.Item>
							<Menu.Item onClick={logout} style={{ fontSize: "14px" }}>
								Sing out
							</Menu.Item>
						</Menu>
					}
					overlayClassName="dropDown-profile"
					trigger={["click"]}>
					<a
						className="ant-dropdown-link"
						onClick={(e) => e.preventDefault()}>
						<DownOutlined style={{ fontSize: "15px", color: "black" }} />
					</a>
				</Dropdown>
			}
			name={name == null || lastname == null ? "" : `${name} ${lastname}`}
			image={
				<UserOutlined
					// onClick={() => {
					// 	Router.push("/admin/profile");
					// }}
					style={{ cursor: "pointer", fontSize: "30px" }}
				/>
			}>
			<div className={`${style.listContainer} list-container`}>
				<div className={style.activePatientList}>
					{table.length >= 1 ? (
						<PatientList
							dis={dis}
							getAbortion={getAbortion}
							getUnderlying={getUnderlying}
							getProblem={getProblem}
							getHistory={getHistory}
							removeAbortion={removeAbortion}
							editAbortion={editAbortion}
							dataAbortion={dataAbortion}
							removeUnderlying={removeUnderlying}
							editUnderlying={editUnderlying}
							dataUnderlying={dataUnderlying}
							removeProblem={removeProblem}
							editProblem={editProblem}
							dataProblems={dataProblems}
							removeHistory={removeHistory}
							editHistory={editHistory}
							dataHistory={dataHistory}
							tableData={tableData}
							handleRemove={handleRemove}
							data={userData}
							problemPregnancy={problemPregnancy}
							historyPregnancy={historyPregnancy}
							handleUnderlying={handleUnderlying}
							handleAbortion={handleAbortion}
							patientHistory={patientHistory}
							handleEdit={handleEdit}
							openPatientHistory={openPatientHistory}
							closePatientHistory={closePatientHistory}
							patientPage={patientPage}
							handleEditModal={handleEditModal}
						/>
					) : (
						<p>
							Currently, you have no patient in your list. Click on ‘Add
							New Patient’ to add one.
						</p>
					)}
					<div className="search-patientList">
						<Button off={disable} onClick={handleOpenModal} />
						<Search
							suffix={
								<Select
									defaultValue="All Field"
									onChange={onProcessSearch}
									style={{ width: 120, border: "none" }}>
									<Option value="All Field">All Field</Option>
									<Option value="Name">Name</Option>
									<Option value="Family">Family</Option>
									<Option value="Cell phone">Cell phone</Option>
								</Select>
							}
							style={{
								position: "absolute",
								left: "1.4%",
								top: "23px",
								width: "372px",
								height: "40px",
							}}
							defaultValue={value}
							onSubmit={(v) => console.log(v, "onSubmit")}
							onSearch={handleSearch}
							onChange={searchList}>
							{/* <span>hello world</span> */}
						</Search>
					</div>
					{openModal && (
						<PatientForm
							dis={dis}
							loadsub={loadsub}
							loadingHistory={loadingHistory}
							myCategory={myCategory}
							onProgressing={onProgressing}
							tableData={tableData}
							editModal={editModal}
							handleOpenModal={handleOpenModal}
							handleCloseModal={handleCloseModal}
						/>
					)}
					{pregnancyHistoryPage && (
						<PregnancyHistory
							categoryProblem={categoryProblem}
							loadsubHistory={loadsubHistory}
							patientHistory={patientHistory}
							editListHistory={editListHistory}
							onProcessHistory={onProcessHistory}
							handleCloseModal={handleCloseModal}
						/>
					)}
					{pregnancyProblemPage && (
						<PregnancyProblem
							addProblemSul={addProblemSul}
							getCategory={getCategory}
							onProcessNewProblem={onProcessNewProblem}
							loadsubProblem={loadsubProblem}
							patientHistory={patientHistory}
							editListProblems={editListProblems}
							dataProblems={dataProblems}
							onProcessProblems={onProcessProblems}
							handleCloseModal={handleCloseModal}
						/>
					)}
					{underlyingPage && (
						<Underlying
							underlyingSul={underlyingSul}
							loadsubProblem={loadsubUnderlying}
							patientHistory={patientHistory}
							editListUnderlying={editListUnderlying}
							dataUnderlying={dataUnderlying}
							onProcessUnderlying={onProcessUnderlying}
							handleCloseModal={handleCloseModal}
						/>
					)}
					{abortionPage && (
						<Abortion
							loadsubAbortion={loadsubAbortion}
							patientHistory={patientHistory}
							editListAbortion={editListAbortion}
							onProcessAbortion={onProcessAbortion}
							handleCloseModal={handleCloseModal}
						/>
					)}
				</div>
				<ConfirmModal
					// title={titleConfirmModal}
					listName={nameConfirmModal}
					handleOk={handleOk}
					closeConfirmModal={closeConfirmModal}
					removeData={removeData}
					confirmModal={confirmModal}
					confirmLoading={confirmLoading}
				/>
			</div>
		</Main>
	);
}
