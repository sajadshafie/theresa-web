import { useEffect, useState, createRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { Form, Input, Button, Radio, Row, Col, notification } from "antd";
import Router from "next/router";
import styles from "../styles/auth.module.css";

import RootLayout from "../components/base/rootLayout";

import FormAuth from "../components/base/formAuth";
import Api from "../config/API";
import Cookies from "js-cookie";
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
export default function Confirm() {
	let r1 = createRef();
	let r2 = createRef();
	let r3 = createRef();
	let r4 = createRef();
	let button = createRef();
	// const [cookie,setCookie]=useState(document.cookie.split(";"))
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [c1, setC1] = useState("");
	const [c2, setC2] = useState("");
	const [c3, setC3] = useState("");
	const [c4, setC4] = useState("");
	const [minutes, setMinutes] = useState(2);
	const [seconds, setSeconds] = useState(0);
	const [codeNotSend, setCodeNotSend] = useState(false);

	useEffect(() => {
		// console.log(Router.query.pid);
		console.log(localStorage.getItem("number"));
		console.log(localStorage.getItem("signupcode"));
		let myInterval = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			}
			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(myInterval);
					setCodeNotSend(true);
				} else {
					setMinutes(minutes - 1);
					setSeconds(59);
				}
			}
		}, 1000);
		return () => {
			clearInterval(myInterval);
		};
	});

	const resendCode = () => {
		console.log(localStorage.getItem("number"));
		const number = localStorage.getItem("number");
		if (number) {
			Api.signup({ mobile: number })
				.then((res) => {
					localStorage.setItem("signupcode", res.data.response.code);
					console.log(res);
				})
				.catch((err) => {
					console.log(err.response);
					notification.error({
						message: err.response.data.message,
					});
				});
		} else {
			console.log(localStorage.getItem("number"));
			const forgetnumber = localStorage.getItem("forgetnumber");
			Api.forgetPass({ mobile: forgetnumber })
				.then((res) => {
					console.log(res.data.response.token);
					localStorage.setItem("signupcode", res.data.response.code);
					localStorage.setItem("forgetpasstoken", res.data.response.token);
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
					notification.error({
						message: err.response.data.message,
					});
				});
		}

		setCodeNotSend(false);
		setMinutes(2);
		setSeconds(0);
	};
	const onPress = () => {
		setLoading(true);
		let code = c1 + c2 + c3 + c4;
		console.log(code);
		let forgetNumber = localStorage.getItem("forgetnumber");
		let forgetCode = localStorage.getItem("forgetcode");
		let signupNumber = localStorage.getItem("number");
		let signupCode = localStorage.getItem("signupcode");
		console.log(forgetNumber);
		console.log(signupCode);
		console.log(forgetCode);
		// {mobile:forgetNumber,code:forgetCode === code && forgetCode}

		if (!forgetNumber == null) {
			console.log("ForgetNumber");
			Api.confirmForget({
				mobile: forgetNumber,
				code: forgetCode == code ? forgetCode : "",
			})
				.then((res) => {
					setLoading(false);
					console.log(res);
					Cookies.set("forgettoken", res.data.response.token);
					Router.push("/setauth");
				})
				.catch((err) => {
					setLoading(false);
					console.log(err.response);
					notification.error({
						message: err.response.data.message,
					});
				});
		} else {
			console.log("ConfirmCode");
			Api.confirmCodePass({
				mobile: signupNumber,
				code: signupCode == code ? signupCode : "",
			})
				.then((res) => {
					setLoading(false);
					console.log(res);
					Cookies.set("forgettoken", res.data.response.token);
					Router.push("/setauth");
				})
				.catch((err) => {
					setLoading(false);
					console.log(err);
					notification.error({
						message: err.response.data.message,
					});
				});
		}

		// let code = c1 + c2 + c3 + c4;

		const postData = {
			mobile: "",
			code: "",
		};
	};
	console.log(loading);

	return (
		<RootLayout reverseMode title="Teresa" description="Teresa">
			<FormAuth
				title={Router.query.pid ? Router.query.pid : Router.query.py}
				description="Please enter confirmation code sent to your phone"
				bottomText="You phone is wrong?"
				bottomLinkText="change it here."
				bottomLinkAction="/forgetpass"
				marginMode>
				<Form
					form={form}
					layout="vertical"

					// onValuesChange={onRequiredTypeChange}
					// requiredMark={requiredMark}
				>
					<Input.Group size="large">
						<Row gutter={18} style={{ justifyContent: "center" }}>
							<Col span={3}>
								<Input
									ref={r1}
									maxLength={1}
									onKeyDown={(v) => {
										if (v.key === "Enter") {
											setC1(v.target.value);

											v.target.value.length > 0 &&
												r2.current.focus();
										}
									}}
									onChange={(v) => {
										setC1(v.target.value);

										v.target.value.length > 0 && r2.current.focus();
									}}
									size="large"
									className={styles.textAlignCenter}
									placeholder=""
								/>
							</Col>
							<Col span={3}>
								<Input
									ref={r2}
									maxLength={1}
									onKeyDown={(v) => {
										if (v.key === "Enter") {
											setC2(v.target.value);

											v.target.value.length > 0 &&
												r3.current.focus();
										}
									}}
									onChange={(v) => {
										setC2(v.target.value);
										v.target.value.length > 0 && r3.current.focus();
									}}
									size="large"
									className={styles.textAlignCenter}
									placeholder=""
								/>
							</Col>
							<Col span={3}>
								<Input
									ref={r3}
									maxLength={1}
									onKeyDown={(v) => {
										if (v.key === "Enter") {
											setC3(v.target.value);

											v.target.value.length > 0 &&
												r4.current.focus();
										}
									}}
									onChange={(v) => {
										setC3(v.target.value);
										v.target.value.length > 0 && r4.current.focus();
									}}
									size="large"
									className={styles.textAlignCenter}
									placeholder=""
								/>
							</Col>
							<Col span={3}>
								<Input
									ref={r4}
									maxLength={1}
									onChange={(v) => {
										setC4(v.target.value);
										r4.current.blur();
										button.current.focus();
									}}
									size="large"
									className={styles.textAlignCenter}
									placeholder=""
								/>
							</Col>
						</Row>
					</Input.Group>

					<div className={styles.confirmNotif}>
						{codeNotSend ? (
							<>
								Do not get the code?{" "}
								<span
									style={{ cursor: "pointer" }}
									onClick={() => resendCode()}>
									{" "}
									Resend
								</span>
							</>
						) : (
							<>
								In case of recieving no code, resend in{" "}
								<span>
									{" "}
									{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
								</span>
							</>
						)}
					</div>

					<Form.Item className={styles.centerButton}>
						<Button
							ref={button}
							disabled={
								!(c1.length > 0 && c2.length && c3.length && c4.length)
							}
							loading={loading}
							onClick={() => onPress()}
							size="large"
							type="primary"
							className="buttonDefault">
							Send
						</Button>
					</Form.Item>
				</Form>
			</FormAuth>
		</RootLayout>
	);
}
