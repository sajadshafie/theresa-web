import React from "react";

import { Table, Tag, Space } from "antd";

const { Column, ColumnGroup } = Table;
export default function problemList({
	dataProblems,
	editProblem,
	removeProblem,
}) {
	console.log(dataProblems);
	return (
		<Table
			style={{width:"100%"}}
			pagination={false}
			// pagination={{
			// 	position: ["bottomCenter", "bottomCenter"],
			// 	defaultPageSize: 2,
			// 	pageSize: 2,
			// 	total: dataProblems.length,
			// }}
			dataSource={dataProblems}>
			<Column title="Pregnancy Problem" dataIndex="name" key="name" />
			<Column
				title="Problem Type"
				// dataIndex="sub_category_name"
				//    key="sub_category_name"
				render={(e) => {
					const t = e.sub_category.map((v) => {
						return v.name + ",";
					});
					return (
						<div className='text-overflow'>
							{t}
						</div>
					)
				}}
			/>
			<Column
				title="Description"
				dataIndex="description"
				key="description"
			/>
			<Column
				title="Action"
				key="action"
				render={(text, record) => (
					<Space size="middle">
						<a onClick={(e) => editProblem(e, record)}>Edit</a>
						<a onClick={(e) => removeProblem(e, record)}>Delete</a>
					</Space>
				)}
			/>
		</Table>
	);
}
