import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Form, Input, Button, Radio, notification } from "antd";
import {
	AsYouType,
	isValidPhoneNumber,
	parsePhoneNumberFromString,
} from "libphonenumber-js";
import Cookies from "js-cookie";
import styles from "../styles/auth.module.css";
// import Context from '../components/base/admin/context'
import RootLayout from "../components/base/rootLayout";
import Router from "next/router";
import FormAuth from "../components/base/formAuth";
import Link from "next/link";
import API from "../config/API";
import config from "../config/global";
import Modal from "../components/base/authModal";

// export async function getServerSideProps(context) {
// 	// const res = await fetch(`https://...`)
// 	const test = true;
// 	const cookies = context.req.headers.cookie;
// 	if (cookies && cookies.includes("patienttoken")) {
// 		return {
// 			redirect: {
// 				destination: "/admin/home",
// 				permanent: false,
// 			},
// 		};
// 	}

// 	return {
// 		props: {
// 			data: cookies ? cookies : null,
// 		}, // will be passed to the page component as props
// 	};
// }

export default function Login() {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [mobile, setMobile] = useState("");
	const [errorMobile, setErrorMobile] = useState(false);
	const [errorPassword, setErrorPassword] = useState(false);
	const [password, setPassword] = useState("");

	const [modal, setModal] = useState(false);
	// const {cotextData,dispatch} = useContext(context)
	const onPress = () => {
		setErrorMobile(false);
		setErrorPassword(false);

		let errorMode = false;

		const phoneNumber = parsePhoneNumberFromString(mobile, "CA");

		let mobileFormat = null;
		if (!phoneNumber || phoneNumber.number.length < 10) {
			errorMode = true;
			setErrorMobile(true);
		} else {
			mobileFormat = phoneNumber.number;
		}

		if (password.length < 4) {
			errorMode = true;
			setErrorPassword(true);
		}

		if (errorMode) {
			return;
		} else {
			const signInNumber = phoneNumber.nationalNumber;
			API.login({ mobile: signInNumber, password: password })
				.then((res) => {
					console.log(res);
					setLoading(false);
					Cookies.set("patienttoken", res.data.response.token);
					config.udata = res.data.response.token;
					// Router.push("/admin/home");
					Router.push("/admin/home");
					// dispatch({
					// 	type:'sssss',
					// 	currentStep:'current'
					// })
					localStorage.setItem("level", res.data.response.levelmanage);
				})
				.catch((err) => {
					setLoading(false);
					errorMode = true;
					console.log(err);
					if (err.response) {
						notification.error({
							message: err.response.data.message,
						});
					}
				});
		}

		// console.log(res.data.response.token)

		setLoading(true);
		const postData = {
			mobile: mobileFormat,
			password,
		};
		console.log(postData);
	};
	console.log(mobile);

	const handlePass = (e) => {
		setPassword(e.target.value);
	};

	// console.log('hello')
	return (
		<RootLayout title="Teresa" description="Teresa">
			{/* {modal && <Modal />} */}
			{/* <Modal/> */}
			<FormAuth
				bottomLinkAction="/signup"
				description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
      nonummy nibh euismod tincidunt">
				<Form
					form={form}
					layout="vertical"

					// onValuesChange={onRequiredTypeChange}
					// requiredMark={requiredMark}
				>
					<Form.Item
						label="Phone"
						required
						hasFeedback={errorMobile}
						validateStatus={errorMobile ? "error" : ""}
						rules={[
							{
								required: true,
								message: errorMobile
									? "Please input your PhoneNumber!"
									: "",
							},
						]}
						// tooltip="This is a required field"
					>
						<Input
							size="large"
							value={mobile}
							onChange={(v) => {
								const phoneNumber = parsePhoneNumberFromString(
									v.target.value,
									"CA"
								);
								if (phoneNumber) {
									if (phoneNumber.nationalNumber.length > 10) {
										return;
									}
								}

								setMobile(new AsYouType("CA").input(v.target.value));
							}}
							placeholder=""
						/>
					</Form.Item>
					<Form.Item
						required
						hasFeedback={errorPassword}
						validateStatus={errorPassword ? "error" : ""}
						rules={[
							{
								required: true,
								message: errorPassword ? "password not valid!" : "",
							},
						]}
						label="Password"
						// tooltip="At Least 5 Characters"
					>
						<Input
							// onKeyPress={(e)=>{
							// 	if(e.keyCode ===13){
							// 		onPress();
							// 	}
							// }}
							onChange={handlePass}
							type="password"
							size="large"
							placeholder=""
						/>
					</Form.Item>
					<Form.Item>
						<Link href="/forgetpass">
							<a href="">Forgot password?</a>
						</Link>
					</Form.Item>

					<Form.Item className={styles.centerButton}>
						<Button
							loading={loading}
							onClick={() => onPress()}
							size="large"
							type="primary"
							className="buttonDefault">
							Sign in
						</Button>
					</Form.Item>
				</Form>
			</FormAuth>
		</RootLayout>
	);
}
