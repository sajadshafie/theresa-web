import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import Api from "../../../config/API";
const { Column, ColumnGroup } = Table;

export default function historyList({
	dataHistory,
	editHistory,
	removeHistory,
}) {
	console.log(dataHistory);

	return (
		<React.Fragment>
			<Table pagination={false} dataSource={dataHistory}>
				<Column title="Order" dataIndex="childOrder" key="childOrder" />
				{/* <Column
					title="Delivery Type"
					dataIndex="type"
					key="type"
					render={(tags) => (
						<React.Fragment>
							{
								<Tag color="blue" key={tags}>
									{tags}
								</Tag>
							}
						</React.Fragment>
					)}
				/> */}
				<Column
					title="Delivery Type"
					dataIndex="typeOfchildbirth"
					key="typeOfchildbirth"
					render={(e) => {
						if (e == false) {
							return <Tag color="blue">{"Natural"}</Tag>;
						} else {
							return <Tag color="error">{"Cesarean Delivery"}</Tag>;
						}
					}}
				/>
				<Column
					title="Child Sex"
					dataIndex="childSex"
					key="childSex"
					render={(e) => {
						if (e == 0) {
							return "Boy";
						} else {
							return "Girl";
						}
					}}
				/>

				<Column
					title="Child Situation"
					dataIndex="childSituation"
					key="childSituation"
					render={(e) => {
						console.log(e);
						if (e == true) {
							return "Live";
						} else {
							return "Dead";
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
					render={(record) => (
						console.log(record),
						(
							<Space size="middle">
								<a onClick={(e) => editHistory(e, record)}>Edit</a>
								<a onClick={(e) => removeHistory(e, record)}>Delete</a>
							</Space>
						)
					)}
				/>
			</Table>
		</React.Fragment>
	);
}
