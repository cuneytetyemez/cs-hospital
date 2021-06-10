import React, { Component } from "react";
import { mockPrefill } from "../mock/data";
import { CacheService } from "../services/cache";
import { getFormData } from "../services/services";
import { UserService } from "../services/services";

export default class Login extends Component {
  // currentUser = {}

  constructor(){
    super()
    this.state = {mock_data : mockPrefill}
  }
  loginApi = (data) =>{

    
      UserService.login(data).then((res) => {
        console.log("some valid response");
        CacheService.setItem('auth_info',res)
        window.location = window.location.origin + '/myaccount'
      })
      .catch((res) => {
        console.log("some error occured on api", res);
      });
  }
  submitLogin = (event)=>{
    event.preventDefault();
    let data = getFormData(new FormData(event.target))
    this.loginApi(data)
  
  }

  render() {
    return (
      <div className="cmp login">

        <form onSubmit={this.submitLogin}>

          <legend>Login</legend>
          <div className="input_group">
            <label htmlFor=""></label>
            <input type="text" className="form_input" placeholder="username" name="username" defaultValue={this.state.mock_data.email}/>
          </div>

          <div className="form_group">
            <label htmlFor=""></label><input className="form_input" placeholder="password" type="password" name="password" defaultValue={this.state.mock_data.password}/>
          </div>

          <button className="btn btn-light" type="submit">Login</button>
        </form>
      </div>
    );
  }
}
