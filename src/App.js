import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReactDOM from "react-dom";

import Navition from "./Components/navigation";
import Footer from "./Components/footer";
import About from "./Components/about";
import Home from "./Components/home";
import Contact from "./Components/contact";
import Appointment from "./Components/appointments";
import Account from "./Components/myaccount";
import News from "./Components/newsandmedia";


import logo from "./logo.svg";
import "./App.css";
import Welcome from "./Components/welcome";
import Login from "./Components/login";
import Signup from "./Components/signup";

class App extends Component {


  render() {
    return (
      <Router>
        <Navition />
        <div className="main">

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/myaccount">
            <Account />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/newsandmedia">
            <News />
          </Route>
          <Route exact path="/welcome">
            <Welcome />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route>
            <div>No match</div>
          </Route>
        </Switch>

        </div>
        <Footer></Footer>
      </Router>
    );
  }
}

export default App;
