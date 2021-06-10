import React, { Component } from "react";

export default class Home extends Component {
  
  constructor() {
    super();
  }
  

  render() {
    return (
      <div className="cmp home text-white text-center pt-5 text-uppercase" style={{ 'background-image': `url(${window.location.origin}/homeimage.jpeg)`}}>
        {/* <img src="/homeimage.jpeg" alt="" className="home__background"/> */}

        <h1>Welcome to Waltham General Hospital</h1>
      </div>
    );
  }
}
