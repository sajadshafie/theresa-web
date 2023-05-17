import React from "react";

import { Table, Tag, Space } from "antd";
const { Column, ColumnGroup } = Table;

export default function Underlyinglist({
	removeUnderlying,
	editUnderlying,
	dataUnderlying,
}) {
	console.log(dataUnderlying);
	return (
		<React.Fragment>
			<Table
				pagination={false}
				// pagination={{
				// 	position: ["bottomCenter", "bottomCenter"],
				// 	defaultPageSize: 2,
				// 	pageSize: 2,
				// 	total: dataUnderlying.length,
				// }}
				dataSource={dataUnderlying}>
				<Column
					title="Underlying Disease"
					dataIndex="category_name"
					key="category_name"
				/>
				<Column
					title="Type"
					dataIndex="sub_category_name"
					key="sub_category_name"
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
							<a onClick={(e) => editUnderlying(e, record)}>edit </a>
							<a onClick={(e) => removeUnderlying(e, record)}>Delete</a>
						</Space>
					)}
				/>
			</Table>
		</React.Fragment>
	);
}
