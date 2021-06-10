import { useEffect, useState } from "react";
import { getFormData } from "../services/services";

const AppointmentForm = ({ fields = {}, submitHandler, submitText = "Create", legend }) => {
	let [_fields, setFields] = useState(fields);
	// let _fields = fields;
	let submitForm = (event) => {
		event.preventDefault();
		console.log('form values', event.target.value)
		
		if (!!submitHandler && Object.keys(submitHandler).includes(event.nativeEvent.submitter.value)) 
			submitHandler[event.nativeEvent.submitter.value](getFormData(new FormData(event.target)));
			
		clearForm(event)

	};

	useEffect(() => {
		console.log("useeffect fired");
		setFields(fields);
		return () => {
			// cleanup
		};
	}, [fields]);

	let clearForm = (event) => {
		console.log('clear fired')
		Array.from(event.target.elements).forEach((element)=> element.value = "")
	};

	let showFormActions = (apt) => {
		console.log("appointment submit updated", apt);
		if (!!apt && Object.keys(apt).includes("_id")) {
			return (
				<>
					<button className="btn btn-outline-primary" type="submit" value="update">
						Update
					</button>
				</>
			);
		}

		return (
			<button type="submit" className="btn btn-light" value="create">
				{submitText}
			</button>
		);
	};
	return (
		<form onSubmit={submitForm} name="appointment_form">
			<legend>{legend}</legend>

			<div className="form-floating mb-3">
				<input type="date" className="form-control" id="floatingInput" placeholder="mm/dd/yyy" format="mm/dd/yyyy" name="date" required aria-required={true} defaultValue={_fields.date} />
				<label htmlFor="floatingInput">Appointment date</label>
			</div>

			<div className="form-floating mb-3">
				<input type="time" className="form-control" id="" placeholder="" name="time" required aria-required={true} defaultValue={_fields.time} />
				<label htmlFor="floatingInput">Appointment Time</label>
			</div>

			<div className="form-floating mb-3">
				<input type="location" className="form-control" id="floatingInput" placeholder="name@example.com" name="location" required aria-required={true} defaultValue={_fields.location} />
				<label htmlFor="floatingInput">Location</label>
			</div>

			<div className="form-floating mb-3">
				<input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name="department" required aria-required={true} defaultValue={_fields.department} />
				<label htmlFor="floatingInput">Department</label>
			</div>
			<div className="form-floating mb-3">
				<input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name="doctor" required aria-required={true} defaultValue={_fields.doctor} />
				<label htmlFor="floatingInput">Doctor's Name</label>
			</div>
			<button className="btn btn-warning" value="cancel" type="submit">
				Cancel
			</button>
			{showFormActions(_fields)}
		</form>
	);
};

export default AppointmentForm;
