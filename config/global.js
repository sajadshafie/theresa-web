import axios from "axios";
import Cookies from "js-cookie";
const config = {
	
	baseURL: "/", //https://dev.pakan24.com/
	udata: Cookies.get("patienttoken"),
	axiosHandle: () => {
		console.log(config.udata);
		return axios.create({
			baseURL: `${config.baseURL}api/`,
			headers: config.udata
				? {
						Authorization: "Bearer " + config.udata,
						"GATEWAY-ID": "30",
				  }
				: {
						"GATEWAY-ID": "30",
						
				  },
		});
	},
};

console.log(config.udata);
console.log(Cookies.get("token"));
export default config;
