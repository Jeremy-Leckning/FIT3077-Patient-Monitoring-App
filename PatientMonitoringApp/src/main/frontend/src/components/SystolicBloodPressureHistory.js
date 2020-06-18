import React, { Component } from "react";

class SystolicBloodPressureHistory extends Component {
  showMonitoredBP() {
    let monitoredBpText = localStorage
      .getItem("monitoredBP")
      .split("\n")
      .map((item, i) => <div key={i}>{item}</div>);
    return monitoredBpText;
  }

  render() {
    return this.showMonitoredBP();
  }
}

export default SystolicBloodPressureHistory;
