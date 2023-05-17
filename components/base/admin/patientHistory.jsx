import React, { useState, useEffect } from "react";
import style from "../../../styles/admin/main.module.css";
import Historylist from "./historyList";
import Problemlist from "./problemList";
import Underlyinglist from "./underlyingList";
import Abortionlist from "./abortionList";
import API from "../../../config/API";
import { Switch, Button } from "antd";
import {
	EditOutlined,
	CalendarOutlined,
	PhoneFilled,
	MobileFilled,
	PlusOutlined,
	ControlOutlined,
} from "@ant-design/icons";
export default function patient({
	removeAbortion,
	editAbortion,
	dataAbortion,
	getUnderlying,
	getProblem,
	getHistory,
	getAbortion,
	removeUnderlying,
	editUnderlying,
	dataUnderlying,
	removeProblem,
	editProblem,
	closePatientHistory,
	dataProblems,
	handleEdit,
	removeHistory,
	patientHistory,
	historyPregnancy,
	problemPregnancy,
	handleUnderlying,
	editHistory,
	handleAbortion,
	dataHistory,
}) {
	const [patientData, setPatientData] = useState({
		noca: patientHistory.numberOfLiveChildren,
		firstname: patientHistory.name,
		lastname: patientHistory.family,
		cellPhone: patientHistory.mobile,
		telephone: patientHistory.telephone,
		age: patientHistory.age,
		myCategory: patientHistory.myCategory,
		date: patientHistory.edc,
		multi: patientHistory.multiplePregnancy,
		category: patientHistory.categorizepatient_title,
		questions: JSON.parse(patientHistory.generalquestions).map((v) => {
			return {
				name: v.title,
				value: v.id,
				active: v.value,
			};
		}),
		address: patientHistory.address,
		description: patientHistory.description,
		image: "",
	});

	console.log(patientData.multi);
	console.log(patientHistory);

	useEffect(() => {
		console.log(patientHistory);
		console.log(patientHistory.patient_id);
		getHistory(patientHistory.patient_id);
		getProblem(patientHistory.patient_id);
		getUnderlying(patientHistory.patient_id);
		getAbortion(patientHistory.patient_id);
	}, []);

	return (
		<React.Fragment>
			<div className={style.viewPatientContainer}>
				<div className={style.viewPatientTitle}>
					<button className={style.titleBtn}>View Patient</button>
					<div className={style.titleTxt}>
						<p
							onClick={() => handleEdit(patientHistory)}
							className={style.editViewPatient}>
							<EditOutlined />
							Edit
						</p>
						<div className={style.verticalLine} />
						<p
							className={style.closeHistory}
							onClick={closePatientHistory}>
							close
						</p>
					</div>
				</div>
				<div className={style.dataPatient}>
					<div className={style.patientInformation}>
						<h3 className={style.txtTitlePatient}>Patient Information</h3>
						<div className={style.userInfo}>
							<h1 className={style.namePatient}>
								{patientData.firstname} {patientData.lastname}
							</h1>
							<div className={style.verticalLine} />
							<h2 className={style.agePatient}>
								{patientData.age} Years
							</h2>
						</div>
						<div className={style.calendarPatient}>
							{patientData.category === "Normal" ? (
								<p className={style.statusPatient}>
									{patientData.category}
								</p>
							) : (
								<p className={style.statusPatientHighRisk}>
									{patientData.category}
								</p>
							)}
							<span className={style.multiHistory}>
								Multi Pregnancy (
								{patientData.multi && patientData.multi.length === 0
									? "0"
									: patientData.multi}
								)
							</span>
							<div className={style.verticalLine} />
							<CalendarOutlined />
							<span>Due Date</span>
							<span> {patientData.date}</span>
						</div>
						<p className={style.addressPatient}>{patientData.address}</p>
						<div className={style.tellPatient}>
							<div className={style.phonePatient}>
								<PhoneFilled />
								<span>{patientData.telephone}</span>
							</div>
							<div className={style.verticalLine} />
							<div className={style.mobPatient}>
								<MobileFilled />
								<span>{patientData.cellPhone}</span>
							</div>
						</div>
						<p className={style.patientDes}>{patientData.description}</p>
					</div>
					<div className={style.generalQuestionPatient}>
						<h3 className={style.txtTitlePatient}>General Information</h3>
						<div className={style.switchOn}>
							{/* <div className={style.switchOnLeft}> */}
							{patientData.questions.map((v) => {
								return (
									<div className={`${style.switchBox} switch`}>
										<p className={style.txtQuestion}>{v.name}</p>
										<Switch
											disabled={true}
											defaultChecked={v.active}
										/>
									</div>
								);
							})}
							{/* <div className={`${style.switchBox} switch`}>
									<p>Drinking Alchohol</p>
									<Switch disabled={true} defaultChecked={patientData.DrinkingAlchohol} />
								</div>
								<div className={`${style.switchBox} switch`}>
									<p>Using Drugs</p>
									<Switch
										disabled={true}
										// defaultChecked={patientData.UsingDrugs}
									/>
								</div> */}
							{/* </div> */}
							{/* <div className={style.switchOnRight}>
								<div className={`${style.switchBox} switch`}>
									<p>Single Mom</p>
									<Switch
										disabled={true}
										// defaultChecked={patientData.SingleMom}
									/>
								</div>
								<div className={`${style.switchBox} switch`}>
									<p>Using Special Pills</p>
									<Switch
										disabled={true}
										// defaultChecked={patientData.UsingSpecialPills}
									/>
								</div>
							</div> */}
						</div>
					</div>
				</div>
				<div className={style.problemPatinet}>
					<div className={style.problem}>
						<div className={style.history}>
							<h2>Pregnancy History</h2>
							<div className={style.lineProblem} />
							<button
								onClick={historyPregnancy}
								className={style.btnAddProblem}>
								<span>+</span>
								<span>Add</span>
							</button>
						</div>
					</div>
					{dataHistory && dataHistory.length < 1 ? (
						<p>
							There is no history entry for this patient. To add new one
							click on “+ Add” button.
						</p>
					) : (
						<Historylist
							removeHistory={removeHistory}
							editHistory={editHistory}
							dataHistory={dataHistory}
						/>
					)}
					<div className={style.problem}>
						<div className={style.history}>
							<h2>Pregnancy Problems</h2>
							<div className={style.lineProblem} />
							<button
								onClick={problemPregnancy}
								className={style.btnAddProblem}>
								<span>+</span>
								<span>Add</span>
							</button>
						</div>
					</div>
					{dataProblems && dataProblems.length < 1 ? (
						<p>
							There is no problem entry for this patient. To add new one
							click on “+ Add” button.
						</p>
					) : (
						<Problemlist
							removeProblem={removeProblem}
							editProblem={editProblem}
							dataProblems={dataProblems}
						/>
					)}
					<div className={style.problem}>
						<div className={style.history}>
							<h2 className={style.titleProblem}>Underlying Diseases</h2>
							<div className={style.lineProblem} />
							<button
								onClick={handleUnderlying}
								className={style.btnAddProblem}>
								<span>+</span>
								<span>Add</span>
							</button>
						</div>
					</div>
					{dataUnderlying && dataUnderlying.length < 1 ? (
						<p>
							There is no history entry for this patient. To add new one
							click on “+ Add” button.
						</p>
					) : (
						<Underlyinglist
							editUnderlying={editUnderlying}
							removeUnderlying={removeUnderlying}
							dataUnderlying={dataUnderlying}
						/>
					)}
					<div className={style.problem}>
						<div className={style.history}>
							<h2 className={style.titleProblemAbortion}>Abortion</h2>
							<div className={style.lineProblemAbortion} />
							<button
								onClick={handleAbortion}
								className={style.btnAddProblem}>
								<span>+</span>
								<span>Add</span>
							</button>
						</div>
					</div>
					{dataAbortion && dataAbortion.length < 1 ? (
						<p>
							There is no history entry for this patient. To add new one
							click on “+ Add” button.
						</p>
					) : (
						<Abortionlist
							removeAbortion={removeAbortion}
							editAbortion={editAbortion}
							dataAbortion={dataAbortion}
						/>
					)}
				</div>
			</div>
			{/* </div>
			</div> */}
		</React.Fragment>
	);
}
