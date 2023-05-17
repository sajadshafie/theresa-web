import React, { useState } from 'react';
import { Tabs, Button, Divider, Checkbox } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import style from '../../../styles/admin/main.module.css';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Api from '../../../config/API';
const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;
export default function header({ name = 'Jane Smith', image, arrowIcon, titleName }) {
	return (
		<header className={style.adminHeader}>
			<div className={style.navItem}>
				<Layout style={{ height: '100%' }} theme="light">
					<Header theme="light" style={{ padding: 0, height: '100%' }}>
						<div className="logo" theme="light" />
						<Menu
							className="header-menu"
							style={{ height: '99px' }}
							theme="light"
							mode="horizontal"
							defaultSelectedKeys={[ '1' ]}
							triggerSubMenuAction="click"
						>
							<Menu.Item key="1" style={{ height: '100%', color: '#D9D9D9' }}>
								<span className={style.headerMenuItem}>{titleName}</span>
							</Menu.Item>
						</Menu>
					</Header>
				</Layout>
			</div>
			<div className={style.adminProfile}>
				{/* <SearchOutlined
					style={{
						fontSize: "20px",
						padding: "7px 15px",
						color: "#E0E0E0",
						borderRight: "1px solid #E0E0E0",
					}}
				/> */}
				<div className={style.adminProfileData}>
					<p className={style.name}>{name}</p>
					{image}
					{arrowIcon}
				</div>
			</div>
		</header>
	);
}
