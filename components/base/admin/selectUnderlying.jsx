import React from "react";
import { Select } from "antd";
export default function testselect({
	level,
	editListUnderlying,
	handleProblem,
	categoryProblem,
	defaultValProblem,
	underlyingSul,
}) {
	const { Option } = Select;

	return (
		<Select
			// onClick={() => {
			// 	if (dataProblems.problem === 'new1') {
			// 		setModalDiseases(true);
			// 	} else {
			// 		setModalDiseases(false);
			// 	}
			// }}
			//   value={editListProblems.problemName}
			defaultValue={editListUnderlying.underlyingName}
			style={{ width: "100%", height: "40px" }}
			onChange={handleProblem}>
			{level !== "3" && underlyingSul === "add" ? (
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
