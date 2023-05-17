import React from 'react';
//import 'antd/dist/antd.css';
import { Table, Tag, Space } from 'antd';

const { Column, ColumnGroup } = Table;
export default function problemList({ dataProblems, editProblem, removeProblem }) {
	console.log(dataProblems);
	return (
		<Table
			pagination={false}
			// pagination={{
			// 	position: ["bottomCenter", "bottomCenter"],
			// 	defaultPageSize: 2,
			// 	pageSize: 2,
			// 	total: dataProblems.length,
			// }}
			dataSource={dataProblems}
		>
			<Column title="Pregnancy Problem" dataIndex="category_name" key="category_name" />
			<Column title="Problem Type" dataIndex="sub_category_name" key="sub_category_name" />
			<Column title="Description" dataIndex="description" key="description" />
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
