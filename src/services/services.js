import { AppointmentServiceHelper } from "./appointment.service.helper";
import { DocumentServiceHelper } from "./document.service";
import { userServiceHelper } from "./user.service.helper";



function getFormData(form_data: FormData) {
	return Array.from(form_data.entries()).reduce((acc, current_val) => {
		let [_key, _val] = current_val
		_key = _key === "fullname" ? "name" : _key

		acc[_key] = _val
		return acc
	}, {})
}

let UserService = userServiceHelper()
let AppointmentService = AppointmentServiceHelper
let DocumentService = DocumentServiceHelper

export { getFormData, UserService, AppointmentService, DocumentService }

