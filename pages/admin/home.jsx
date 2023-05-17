import React, { useEffect, useState } from "react";
import Main from "../../components/base/admin/main";
import style from "../../styles/admin/main.module.css";
import Api from "../../config/API";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import Router from "next/router";
import { Popover, Dropdown, Menu } from "antd";
import AuthModal from "../../components/base/authModal";
import { useContext } from "react";
import { context } from "../../components/base/contex";

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
export default function home(props) {
	const [name, setName] = useState("");
	const [lastname, setLastname] = useState("");
	const logout = () => {
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
	const { state, setState } = useContext(context);
	const [getProf, setGetProf] = useState(false);
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
					setState(true);
				} else {
					return;
				}
			})
			.catch((err) => {
				console.log(err.response.data.message);
				// setGetProf(true);
			});
	};
	useEffect(() => {
		console.log(props.data);
		getName();
		if (name == null || lastname == null) {
			setState(true);
		} else {
			setState(false);
		}
	}, []);
	const onProcessAuth = (d) => {
		setName(d.name);
		setLastname(d.family);
	};
	console.log(getProf);

	return (
		<Main
			titleName="Home"
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
			{state ? (
				<AuthModal
					onProcessAuth={onProcessAuth}
					containerClass={style.fullContainerModalHome}
				/>
			) : (
				""
			)}
			<div className={style.homePage}>
				<img
					className={style.imgHome}
					src="/img/admin/hospital.png"
					alt=""
				/>
			</div>
			<p className={style.txtHome}>TERESA HEALTH</p>
		</Main>
	);
}
