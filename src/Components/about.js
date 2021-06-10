import React, { Component } from "react";

export default class About extends Component {
  // currentUser = {}

  render() {
    return (
      <div className="cmp text-center bg-body text-dark  p-5">
        <h1> The Waltham General Differences</h1>
        <p>
          Massachusetts General Hospital was established to provide care to Boston's sick, regardless of socioeconomic status, and became the first teaching hospital of Harvard University's new
          medical school. We have remained at the forefront of medicine by fostering a culture of collaboration and education, pushing the boundaries of medical research, and maintaining an unwavering
          commitment to the diverse community we were created to serve.{" "}
        </p>
        <h2> World-Class Patient Care</h2>
        <p>
          {" "}
          Mass General is consistently ranked among the top hospitals in the United States by U.S. News & World Report. In 2015, Mass General was recognized as the #1 hospital in America and in 2019
          we were #2. Mass General is the only hospital in America to be recognized in all 16 medical specialties assessed by U.S. News, a testament to the breadth and depth of our expertise. In 2021,
          Mass General is also ranked #3 on the World's Best Hospitals list by Newsweek. Our patients rate their experiences with us very highly, with nearly all indicating they would be very likely
          to recommend us to others. We also consistently achieve high ratings from professional organizations. We have been recognized by: The American Nurses Credentialing Center for our excellence
          in nursing as a Magnet® hospital The Society of Thoracic Surgeons for our excellence in cardiothoracic surgery The Joint Commission for our excellence in stroke care with a Comprehensive
          Stroke Certification The Leapfrog Group for our quality and safety with an “A” grade in 2019 Mass General serves as a leader in research with more than $1 billion in research operations and
          stands as the largest-hospital based research program in NIH funding. Our research program spans more than 30 clinical departments and centers across the hospital. Approximately 1,200
          clinical trials are taking place at Mass General at any given time. Our research drives discoveries and breakthroughs in basic and clinical research, which translate into new and better
          treatments for our patients locally and around the globe. Mass General researchers topped the Nature Index list of health care organizations for publishing more articles in high-impact
          journals than any other hospital in America from January 2019 to December 2019. Learn more about Mass General research Patients at Mass General have access to a vast network of physicians,
          nearly all of whom are Harvard Medical School faculty and many of whom are leaders within their fields. Our many multidisciplinary care teams—known worldwide for innovations in cancer,
          digestive disorders, the neurosciences, heart disease, orthopaedics, transplantation, urologic diseases and trauma care—unite specialists across the hospital to offer comprehensive,
          state-of-the-art medical care. In addition, MassGeneral Hospital for Children provides a full range of pediatric health care services, from primary care to leading-edge treatment of complex
          and rare disorders. Learn more about the U.S. News ranking
        </p>
        <h2> Setting the Bar for Quality & Safety</h2>
        <p>
          {" "}
          Safety, effectiveness, patient-centeredness, timeliness, efficiency and equity—these six tenets established by the Health and Medicine Division of the National Academies of Sciences,
          Engineering and Medicine are the foundation of Mass General’s approach to quality and safety. We measure our performance, set high goals and track our progress toward those goals to maintain
          an atmosphere of excellence. We compare ourselves against local and national benchmarks in key quality and safety areas to ensure we deliver the highest quality and safest care possible.
        </p>
      </div>
    );
  }
}
