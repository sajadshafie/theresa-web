import React, { useState, useEffect, createRef } from "react";
//import 'antd/dist/antd.css';
import { Table, Tag, Space, Spin } from "antd";
import style from "../../../styles/admin/main.module.css";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Patienthistory from "./patientHistory";
import Api from "../../../config/API";
const { Column, ColumnGroup } = Table;

export default function patientList({
	dis,
	getHistory,
	getAbortion,
	myHistory,
	getUnderlying,
	removeAbortion,
	editAbortion,
	getProblem,
	dataAbortion,
	removeUnderlying,
	editUnderlying,
	dataUnderlying,
	removeProblem,
	editProblem,
	historyPregnancy,
	dataProblems,
	removeHistory,
	editHistory,
	handleEdit,
	handleEditModal,
	handleRemove,
	patientPage,
	closePatientHistory,
	openPatientHistory,
	patientHistory,
	problemPregnancy,
	handleUnderlying,
	handleAbortion,
	myCategory,
	tableData,
	dataHistory,
	data,
}) {
	const columns = [
		{
			title: "Patient Name",
			dataIndex: "name",
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
		},
		{
			title: "Patient Family",
			dataIndex: "family",
		},
		{
			title: "Age",
			dataIndex: "age",
		},
		{
			title: "Category",
			dataIndex: "categorizepatient_title",
			render: (tags) => (
				<React.Fragment>
					{/* {tags.map((tag) => {
						let color = tag.length > 5 ? 'geekblue' : 'green';
						if (tag === 'High Risk') {
							color = 'volcano';
						}
						return (
							<Tag color={color} key={tag}>
								{tag}
							</Tag>
						);
					})} */}
					{tags === "Normal" ? (
						<Tag color={"geekblue"} key={tags}>
							{tags}
						</Tag>
					) : (
						<Tag color={"volcano"} key={tags}>
							{tags}
						</Tag>
					)}
				</React.Fragment>
			),

			filters: [
				{
					text: "High Risk",
					value: "High risk",
				},
				{
					text: "Normal",
					value: "Normal",
				},
				{
					text: "Pre High Risk",
					value: "Pre-high risks",
				},
			],
			// console.log(record.category.indexOf(value) === 0)
			onFilter: (value, record) =>
				record.categorizepatient_title.indexOf(value) === 0,
		},
		{
			title: "EDC",
			dataIndex: "edc",
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
			title: "cell Phone",
			dataIndex: "mobile",
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
		},
		{
			title: "Action",
			key: "action",
			render: (data, del) => (
				<Space
					style={{ textAlign: "center", zIndex: "3000" }}
					size="middle">
					<a
						style={{ zIndex: "1000000" }}
						onClick={(e) => handleEditModal(data, e)}>
						Edit
					</a>
					<a onClick={(e) => handleRemove(e, data, del)}>Delete</a>
				</Space>
			),
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
		},
	];
	function onChange(pagination, filters, sorter, extra) {
		console.log("params", pagination, filters, sorter, extra);
	}
	console.log(tableData.category);
	const antIcon = (
		<LoadingOutlined style={{ fontSize: 40, color: "#08979C" }} spin />
	);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 3000);
	}, [loading]);
	console.log(myCategory);

	return (
		<div className={`${style.table} patient-list`}>
			{patientPage ? (
				<Patienthistory
					getAbortion={getAbortion}
					getUnderlying={getUnderlying}
					getHistory={getHistory}
					myHistory={myHistory}
					getProblem={getProblem}
					removeAbortion={removeAbortion}
					editAbortion={editAbortion}
					dataAbortion={dataAbortion}
					removeUnderlying={removeUnderlying}
					editUnderlying={editUnderlying}
					dataUnderlying={dataUnderlying}
					removeProblem={removeProblem}
					editProblem={editProblem}
					dataProblems={dataProblems}
					removeHistory={removeHistory}
					editHistory={editHistory}
					dataHistory={dataHistory}
					myCategory={myCategory}
					handleAbortion={handleAbortion}
					handleUnderlying={handleUnderlying}
					problemPregnancy={problemPregnancy}
					historyPregnancy={historyPregnancy}
					patientHistory={patientHistory}
					handleEdit={handleEdit}
					closePatientHistory={closePatientHistory}
				/>
			) : (
				""
			)}
			{!data ? (
				<Spin
					indicator={antIcon}
					style={{ width: "100%", textAlign: "center" }}
				/>
			) : (
				<Table
					columns={columns}
					onChange={onChange}
					onRow={(record, rowIndex) => {
						return {
							onClick: (e) => openPatientHistory(record, e),
						};
					}}
					dataSource={data}
					pagination={{
						position: ["bottomCenter", "bottomCenter"],
						defaultPageSize: 7,
						pageSize: 7,
						total: data && data.length,
					}}
				/>
			)}
		</div>
	);
}
