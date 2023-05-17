import React from "react";
import { Select } from "antd";
import { useEffect } from "react";
export default function testselect({
	ref,
	level,
	editListProblems,
	handleProblem,
	categoryProblem,
	defaultValProblem,
	formItem1,
	addProblemSul,
}) {
	useEffect(() => {}, []);
	const { Option } = Select;

	console.log(editListProblems);
	console.log(formItem1);
	return (
		<Select
			allowClear={true}
			onClick={() => {
				console.log(formItem1);
				console.log(editListProblems);
			}}
			defaultValue={editListProblems.problemName}
			style={{ width: "100%", height: "40px" }}
			onChange={handleProblem}>
			{level !== "3" && addProblemSul === "add" ? (
				<Option value="new1" style={{ color: "#08979C" }}>
					+ Add a New Problem
				</Option>
			) : (
				""
			)}
			{categoryProblem &&
				categoryProblem.map((i) => {
					return <Option value={i.id}>{i.name}</Option>;
				})}
		</Select>
	);
}
