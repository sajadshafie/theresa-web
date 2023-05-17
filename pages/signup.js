import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import { Form, Input, Button, Radio, notification } from "antd";
import {
	AsYouType,
	isValidPhoneNumber,
	parsePhoneNumberFromString,
} from "libphonenumber-js";
import styles from "../styles/auth.module.css";
import RootLayout from "../components/base/rootLayout";
import FormAuth from "../components/base/formAuth";
import API from "../config/API";
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
export default function SignUp() {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [mobile, setMobile] = useState("");
	const [errorMobile, setErrorMobile] = useState(false);
	// const cookies = new Cookie()

	const onPress = () => {
		// document.cookie="forgetnumber=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
		// document.cookie="forgetcode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
		// document.cookie="number=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
		// document.cookie="signupcode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

		console.log(typeof mobile);
		console.log(mobile);
		const phoneNumber = parsePhoneNumberFromString(mobile, "CA");
		console.log(`+16${phoneNumber.nationalNumber}`);
		console.log(phoneNumber);
		console.log(mobile);
		API.signup({ mobile: phoneNumber.nationalNumber })
			.then((res) => {
				setLoading(false);
				console.log(res);
				console.log(res.data.response.code);
				// Router.push("/confirm");
				Router.push({
					pathname: "/confirm",
					query: { pid: "Sign up" },
				});
				const myNumber = phoneNumber.nationalNumber;
				console.log(myNumber);
				localStorage.setItem("signupcode", res.data.response.code);
				localStorage.setItem("number", myNumber);
				localStorage.removeItem("forgetcode");
				// Cookies.set('password',{password:'1111',re_password:'1111'})
			})
			.catch((err) => {
				setLoading(false);
				console.log(err.response.data.message);
				setErrorMobile(true);
				notification.error({
					message: err.response.data.message,
				});
			});
		setErrorMobile(false);

		let errorMode = false;

		let mobileFormat = null;
		if (!phoneNumber || phoneNumber.number.length < 10) {
			errorMode = true;
			setErrorMobile(true);
		} else {
			mobileFormat = phoneNumber.number;
		}

		if (errorMode) {
			return;
		}

		setLoading(true);
		const postData = {
			mobile: mobileFormat,
		};
	};

	return (
		<RootLayout reverseMode title="Teresa" description="Teresa">
			<FormAuth
				title="Sign up"
				description="Please enter your phone"
				bottomText="Already a user? "
				bottomLinkText="Sign in"
				bottomLinkAction="/login"
				marginMode>
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
							disabled={mobile.length < 13}
							loading={loading}
							onClick={() => onPress()}
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
