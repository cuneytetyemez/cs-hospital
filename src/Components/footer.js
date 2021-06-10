import React, { Component } from "react";

export default class Footer extends Component {
  // currentUser = {}

  render() {
    return (
      <nav className="footer_nav">
       
         <ul className="footer_links">
           <li><a>Gıthub</a></li>
           <li><a>LınkedIn</a></li>
           <li><a>Twıtter</a></li>
         </ul>

       <div className="footer_copyright"><p>&copy;copyright. All rights reserved.</p></div>
      </nav>
    );
  }
}
