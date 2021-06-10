import { ApiHelper } from "./api.helper";

export class AppointmentServiceHelper {
	static route = "appointments";
	static createAppointment({ date, doctor, name, time, department, location, user_id }) {
		let data = { date, doctor, name, time, department, location, user_id };
	return ApiHelper.makeRequest(this.route, ApiHelper.authorize(ApiHelper.makeRequestOption("post", data), ApiHelper.getAccessToken()));
	}

	static getAppointments(query = "") {
		return ApiHelper.makeRequest(this.route + query, ApiHelper.authorize(ApiHelper.makeRequestOption("get"), ApiHelper.getAccessToken()));
	}

	static deleteAppointment(id: String) {
		return ApiHelper.makeRequest(this.route +"/" +id, ApiHelper.authorize(ApiHelper.makeRequestOption("delete"), ApiHelper.getAccessToken()));
	}

	static updateAppointment(data) { 
		return ApiHelper.makeRequest(this.route +"/"+ data._id, ApiHelper.authorize(ApiHelper.makeRequestOption("PATCH",data), ApiHelper.getAccessToken()));
	}

	static makeCurrentAppointmentQuery() {
		// let date = new Date(Date.now());

		// let filter = {
		// 	where: [`date:>=:${date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()}`],
		// };

		// return ["?", encodeURI(JSON.stringify(filter))].join("");

		return "?future_appointment=true"
	} 
}
