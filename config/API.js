import Config from "./global.js";

export default {
	signup: (data) => {
		return Config.axiosHandle().post(
			"https://dev.teresai.com/api/v0/admin/send-code",
			data
		);
	},

	setAuth: (data) => {
		return Config.axiosHandle().post(
			"https://dev.teresai.com/api/v0/admin/sign-up",
			data
		);
	},
	login: (data) => {
		return Config.axiosHandle().post(
			"https://dev.teresai.com/api/v0/admin/sign-in",
			data
		);
	},
	forgetPass: (data) => {
		return Config.axiosHandle().post(
			"https://dev.teresai.com/api/v0/admin/forget-password/send-code",
			data
		);
	},
	confirmForget: (data) => {
		return Config.axiosHandle().post(
			"https://dev.teresai.com/api/v0/admin/forget-password/confirmation-code",
			data
		);
	},
	confirmCodePass: (data) => {
		return Config.axiosHandle().post(
			"https://dev.teresai.com/api/v0/admin/confirmation-code",
			data
		);
	},

	forgetChangePass: (data) => {
		return Config.axiosHandle().post(
			"https://dev.teresai.com/api/v0/admin/forget-password/change-password",
			data
		);
	},
	editPatientList: (data, id, token) => {
		return Config.axiosHandle().post(
			`https://dev.teresai.com/api/v0/admin/patient/update${id}`,
			data
		);
	},
	patientList: (data) => {
		return Config.axiosHandle().get(
			"https://dev.teresai.com/api/v0/admin/patient/show-list",
			data
		);
	},
	addNewPatient: (data) => {
		return Config.axiosHandle().post(
			"https://dev.teresai.com/api/v0/admin/patient/create",
			data
		);
	},
	deletePatient: (id) => {
		return Config.axiosHandle().get(
			`https://dev.teresai.com/api/v0/admin/patient/delete/${id}`
		);
	},
	searchPatient: (data) => {
		return Config.axiosHandle().get(
			"https://dev.teresai.com/api/v0/admin/patient/show-list",
			data
		);
	},
	addProblemHistory: (data) => {
		return Config.axiosHandle().post(
			"https://dev.teresai.com/api/v0/admin/pregnancy/history/create",
			data
		);
	},
	addPregnancyProblems: (data) => {
		return Config.axiosHandle().post(
			"https://dev.teresai.com/api/v0/admin/pregnancy/problem/create",
			data
		);
	},
	problemHistoryList: (data) => {
		return Config.axiosHandle().get(
			"https://dev.teresai.com/api/v0/admin/pregnancy/history/show",
			data
		);
	},
	deleteProblemHistory: (id) => {
		return Config.axiosHandle().get(
			`https://dev.teresai.com/api/v0/admin/pregnancy/history/delete/${id}`
		);
	},
	updateProblemHistory: (data, id) => {
		return Config.axiosHandle().post(
			`https://dev.teresai.com/api/v0/admin/pregnancy/history/update/${id}`,
			data
		);
	},
	problemPregnancyProblemList: (data) => {
		return Config.axiosHandle().get(
			"https://dev.teresai.com/api/v0/admin/pregnancy/problem/show",
			data
		);
	},
	addProblemPregnancyProblem: (data) => {
		return Config.axiosHandle().post(
			"https://dev.teresai.com/api/v0/admin/pregnancy/problem/create",
			data
		);
	},
	deleteProblemPregnancyProblem: (id) => {
		return Config.axiosHandle().get(
			`https://dev.teresai.com/api/v0/admin/pregnancy/problem/delete/${id}`
		);
	},
	updateProblemPregnancyProblem: (data, id) => {
		return Config.axiosHandle().post(
			`https://dev.teresai.com/api/v0/admin/pregnancy/problem/update/${id}`,
			data
		);
	},
	problemUnderlyingList: (data) => {
		return Config.axiosHandle().get(
			"https://dev.teresai.com/api/v0/admin/patient/diseases/show",
			data
		);
	},
	addProblemUnderlying: (data) => {
		return Config.axiosHandle().post(
			"https://dev.teresai.com/api/v0/admin/patient/diseases/create/",
			data
		);
	},
	deleteProblemUnderlying: (id) => {
		return Config.axiosHandle().get(
			`https://dev.teresai.com/api/v0/admin/patient/diseases/delete/${id}`
		);
	},
	updateUnderlying: (data, id) => {
		return Config.axiosHandle().post(
			`https://dev.teresai.com/api/v0/admin/patient/diseases/update/${id}`,
			data
		);
	},
	problemAbortionList: (data) => {
		return Config.axiosHandle().get(
			"https://dev.teresai.com/api/v0/admin/patient/abortion/show",
			data
		);
	},
	addProblemAbortion: (data) => {
		return Config.axiosHandle().post(
			"https://dev.teresai.com/api/v0/admin/patient/abortion/create/",
			data
		);
	},
	deleteProblemAbortion: (id) => {
		return Config.axiosHandle().get(
			`https://dev.teresai.com/api/v0/admin/patient/abortion/delete/${id}`
		);
	},
	updateAbortion: (data, id) => {
		return Config.axiosHandle().post(
			`https://dev.teresai.com/api/v0/admin/patient/abortion/update/${id}`,
			data
		);
	},
	logout: () => {
		return Config.axiosHandle().get(
			"https://dev.teresai.com/api/v0/admin/sign-out"
		);
	},
	CategoryUnderlying: (data) => {
		return Config.axiosHandle().post(
			"https://dev.teresai.com/api/v0/admin/diseases-category/insert",
			data
		);
	},
	subCategoryUnderlying: (data) => {
		return Config.axiosHandle().post(
			"https://dev.teresai.com/api/v0/admin/diseases-sub-category/insert",
			data
		);
	},
	subCategoryUnderlyingList: () => {
		return Config.axiosHandle().get(
			"https://dev.teresai.com/api/v0/admin/diseases-category/show"
		);
	},
	updateSubCategoryUnderlying: (data, id) => {
		return Config.axiosHandle().post(
			`https://dev.teresai.com/api/v0/admin/diseases-sub-category/update/${id}`,
			data
		);
	},
	subCategoryUnderlyingDelete: (id) => {
		return Config.axiosHandle().get(
			`https://dev.teresai.com/api/v0/admin/diseases-sub-category/delete/${id}`
		);
	},
	categoryUnderlyingDelete: (id) => {
		return Config.axiosHandle().get(
			`https://dev.teresai.com/api/v0/admin/diseases-category/delete/${id}`
		);
	},
	categoryProblem: (data) => {
		return Config.axiosHandle().post(
			"https://dev.teresai.com/api/v0/admin/problem-category/insert",
			data
		);
	},
	subcategoryProblem: (data) => {
		return Config.axiosHandle().post(
			"https://dev.teresai.com/api/v0/admin/problem-sub-category/insert",
			data
		);
	},
	categoryProblemList: () => {
		return Config.axiosHandle().get(
			"https://dev.teresai.com/api/v0/admin/problem-category/show"
		);
	},
	subCategoryProblemDelete: (id) => {
		return Config.axiosHandle().get(
			`https://dev.teresai.com/api/v0/admin/problem-sub-category/delete/${id}`
		);
	},
	updateSubCategoryProblem: (data, id) => {
		return Config.axiosHandle().post(
			`https://dev.teresai.com/api/v0/admin/problem-sub-category/update/${id}`,
			data
		);
	},
	categoryProblemDelete: (id) => {
		return Config.axiosHandle().get(
			`https://dev.teresai.com/api/v0/admin/problem-category/delete/${id}`
		);
	},
	assistantList: (data) => {
		return Config.axiosHandle().get(
			"https://dev.teresai.com/api/v0/admin/assistant/show/"
		);
	},
	addAssistant: (data) => {
		return Config.axiosHandle().post(
			"https://dev.teresai.com/api/v0/admin/assistant/insert",
			data
		);
	},
	updateAssistant: (data, id) => {
		return Config.axiosHandle().post(
			`https://dev.teresai.com/api/v0/admin/assistant/update/${id}`,
			data
		);
	},
	deleteAssistant: (id) => {
		return Config.axiosHandle().get(
			`https://dev.teresai.com/api/v0/admin/assistant/delete/${id}`
		);
	},
	profileList: () => {
		return Config.axiosHandle().get(
			"https://dev.teresai.com/api/v0/admin/profiles/show"
		);
	},
	updateProfile: (data) => {
		return Config.axiosHandle().post(
			"https://dev.teresai.com/api/v0/admin/profiles/update",
			data
		);
	},
	changePassProfile: (data) => {
		return Config.axiosHandle().post(
			"https://dev.teresai.com/api/v0/admin/profiles/change-password",
			data
		);
	},
	listCategoryDoctorProblem: () => {
		return Config.axiosHandle().get(
			`https://dev.teresai.com/api/v0/admin/problem-category/show/show_doctor`
		);
	},
	listCategoryDoctorUnderlying: () => {
		return Config.axiosHandle().get(
			`https://dev.teresai.com/api/v0/admin/diseases-category/show/show`
		);
	},
};
