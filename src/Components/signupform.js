import { Component } from "react";


export default function SignUpFormCmp({ fields ={}, submitHandler  ,submitText="Edit"}) {

   
   let submitForm = (event)=>{
        submitHandler(event)
    }


	return (
		<form className="d-flex m-auto flex-column w-100 align-items-center p-5 h-100 justify-content-evenly" onSubmit={submitForm}>
			<div className="form_group d-flex w-100">
				<label htmlFor="">Fullname</label>
				<input type="text" className="form_input col-7 ms-auto" placeholder="fullname" name="name" defaultValue={fields.name} />
			</div>

			<div className="form_group d-flex w-100">
				<label htmlFor="">Username</label>
				<input type="text" className="form_input col-7 ms-auto" placeholder="username" name="username"  defaultValue={fields.email} />
			</div>

			<div className="form_group d-flex w-100">
				<label htmlFor="">Password</label>
				<input type="password" className="form_input col-7 ms-auto" placeholder="password" name="password" defaultValue={fields.password}/>
			</div>

			<div className="form_group d-flex w-100">
				<label htmlFor="">Date of birth</label>
				<input type="date" format="mm/dd/yyy" name="date_of_birth" className="form_input col-7 ms-auto" defaultValue={fields.date_of_birth}/>
			</div>

			<div className="form_group d-flex w-100">
				<label htmlFor="">Address</label>
				<input type="address" className="form_input col-7 ms-auto" placeholder="address" name="address" defaultValue={fields.address} />
			</div>

			<div className="form_group d-flex w-100">
				<label htmlFor="">Phone number</label>
				<input type="telephone" className="form_input col-7 ms-auto" name="phone" defaultValue={fields.phone} />
			</div>

			<div className="form_group d-flex w-100">
				<label htmlFor="">Country</label>
				<input type="country" className="form_input col-7 ms-auto" name="country" defaultValue={fields.country} />
			</div>
			<div className="form_group d-flex w-100">
				<label htmlFor="">city</label>
				<input type="city" className="form_input col-7 ms-auto" name="city" defaultValue={fields.city} />
			</div>
			<div className="form_group d-flex w-100">
				<label htmlFor="">State</label>
				<input type="state" className="form_input col-7 ms-auto" name="state" defaultValue={fields.state} />
			</div>
			<div className="form_group d-flex w-100">
				<label htmlFor="">Zipcode</label>
				<input type="zip" className="form_input col-7 ms-auto" name="zip" defaultValue={fields.zip} />
			</div>
			<div className="form_group d-flex w-100">
				<label htmlFor="">Email</label>
				<input type="email" className="form_input col-7 ms-auto" placeholder="email" name="email" defaultValue={fields.email} />
			</div>
			<div className="form_group d-flex w-100">
				<label htmlFor="">Insurance</label>
				<input type="text" className="form_input col-7 ms-auto" placeholder="insurance" name="insurance" defaultValue={fields.insurance} />
			</div>
			<button type="submit" className="btn btn-light col-7 ms-auto mt-4">
				{submitText}
			</button>
		</form>
	);
}
