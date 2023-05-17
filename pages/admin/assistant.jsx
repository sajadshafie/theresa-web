import React, { useState, useEffect } from "react";
import Main from "../../components/base/admin/main";
import Button from "../../components/base/admin/Button";
import style from "../../styles/admin/assistant.module.css";
import Asistantlist from "../../components/base/admin/assistant/assistantList";
import { Input, Dropdown, Menu } from "antd";
import Api from "../../config/API";
import Modal from "../../components/base/admin/assistant/addAssistant";
import { notification, Popover } from "antd";
import ConfirmModal from "../../components/base/admin/confirmModa";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
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
const { Search } = Input;
export default function assistant() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [lastname, setLastname] = useState("");
	const [dataAssis, setDataAssis] = useState();
	const getAssis = () => {
		Api.assistantList()
			.then((res) => {
				console.log(res);
				setDataAssis(res.data.response);
			})
			.catch((err) => {
				console.log(err);
			});
	};
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
		getAssis();
		getName();
	}, []);
	const [loadAssis, setLoadAssis] = useState(false);
	const [removeData, setRemoveData] = useState("");
	const [modalForm, setModalForm] = useState(false);
	const [openHistory, setOpenHistory] = useState(false);
	const [confirmModal, setConfirmModal] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [editMode, setEditMode] = useState("");
	const [editAssis, setEditAssis] = useState({
		id: "",
		name: "",
		family: "",
		email: "",
		mobile: "",
		password: "",
		description: "",
	});
	const addNewAssis = () => {
		setModalForm(true);
		const reset = {
			...editAssis,
			id: "",
			name: "",
			family: "",
			email: "",
			mobile: "",
			password: "",
			description: "",
		};
		setEditAssis(reset);
	};
	const handleCloseModal = () => {
		setModalForm(false);
	};
	const onProcess = (d) => {
		setLoadAssis(true);
		console.log(d);
		if (editMode == "assis") {
			console.log("update");
			Api.updateAssistant(
				{
					mobile: d.mobile,
					email: d.email,
					password: d.password,
					re_password: d.password,
					name: d.name,
					family: d.family,
					description: d.description,
				},
				d.id
			)
				.then((res) => {
					setModalForm(false);
					console.log(res);
					setLoadAssis(false);
					notification.success({
						message: res.data.message,
					});
					getAssis();
				})
				.catch((err) => {
					setLoadAssis(false);
					console.log(err.response);
					if (err.response.data.errors.password[0]) {
						notification.error({
							message: err.response.data.errors.password[0],
						});
					} else {
						notification.error({
							message: err.response.data.errors.password[0],
						});
					}
				});
		} else {
			console.log("add new");
			Api.addAssistant({
				mobile: d.mobile,
				email: d.email,
				password: d.password,
				re_password: d.password,
				name: d.name,
				family: d.family,
				description: d.description,
			})
				.then((res) => {
					setModalForm(false);
					setLoadAssis(false);
					console.log(res);
					setLoadAssis(false);
					notification.success({
						message: res.data.message,
					});
					getAssis();
				})
				.catch((err) => {
					setLoadAssis(false);
					console.log(err.response);
					setLoadAssis(false);

					notification.error({
						message: err.response.data.message,
					});
				});
		}
	};
	const handleEditModal = (e, d) => {
		e.stopPropagation();
		setEditMode("assis");
		console.log(d);
		setModalForm(true);
		const edit = {
			...editAssis,
			id: d.user_id,
			name: d.name,
			family: d.family,
			email: d.email,
			mobile: d.mobile,
			password: d.password,
			description: d.description,
		};
		setEditAssis(edit);
	};
	const handleRemove = (e, d) => {
		e.stopPropagation();
		setConfirmModal(true);
		setRemoveData(d.user_id);
	};
	const handleRemoveHistory = (e, d) => {
		setModalForm(false);
		e.stopPropagation();
		setConfirmModal(true);
		setRemoveData(assisHistory.user_id);
	};
	const [assisHistory, setAssisHistory] = useState();
	const assistantDataHistory = (e, d) => {
		console.log(d);
		setOpenHistory(true);
		setAssisHistory(d);
	};
	const closeHistory = () => {
		setOpenHistory(false);
	};
	console.log(editAssis);
	const handleOk = () => {
		setConfirmLoading(true);
		Api.deleteAssistant(removeData)
			.then((res) => {
				console.log(res);
				getAssis();
				setConfirmLoading(false);
				setConfirmModal(false);
				notification.success({
					message: "Removed",
				});
			})
			.catch((err) => {
				console.log(err.response);
				setConfirmLoading(false);
			});
	};
	const closeConfirmModal = () => {
		setConfirmModal(false);
	};
	const editHistory = () => {
		setEditMode("assis");
		setModalForm(true);
		const edit = {
			...editAssis,
			id: assisHistory.user_id,
			name: assisHistory.name,
			family: assisHistory.family,
			email: assisHistory.email,
			mobile: assisHistory.mobile,
			password: assisHistory.password,
			description: assisHistory.description,
		};
		setEditAssis(edit);
	};
	const logout = () => {
		console.log(Cookies.get("patienttoken"));
		router.push("/login");
		Api.logout()
			.then((res) => {
				console.log(res);
				document.cookie =
					"patienttoken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<Main
			titleName="List of Assistant"
			arrowIcon={
				<Dropdown
					overlay={
						<Menu>
							<Menu.Item
								onClick={() => {
									router.push("/admin/profile");
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
					onClick={() => {
						router.push("/admin/profile");
					}}
					style={{ cursor: "pointer", fontSize: "30px" }}
				/>
			}>
			<div className="search-patientList search-assis">
				<Button des="Add New Assistant" onClick={addNewAssis} />
			</div>
			<div className={style.assistantContainer}>
				{dataAssis && dataAssis.length < 1 ? (
					<p>
						Currently, you have no Assistant in your list. Click on ‘Add
						New Patient’ to add one.
					</p>
				) : (
					<div className={style.tableAssistant}>
						<Asistantlist
							editHistory={editHistory}
							handleRemoveHistory={handleRemoveHistory}
							assisHistory={assisHistory}
							handleRemove={handleRemove}
							openHistory={openHistory}
							closeHistory={closeHistory}
							assistantDataHistory={assistantDataHistory}
							asis={dataAssis}
							handleEditModal={handleEditModal}
						/>
					</div>
				)}
			</div>
			<ConfirmModal
				handleOk={handleOk}
				closeConfirmModal={closeConfirmModal}
				confirmModal={confirmModal}
				confirmLoading={confirmLoading}
			/>
			{modalForm && (
				<Modal
					editMode={editMode}
					loadAssis={loadAssis}
					onProcess={onProcess}
					editAssis={editAssis}
					handleCloseModal={handleCloseModal}
				/>
			)}
		</Main>
	);
}
