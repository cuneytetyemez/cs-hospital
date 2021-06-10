import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CacheService } from "../services/cache";
import { UserService } from "../services/services";

export default class Navigation extends Component {
  // currentUser = {}

  showMyAccountTab = () => {
    if (!!CacheService.getItem("auth_info"))
      return (
        <li>
          <Link to="/myaccount" className="">
            My Account
          </Link>
        </li>
      );
  };


  logout =() =>{
	UserService.logout()
  }  
  
  showLogOut = () => {
    if (!!CacheService.getItem("auth_info"))
      return (
        <li>
          
            <a className="" onClick={this.logout}>Log out</a>

        </li>
      );

    return (
      <>
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </>
    );
  };
  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/" className="">
              Home
            </Link>
          </li>
          {this.showMyAccountTab()}
          <li>
            <Link to="/about" className="">
              About
            </Link>
          </li>
          <li>
            <Link to="/newsandmedia">News&Media Coverage</Link>
          </li>
          <li>
            <Link to="/contact" className="">
              Contact
            </Link>
          </li>
        </ul>

        <ul className="right">
          <li>
            <Link to="/welcome">Welcome</Link>{" "}
          </li>

          {this.showLogOut()}
        </ul>
      </nav>
    );
  }
}
