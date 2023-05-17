import React, { useEffect, useState } from 'react';
import style from '../../../../styles/admin/profile.module.css';
import { EditOutlined, PhoneFilled, MailFilled, LoadingOutlined } from '@ant-design/icons';
import FormModal from './formProfile';
import { Button, Spin, notification } from 'antd';
import FormPass from './formPass';
import Api from '../../../../config/API';
import Router from 'next/router';
export default function historyProfile({ closeModal }) {
	const [ data, setData ] = useState();
	const [ form, setForm ] = useState(false);
	const [ edit, setEdit ] = useState({
		email: '',
		family: '',
		name: '',
		medical_professions: '',
		medical_system_no: '',
		mobile: '',
		work_experience: ''
	});
	const [ submitLoad, setSubmitLoad ] = useState(false);
	const [ loadPass, setLoadPass ] = useState(false);
	const [ formPass, setFormPass ] = useState(false);
	const editData = (d) => {
		const data = {
			...edit,
			email: d.email,
			family: d.family,
			name: d.name,
			medical_professions: d.medical_professions,
			medical_system_no: d.medical_system_no,
			mobile: d.mobile,
			work_experience: d.work_experience
		};
		setEdit(data);
	};
	const openProfileModal = () => {
		setForm(true);
		console.log(data);
		editData(data);
	};
	const handleCloseModal = () => {
		setForm(false);
		// Router.push('/admin/home');
		console.log(window.history.go(-1));
	};
	const changePassMode = () => {
		console.log('click');
		setFormPass(true);
		setForm(false);
	};
	const handleCloseModalPass = () => {
		setFormPass(false);
	};
	const getProfile = () => {
		Api.profileList()
			.then((res) => {
				console.log(res);
				setData(res.data.response);
			})
			.catch((err) => {
				console.log(err.response);
			});
	};
	useEffect(() => {
		getProfile();
		const d = new Date();
		const x = d.getFullYear();
		let check = data && data.work_experience;
		// let test = x - check;
		console.log(x);
		console.log(check);
	}, []);
	const processData = (d) => {
		console.log(d);
		setSubmitLoad(true);
		Api.updateProfile({
			name: d.name,
			family: d.family,
			email: d.email,
			work_experience: d.work,
			medical_system_no: d.medical,
			medical_professions: d.medical2
		})
			.then((res) => {
				notification.success({
					message: res.data.message
				});
				console.log(res);
				setSubmitLoad(false);
				setForm(false);
				getProfile();
			})
			.catch((err) => {
				setSubmitLoad(false);
				console.log(err.response);
				notification.error({
					message: err.response.data.message
				});
			});
	};
	console.log(data);
	const onProcessPass = (d) => {
		setLoadPass(true);
		console.log(d);
		Api.changePassProfile({
			previous_password: d.oldPass,
			new_password: d.newPass,
			re_password: d.rePass
		})
			.then((res) => {
				console.log(res);
				setLoadPass(false);
				setFormPass(false);
			})
			.catch((err) => {
				setLoadPass(false);
				console.log(err.response);
				notification.error({
					message: err.response.data.message
				});
			});
	};
	const myDate = () => {
		const dateUser = parseInt(data.work_experience);
		const x = new Date();
		const y = x.getFullYear();
		const f = y - dateUser;
		const g = f.toString();
		const t = g + 'Years';
		return t;
	};
	return (
		<div className={style.prof}>
			{form ? (
				<FormModal
					submitLoad={submitLoad}
					processData={processData}
					handleCloseModal={handleCloseModal}
					edit={edit}
				/>
			) : (
				<div className={style.showProfile}>
					<div className={style.headerProfiel}>
						<img className={style.bgImg} src="/img/profile/Rectangle 307.svg" alt="" />
						<div className={style.lableProfiel}>
							<span className={style.labelTxt}>Profile</span>
						</div>
						<div className={style.actionProfile}>
							<span onClick={openProfileModal} className={style.editProfile}>
								Edit
								<EditOutlined />
							</span>

							<div className={style.lineVertical} />
							<span onClick={closeModal} className={style.closeProfile}>
								Close
							</span>
						</div>
					</div>
					{!data ? (
						<LoadingOutlined style={{ fontSize: 40, width: '100%', textAlign: 'center' }} spin />
					) : (
						<React.Fragment>
							<h1 className={style.nameProfile}>
								<span>{data.name ? data.name : 'Not Specified'}</span>
								<span className={style.PlFamily}>{data.family ? data.family : ''}</span>
							</h1>
							<div className={style.info}>
								<div className={style.infoLeft}>
									<div className={style.infoLeft1}>
										<div className={style.infoEmail}>
											<MailFilled />
											{data.email ? data.email : 'Not Specified'}
										</div>
										<div className={style.lineInfo} />
										<div className={style.inifoNumber}>
											<PhoneFilled />
											{data.mobile ? data.mobile : 'Not Specified'}
										</div>
									</div>
									<div className={style.passwordProfile}>
										<span className={style.txtPass}>Password</span>
									</div>
								</div>
								<div className={style.infoRight}>
									<div className={style.infoLeft2}>
										<div className={style.medicalInfo1}>
											<div className={style.medical1}>
												Medical No.:
												{data.medical_system_no ? data.medical_system_no : 'Not Specified'}
											</div>
											<div className={style.lineInfo} />
											<div className={style.medical2}>
												Medical Profession:
												{data.medical_professions ? data.medical_professions : 'Not Specified'}
											</div>
										</div>
										<div className={style.pass}>
											<div className={style.textPassword}>You can change your password here.</div>
											<Button
												style={{ color: '#08979C', border: '1px solid #08979C' }}
												onClick={changePassMode}
											>
												Change Password
											</Button>
										</div>
									</div>

									<div className={style.passwordManage} />
									<div />
								</div>
								<div className={style.infoLeft3}>
									<span>Work Experience: {data.work_experience ? myDate() : 'Not Specified'}</span>
								</div>
							</div>
						</React.Fragment>
					)}
				</div>
			)}
			{formPass && (
				<FormPass
					onProcessPass={onProcessPass}
					loadPass={loadPass}
					handleCloseModalPass={handleCloseModalPass}
				/>
			)}
		</div>
	);
}
