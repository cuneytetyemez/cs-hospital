import React, { Component } from "react";

export default class News extends Component {
  // currentUser = {}

  render() {
    return (
      <div id="newsandmedia" className="cmp newsandmedia bg-body text-dark p-5 text-center d-flex flex-column justify-content-center align-items-center">
        <h1> Browse Waltham General News</h1>
          
          <a href="https://www.massgeneral.org/news/press-release/Wearable-devices-show-that-physical-activity-may-lower-atrial-fibrillation-and-stroke-risk" 
            title="Wearable devices show that physical activity may lower atrial fibrillation and stroke risk"> Wearable devices show that physical activity may lower atrial fibrillation and stroke risk</a>
        <div className="someclass pt-5">
          <h1> Press Release</h1>
            <a href="https://www.massgeneral.org/news/press-release/Mass-General-release-a-community-health-worker-intervention-reduces-hospital-readmissions"
            title="Mass General release: A community health worker intervention reduces hospital readmissions">
              Mass General release: A community health worker intervention reduces hospital readmissions
            </a>
        </div>
      </div>
    );
  }
}
