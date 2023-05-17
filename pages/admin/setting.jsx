import React, { useEffect, useState, useContext } from "react";
import style from "../../styles/admin/setting.module.css";
import { RightOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";
import Main from "../../components/base/admin/main";
import { Dropdown, Menu } from "antd";
import Api from "../../config/API";
import ModalUnderlying from "../../components/base/admin/setting/settingUnderlying";
import ModalProblem from "../../components/base/admin/setting/settingProblem";
import ProblemList from "../../components/base/admin/setting/problemList";
import UnderlyingList from "../../components/base/admin/setting/underlyingList";
import ConfirmModal from "../../components/base/admin/confirmModa";
import Router from "next/router";
import { context } from "../../context/context";
export async function getServerSideProps(context) {
	// const res = await fetch('https://dev.teresai.com/api/v0/admin/profiles/show');
	// const test = await res.json();
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
export default function setting() {
	const [name, setName] = useState("");
	const [lastname, setLastname] = useState("");
	const [getProf, setGetProf] = useState(false);
	const [modalProblem, setModalProblem] = useState(false);
	const [modalUnderlying, setModalUnderlying] = useState(false);
	const [dataProblem, setDataProblem] = useState();
	const [dataUnderlying, setDataUnderlying] = useState();
	const [editProblemList, setEditProblemList] = useState({
		name: "",
		sub: "",
	});
	const [editUnderlyingList, setEditUnderlyingList] = useState({
		name: "",
		sub: "",
	});
	const getProblem = () => {
		Api.listCategoryDoctorProblem()
			.then((res) => {
				setDataProblem(res.data.response);
			})
			.catch((err) => {
				console.log(err.response);
			});
	};
	const getUnderlying = () => {
		Api.listCategoryDoctorUnderlying()
			.then((res) => {
				console.log(res);
				setDataUnderlying(res.data.response);
			})
			.catch((err) => {
				console.log(err.response);
			});
	};
	const logout = () => {
		Api.logout()
			.then((res) => {
				console.log(res);
				Router.push("/login");
				document.cookie =
					"patienttoken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
				// Cookies.remove('patienttoken', { path: '' });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const onProcessAuth = (d) => {
		setName(d.name);
		setLastname(d.family);
		setTimeout(() => {
			setGetProf(false);
		}, 1000);
	};
	const getName = () => {
		Api.profileList()
			.then((res) => {
				console.log(res.data.response.name);
				setName(res.data.response.name);
				setLastname(res.data.response.family);
				if (
					res.data.response.family == null ||
					res.data.response.name == null ||
					res.data.response.email == null
				) {
					setGetProf(true);
				} else {
					return;
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const addProblem = () => {
		setModalProblem(true);
		const reset = {
			editProblemList,
			name: "",
			sub: "",
		};
		setEditProblemList(reset);
	};
	const addUndlerying = () => {
		setModalUnderlying(true);
		const reset = {
			editUnderlyingList,
			name: "",
			sub: "",
		};
		setEditProblemList(reset);
	};
	const handleCloseModalProblem = () => {
		setModalProblem(false);
	};
	const handleCloseModalUnderlying = () => {
		setModalUnderlying(false);
	};
	const editUnderlying = (e, d) => {
		setModalUnderlying(true);
		const update = {
			...editUnderlyingList,
			id: d.id,
			name: d.name,
			sub: d.sub_category,
		};
		setEditUnderlyingList(update);
	};
	const editProblem = (e, d) => {
		console.log(d);
		setModalProblem(true);
		const update = {
			...editProblemList,
			id: d.id,
			name: d.name,
			sub: d.sub_category,
		};
		setEditProblemList(update);
	};
	const [openConfirm, setOpenConfirm] = useState(false);
	const [deleteLoad, setDeleteLoad] = useState(false);
	const [removeCategory, setRemoveCategory] = useState("");
	const [categoryIdP, setCategoryIdP] = useState("");
	const [categoryIdU, setCategoryIdU] = useState("");
	const handleOk = () => {
		setDeleteLoad(true);
		if (removeCategory == "problem") {
			Api.categoryProblemDelete(categoryIdP)
				.then((res) => {
					getProblem();
					console.log(res);
					setDeleteLoad(false);
					setOpenConfirm(false);
				})
				.catch((err) => {
					console.log(err.response);
				});
		} else {
			Api.categoryUnderlyingDelete(categoryIdU)
				.then((res) => {
					console.log(res);
					getUnderlying();
					setDeleteLoad(false);
					setOpenConfirm(false);
				})
				.catch((err) => {
					console.log(err.response);
				});
		}
	};
	const removeProblem = (e, d) => {
		console.log(d);
		setOpenConfirm(true);
		setRemoveCategory("problem");
		setCategoryIdP(d.id);
	};
	const removeUnderlying = (e, d) => {
		setOpenConfirm(true);
		setRemoveCategory("underlying");
		setCategoryIdU(d.id);
	};
	const closeConfirm = () => {
		setOpenConfirm(false);
	};
	useEffect(() => {
		getUnderlying();
		getProblem();
		getName();
		if (name == null || lastname == null) {
			getProf(true);
		} else {
			setGetProf(false);
		}
	}, []);
	const problemCloseModal = () => {
		setModalProblem(false);
	};

	console.log(editProblemList);
	console.log(dataProblem);
	return (
		<Main
			titleName="Setting"
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
					style={{ fontSize: "30px" }}
				/>
			}>
			<div className={style.settingContainer}>
				<div className={style.titleContainer}>
					<div className={style.dataManage}>
						<span className={style.txtManage}>Data Management</span>
						<RightOutlined />
					</div>
				</div>
				<div className={style.problemsContainer}>
					<ConfirmModal
						confirmModal={openConfirm}
						handleOk={handleOk}
						confirmLoading={deleteLoad}
						closeConfirmModal={closeConfirm}
					/>
					<div className={style.problem}>
						<div className={style.history}>
							<h2>Pregnancy Problems</h2>
							<div className={style.lineProblem} />
							<button
								onClick={addProblem}
								className={style.btnAddProblem}>
								<span>+</span>
								<span>Add</span>
							</button>
						</div>
						{dataProblem && dataProblem.length >= 1 ? (
							<ProblemList
								removeProblem={removeProblem}
								editProblem={editProblem}
								dataProblems={dataProblem}
							/>
						) : (
							<p>
								There is no problem entry for this patient. To add new
								one click on “+ Add” button.
							</p>
						)}
					</div>
					<div className={style.problem}>
						<div className={style.history}>
							<h2 className={style.titleProblem}>Underlying Diseases</h2>
							<div className={style.lineProblem} />
							<button
								onClick={addUndlerying}
								className={style.btnAddProblem}>
								<span>+</span>
								<span>Add</span>
							</button>
						</div>
						{dataUnderlying && dataUnderlying.length >= 1 ? (
							<UnderlyingList
								dataUnderlying={dataUnderlying}
								removeUnderlying={removeUnderlying}
								editUnderlying={editUnderlying}
							/>
						) : (
							<p>
								There is no history entry for this patient. To add new
								one click on “+ Add” button.
							</p>
						)}
					</div>
				</div>
			</div>
			{modalProblem && (
				<ModalProblem
					problemCloseModal={problemCloseModal}
					editProblem={editProblem}
					getProblem={getProblem}
					modalProblem={modalProblem}
					editProblemList={editProblemList}
					handleCloseModal={handleCloseModalProblem}
					getName={getName}
				/>
			)}
			{modalUnderlying && (
				<context.Provider value={{ modalUnderlying, setModalUnderlying }}>
					<ModalUnderlying
						modalUnderlying={modalUnderlying}
						problemCloseModal={problemCloseModal}
						modalUnderlying={modalUnderlying}
						editUnderlyingList={editUnderlyingList}
						getUnderlying={getUnderlying}
						dataUnderlying={dataUnderlying}
						handleCloseModal={handleCloseModalUnderlying}
						getName={getName}
					/>
				</context.Provider>
			)}
		</Main>
	);
}
