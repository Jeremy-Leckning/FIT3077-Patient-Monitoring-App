import React, { Component } from "react";

class SystolicBloodPressureHistory extends Component {
  showMonitoredBP() {
    let monitoredBpText = localStorage
      .getItem("monitoredBP")
      .split("\n")
      .map((item, i) => <div key={i}>{item}<br></br><br></br></div>);
    return monitoredBpText;
  }

  render() {
    return this.showMonitoredBP();
  }
}

export default SystolicBloodPressureHistory;
