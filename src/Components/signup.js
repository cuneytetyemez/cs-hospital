import React, { Component } from "react";
import { mockPrefill } from "../mock/data";
import { CacheService } from "../services/cache";
import { getFormData, UserService } from "../services/services";
import SignUpFormCmp from "./signupform";

export default class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = { signup_template: mockPrefill };
	}

	updateProfile = (data) => {
		let { password, ...stripped_data } = data;

		return UserService.updateProfile(stripped_data);
	};

	submitSignup = (event) => {
		event.preventDefault();
		console.log("arresting form submit here");

		let data = getFormData(new FormData(event.target));

		UserService.signup(data)

			.then((res) => {
				//update profile
				if (!!res) {
					CacheService.setItem("auth_info", res);
					return UserService.getProfile().then(() => {
						return this.updateProfile(data);
					});
				}
			})
			.then((res) => {
				console.log("jump to my account if this passes");
				window.location = `${window.location.origin}/myaccount`;
			})

			.catch((err) => console.error("error occured", err));
		console.log("loging submitted data", data);
	};

	render() {
		return (
			<div className="cmp signup">
				<main className="w-50 m-auto">
				<SignUpFormCmp fields={this.state.signup_template} submitHandler={this.submitSignup} submitText="Create" />
				</main>
			</div>
		);
	}
}
