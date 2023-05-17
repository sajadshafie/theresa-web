import React, { useEffect, useState } from 'react';
import Main from '../../components/base/admin/main';
import Image from 'next/image';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import style from '../../styles/admin/profile.module.css';
import Drop from '../../components/base/admin/dropDown';
import Showprofile from '../../components/base/admin/profile/historyProfile';
import Api from '../../config/API';
import Cookies from 'js-cookie';
import Router from 'next/router';
import Config from '../../config/global';
import router from 'next/router';
import { Popover } from 'antd';
export async function getServerSideProps(context) {
	// const res = await fetch(`https://...`)
	const test = true;
	const cookies = context.req.headers.cookie;
	if ((cookies && !cookies.includes('patienttoken')) || cookies == undefined) {
		return {
			redirect: {
				destination: '/login',
				permanent: false
			}
		};
	}

	return {
		props: {
			data: cookies ? cookies : null
		} // will be passed to the page component as props
	};
}
export default function profile(props) {
	const [ openModal, setOpenModal ] = useState();
	const [ data, setData ] = useState();
	const onProcesProfile = () => {
		setOpenModal(true);
	};
	console.log(props.data);
	const closeModal = () => {
		console.log('hello');
		setOpenModal(false);
		window.history.go(-1);
	};
	const logout = () => {
		console.log(Cookies.get('patienttoken'));

		Api.logout()
			.then((res) => {
				console.log(res);
				Router.push('/login');
				document.cookie = 'patienttoken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
				Cookies.remove('patienttoken', { path: '' });
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const [ name, setName ] = useState('');
	const [ lastname, setLastname ] = useState('');
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
		getName();
	}, []);
	return (
		<Main
			titleName="Profile"
			name={name == null || lastname == null ? '' : `${name} ${lastname}`}
			image={
				<UserOutlined
					onClick={() => {
						Router.push('/admin/profile');
					}}
					style={{ cursor: 'pointer', fontSize: '30px' }}
				/>
			}
			arrowIcon={
				<Dropdown
					overlay={
						<Menu>
							<Menu.Item onClick={onProcesProfile} style={{ fontSize: '14px' }}>
								Profile
							</Menu.Item>
							<Menu.Item onClick={logout} style={{ fontSize: '14px' }}>
								Sing out
							</Menu.Item>
						</Menu>
					}
					overlayClassName="dropDown-profile"
					trigger={[ 'click' ]}
				>
					<a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
						<DownOutlined style={{ fontSize: '15px', color: 'black' }} />
					</a>
				</Dropdown>
			}
		>
			{openModal ? '' : ''}
			<Showprofile closeModal={closeModal} />
		</Main>
	);
}
