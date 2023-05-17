import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Form, Input, Button, Radio, notification } from "antd";
import Router from "next/router";
import {
	AsYouType,
	isValidPhoneNumber,
	parsePhoneNumberFromString,
} from "libphonenumber-js";
import styles from "../styles/auth.module.css";

import RootLayout from "../components/base/rootLayout";
import Api from "../config/API";
import FormAuth from "../components/base/formAuth";
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
export default function ForgetPass() {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const [mobile, setMobile] = useState("");
	const [errorMobile, setErrorMobile] = useState(false);

	const onPress = () => {
		// document.cookie="forgetnumber=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
		// document.cookie="forgetcode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
		document.cookie =
			"number=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		document.cookie =
			"signupcode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		setErrorMobile(false);

		let errorMode = false;

		const phoneNumber = parsePhoneNumberFromString(mobile, "CA");
		console.log(phoneNumber);
		let mobileFormat = null;
		if (!phoneNumber || phoneNumber.number.length < 10) {
			errorMode = true;
			setErrorMobile(true);
		} else {
			mobileFormat = phoneNumber.number;
			Api.forgetPass({ mobile: phoneNumber.nationalNumber })
				.then((res) => {
					const code = res.data.response.code;
					localStorage.setItem("forgetcode", code);
					localStorage.setItem("forgetnumber", phoneNumber.nationalNumber);
					localStorage.removeItem("signupcode");
					// Router.push("/confirm");
					Router.push({
						pathname: "/confirm",
						query: { py: "Forget Password" },
					});
					console.log(res);
					console.log(number);
					console.log(code);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err.response);
					setLoading(false);
				});
		}

		if (errorMode) {
			return;
		}
		setLoading(true);
		const postData = {
			mobile: mobileFormat,
		};
		// Router.push("/confirm");
	};
	return (
		<RootLayout reverseMode title="Teresa" description="Teresa">
			<FormAuth
				title="Forget Password"
				description="Please enter your phone"
				bottomText="Already a user? "
				bottomLinkText="Sign in"
				bottomLinkAction="/login"
				marginMode>
				<Form
					onFinish={onPress}
					form={form}
					layout="vertical"

					// onValuesChange={onRequiredTypeChange}
					// requiredMark={requiredMark}
				>
					<Form.Item
						label="Phone"
						required
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

					<Form.Item className={styles.centerButton}>
						<Button
							disabled={mobile.length < 14}
							loading={loading}
							htmlType="submit"
							size="large"
							type="primary"
							className="buttonDefault">
							Next
						</Button>
					</Form.Item>
				</Form>
			</FormAuth>
		</RootLayout>
	);
}
