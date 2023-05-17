import React from "react";
//import 'antd/dist/antd.css';
import { Table, Tag, Space } from "antd";
const { Column, ColumnGroup } = Table;
export default function abortionList({
	editAbortion,
	removeAbortion,
	dataAbortion,
}) {
	console.log(dataAbortion);

	return (
		<Table
			// pagination={{
			// 	position: ["bottomCenter", "bottomCenter"],
			// 	defaultPageSize: 2,
			// 	pageSize: 2,
			// 	total: dataAbortion.length,
			// }}
			pagination={false}
			dataSource={dataAbortion}>
			{/* <Column title="order" dataIndex="" key="" /> */}
			<Column
				title="Child Order"
				dataIndex="childOrder"
				key="childOrder"
				render={(e) => {
					return e;
				}}
			/>
			<Column
				title="Abortion Type"
				dataIndex="abortionType"
				key="abortionType"
				render={(e) => {
					console.log(e);
					if (e == 0) {
						return <Tag color="blue">{"Abortion"}</Tag>;
					} else {
						return <Tag color="error">{"Death"}</Tag>;
					}
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
						<a onClick={(e) => editAbortion(e, record)}>Edit</a>
						<a onClick={(e) => removeAbortion(e, record)}>Delete</a>
					</Space>
				)}
			/>
		</Table>
	);
}
