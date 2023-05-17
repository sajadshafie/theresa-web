import React from 'react';
import { Table, Tag, Space } from 'antd';
import AssisHistory from './assisHistory';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
export default function assistantList({
	handleRemoveHistory,
	asis,
	assisHistory,
	handleRemove,
	openHistory,
	closeHistory,
	handleEditModal,
	assistantDataHistory,
	editHistory
}) {
	const data = asis;
	console.log(data);
	const antIcon = <LoadingOutlined style={{ fontSize: 40, color: '#08979C' }} spin />;
	const { Column, ColumnGroup } = Table;
	const columns = [
		{
			title: 'Assistant Name',
			dataIndex: 'name'
			//   filters: [
			// 	{
			// 	  text: 'Joe',
			// 	  value: 'Joe',
			// 	},
			// 	{
			// 	  text: 'Jim',
			// 	  value: 'Jim',
			// 	},
			// 	{
			// 	  text: 'Submenu',
			// 	  value: 'Submenu',
			// 	  children: [
			// 		{
			// 		  text: 'Green',
			// 		  value: 'Green',
			// 		},
			// 		{
			// 		  text: 'Black',
			// 		  value: 'Black',
			// 		},
			// 	  ],
			// 	},
			//   ],
			// specify the condition of filtering result
			// here is that finding the name started with `value`
			//   onFilter: (value, record) => record.name.indexOf(value) === 0,
			//   sorter: (a, b) => a.name.length - b.name.length,
			//   sortDirections: ['descend'],

			// filters: [
			// 	{
			// 		text: 'High Risk',
			// 		value: 'High Risk'
			// 	},
			// 	{
			// 		text: 'Normal',
			// 		value: 'Normal'
			// 	}
			// ]
			// console.log(record.category.indexOf(value) === 0)
			// onFilter: (value, record) => record.category.indexOf(value) === 0
		},
		{
			title: 'Assistant Family',
			dataIndex: 'family'
		},
		{
			title: 'Email',
			dataIndex: 'email'
			// sorter: (a, b) => a.lastName.length - b.lastName.length,
			// sortDirections: [ 'descend' ]
		},
		{
			title: 'Cell Phone',
			dataIndex: 'mobile'
		},
		// {
		// 	title: 'Password',
		// 	key: 'action',
		// 	dataIndex: 'password',
		// 	render: (data, del) => (
		// 		<Space style={{ textAlign: 'center', zIndex: '3000' }} size="middle">
		// 			<a style={{ zIndex: '1000000' }} onClick={(e) => handleEditModal(data, e)}>
		// 				Reset
		// 			</a>
		// 		</Space>
		// 	)
		// 	// console.log(record.category.indexOf(value) === 0)
		// 	// onFilter: (value, record) => record.category.indexOf(value) === 0
		// },
		{
			title: 'Description',
			dataIndex: 'description'
			// filters: [
			// 	{
			// 		text: 'London',
			// 		value: 'London'
			// 	},
			// 	{
			// 		text: 'New York',
			// 		value: 'New York'
			// 	}
			// ],
			// onFilter: (value, record) => record.address.indexOf(value) === 0
		},
		{
			title: 'Action',
			key: 'action',
			render: (data, del) => (
				<Space style={{ textAlign: 'center', zIndex: '3000' }} size="middle">
					<a style={{ zIndex: '1000000' }} onClick={(e) => handleEditModal(e, data)}>
						Edit
					</a>
					<a onClick={(e) => handleRemove(e, data)}>Delete</a>
				</Space>
			)
			// filters: [
			//   {
			// 	text: 'London',
			// 	value: 'London',
			//   },
			//   {
			// 	text: 'New York',
			// 	value: 'New York',
			//   },
			// ],
			// onFilter: (value, record) => record.address.indexOf(value) === 0,
		}
	];
	// <Spin
	// 				indicator={antIcon}
	// 				style={{ width: "100%", textAlign: "center" }}
	// 			/>
	return (
		<React.Fragment>
			{openHistory && (
				<AssisHistory
					handleRemoveHistory={handleRemoveHistory}
					handleRemove={handleRemove}
					editHistory={editHistory}
					assisHistory={assisHistory}
					data={asis}
					closeHistory={closeHistory}
				/>
			)}
			{!data ? (
				<Spin indicator={antIcon} style={{ width: '100%', textAlign: 'center' }} />
			) : (
				<Table
					columns={columns}
					// onChange={onChange}
					// onRow={(record, rowIndex) => {
					// 	return {
					// 		onClick: (e) => openPatientHistory(record, e)
					// 	};
					// }}
					onRow={(record, rowIndex) => {
						return {
							onClick: (e) => assistantDataHistory(e, record)
						};
					}}
					dataSource={data}
					pagination={{
						position: [ 'bottomCenter', 'bottomCenter' ],
						defaultPageSize: 7,
						pageSize: 7,
						total: data && data.length
					}}
				/>
			)}
		</React.Fragment>
	);
}
