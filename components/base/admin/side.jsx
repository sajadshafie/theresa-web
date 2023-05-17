import React from "react";
import { Menu, SubMenu } from "antd";
import style from "../../../styles/admin/main.module.css";
import { MenuOutlined } from "@ant-design/icons";
export default function Side() {
	return (
		<aside className={style.sideContainer}>
			<MenuOutlined
				style={{
					color: "#D9D9D9",
					fontSize: "24px",
					width: "100%",
					height: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					borderRight: "1px solid #D9D9D9",
					borderBottom: "1px solid #D9D9D9",
				}}
			/>
		</aside>
	);
}
