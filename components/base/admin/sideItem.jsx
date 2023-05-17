import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
	SettingFilled,
	MessageFilled,
	HomeFilled,
	AliwangwangFilled,
	GithubFilled,
} from "@ant-design/icons";
import style from "../../../styles/admin/main.module.css";
import Router from "next/router";
import { Menu } from "antd";
import Link from "next/link";
import {
	AppstoreOutlined,
	MailOutlined,
	SettingOutlined,
} from "@ant-design/icons";
import Svg from "./svg";
const { SubMenu } = Menu;
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
export default function sideItem() {
	const [select, setSelect] = useState("");
	const [openKeys, setOpenKeys] = React.useState([`sub${select} `]);
	const [key, setKey] = useState("1");
	const onOpenChange = (keys) => {
		const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
		if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			setOpenKeys(keys);
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
		}
	};

	const sideActive = (num) => {
		setSelect(num);
	};
	console.log(select);
	const [level,setLevel]=useState('')
	useEffect(() => {
		setLevel(localStorage.getItem("level"))
		if (window.location.pathname === "/admin/home") {
			setSelect("1");
		}
		if (window.location.pathname === "/admin/patient") {
			setSelect("2");
		}
		// if (window.location.pathname === '/admin/profile') {
		// 	setSelect('3');
		// }
		if (window.location.pathname === "/admin/assistant") {
			setSelect("4");
		}
		if (window.location.pathname === "/admin/setting") {
			setSelect("5");
		}
	}, []);
	return (
		<React.Fragment>
			<div className={style.icons}>
				<Menu
					defaultSelectedKeys={[select]}
					className="left-side-menu"
					mode="inline"
					style={{ paddingLeft: "0" }}>
					<Menu.Item
						onClick={() => {
							Router.push("/admin/home");
						}}
						key="1"
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#FDFDFD",
							color: "#C1DAE0",
							padding: "35px 0",
							margin: "0 !important",
						}}>
						<HomeFilled
							style={{ fontSize: "30px" }}
							className={select == "1" ? `active-side` : ""}
						/>
					</Menu.Item>
					<Menu.Item
						onClick={() => {
							Router.push("/admin/patient");
						}}
						key="2"
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#FDFDFD",
							color: "#C1DAE0",
							padding: "35px 0",
							margin: "0 !important",
						}}>
						{/* <MessageFilled style={{ fontSize: '30px' }} /> */}

						{select == 2 ? Svg.pattientActive : Svg.patientDeactive}
					</Menu.Item>
					
					{
						level !== "3"
						&&
						<Menu.Item
						onClick={() => {}}
						key="3"
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#FDFDFD",
							color: "#C1DAE0",
							padding: "35px 0",
							margin: "0 !important",
						}}>
						{select == 3 ? Svg.noteActive : Svg.noteDeactive}
					</Menu.Item> 
					}

					{
						level !== "3" && 
						<Menu.Item
						key="4"
						onClick={() => {
							Router.push("/admin/assistant");
						}}
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#FDFDFD",
							color: "#C1DAE0",
							padding: "35px 0",
							margin: "0 !important",
						}}>
						{select == 4 ? Svg.asisActive : Svg.asisDeactive}
					</Menu.Item>
					}

					{
						level !== '3' 
						&&
						<Menu.Item
						key="5"
						onClick={() => {
							Router.push("/admin/setting");
						}}
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#FDFDFD",
							color: "#C1DAE0",
							padding: "25px 0",
							margin: "0 !important",
						}}>
						<SettingFilled
							style={{ fontSize: "30px" }}
							className={select == "5" ? `active-side` : ""}
						/>
					</Menu.Item>
					}
				</Menu>
			</div>
			<img
				className={style.imageSide}
				src="/img/admin/image 1.svg"
				alt="loading..."
			/>
		</React.Fragment>
	);
}
