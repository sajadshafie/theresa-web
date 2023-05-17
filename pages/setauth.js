import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Form, Input, Button, Radio, Row, Col, notification } from "antd";
import Router from "next/router";
import styles from "../styles/auth.module.css";

import RootLayout from "../components/base/rootLayout";

import FormAuth from "../components/base/formAuth";
import API from "../config/API";
import Cookies from "js-cookie";
import config from "../config/global";
export async function getServerSideProps(context) {
	// const res = await fetch(`https://...`)
	const test = true;
	const cookies = context.req.headers.cookie;
	if (cookies && cookies.includes("patienttoken")) {
		return {
			redirect: {
				destination: "/admin/home",
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
export default function SetAuth() {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [pass, setPass] = useState("");
	const [rePass, setRePass] = useState("");
	const [errPass, setErrPass] = useState(false);
	const [errRePass, setErrRePass] = useState(false);

	const submitAuth = (v) => {
		console.log(v);
		setLoading(true);
		let usernumber = localStorage.getItem("number");
		// const confirmPass = Cookies.get('password').split(",")
		let signupCode = localStorage.getItem("signupcode");
		let forgetNumber = localStorage.getItem("forgetnumber");
		let forgetToken = localStorage.getItem("forgetpasstoken");
		console.log(forgetToken);
		console.log(usernumber);
		console.log(signupCode);
		if (pass.length < 3 || rePass.length < 3) {
			notification.error({
				message: "Password Cant Lower than 4 !",
			});
		}
		if (pass !== rePass) {
			notification.error({
				message: "Password Not Match !",
			});
		}

		if (pass.length > 3 || rePass.length > 3) {
			if (pass === rePass) {
				if (usernumber || signupCode) {
					API.setAuth({
						mobile: usernumber,
						password: pass,
						re_password: rePass,
						code: signupCode,
					})
						.then((res) => {
							setLoading(false);
							console.log(res);
							setErrPass(false);
							Cookies.set("patienttoken", res.data.response.token);
							config.udata = res.data.response.token;
							Router.push("/admin/home");
						})
						.catch((err) => {
							console.log(err);
							console.log(err.response);
							setLoading(false);
							if (err) {
								setErrPass(false);
								notification.error({
									message: err.response.data.message,
								});
							}
						});
				} else {
					API.forgetChangePass({
						mobile: forgetNumber,
						token: forgetToken,
						password: pass,
						re_password: rePass,
					})
						.then((res) => {
							setErrPass(false);
							localStorage.removeItem("forgetnumber");
							localStorage.removeItem("forgetcode");
							localStorage.removeItem("number");
							localStorage.removeItem("singupcode");
							console.log(res);
							Router.push("/login");
						})
						.catch((err) => {
							console.log(err);
							setErrPass(false);
						});
				}
			} else {
				setErrPass(true);
				setErrRePass(true);
			}
		} else {
			setErrPass(true);
			setErrRePass(true);
		}
	};

	const password = (e) => {
		setPass(e.target.value);
	};
	const confirmPass = (e) => {
		setRePass(e.target.value);
	};
	console.log(errPass);
	console.log(errRePass);

	return (
		<RootLayout reverseMode title="Teresa" description="Teresa">
			<FormAuth
				title="Sign up"
				description="Please enter your password"
				bottomText="Already a user? "
				bottomLinkText="Sign in"
				bottomLinkAction="/login"
				marginMode>
				<div className="sj-setauth">
					<Form onFinish={submitAuth} form={form} layout="vertical">
						<Form.Item
							label="Password"
							hasFeedback
							required
							rules={[
								{
									required: true,
									message: "Please check password!",
								},
							]}
							hasFeedback={errPass}
							validateStatus={errPass ? "error" : ""}>
							<Input
								onChange={password}
								type="password"
								size="large"
								placeholder=""
							/>
						</Form.Item>
						{/* {errPass &&<p className={styles.errAuth}>Please Check password</p>} */}
						<Form.Item
							required
							label="Re-enter Password"
							layout="vertical"
							rules={[
								{
									required: true,
									message: "Please check password!",
								},
							]}
							hasFeedback={errRePass}
							validateStatus={errRePass ? "error" : ""}>
							<Input
								onChange={confirmPass}
								type="password"
								size="large"
								placeholder=""
							/>
						</Form.Item>
						{/* {errPass && <p className={styles.errAuth}>Please Check password</p>} */}

						<Form.Item className={styles.centerButton}>
							<Button
								htmlType="submit"
								loading={errPass ? "" : loading}
								// onClick={submitAuth}
								size="large"
								type="primary"
								className="buttonDefault">
								submit
							</Button>
						</Form.Item>
					</Form>
				</div>
			</FormAuth>
		</RootLayout>
	);
}
