import React, { useState } from 'react';
import { Menu, Dropdown, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
const { Option } = Select;
let modalProf = false;

export default function searchDrop({ onProcesProfile, onProcessSearch }) {
	const [ val, setVal ] = useState('');
	const [ modal, setModal ] = useState();
	const profileModal = () => {
		setModal(true);
		onProcesProfile(modal);
	};
	const logout = () => {
		console.log('logout');
	};
	const menu = (
		<Menu>
			<Menu.Item onClick={profileModal} style={{ fontSize: '14px' }}>
				Profile
			</Menu.Item>
			<Menu.Item onClick={logout} style={{ fontSize: '14px' }}>
				Sing out
			</Menu.Item>
		</Menu>
	);

	const selectVal = (v) => {
		console.log(v);
		setVal(v);
		onProcessSearch(val);
	};
	console.log(modal);
	return (
		<Dropdown overlay={menu} overlayClassName="dropDown-profile" trigger={[ 'click' ]}>
			<a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
				<DownOutlined style={{ fontSize: '15px' }} />
			</a>
		</Dropdown>
	);
}
