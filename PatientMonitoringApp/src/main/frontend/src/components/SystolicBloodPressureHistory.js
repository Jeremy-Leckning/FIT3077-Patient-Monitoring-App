
import React, { Component } from 'react'
import axios from "axios"

let test = "Hello\n its me"
class SystolicBloodPressureHistory extends Component {
    constructor(props) {
      super(props);
      this.state = {
        monitoredSystolicBP: []
      };
    //  this.fetchSystolicBP = this.fetchSystolicBP.bind(this);
    this.showMonitoredBP = this.showMonitoredBP.bind(this)
    }


showMonitoredBP(){
  let monitoredBpText = localStorage.getItem("monitoredBP").split ('\n').map ((item, i) => <div key={i}>{item}</div>);
  return monitoredBpText;
}

componentWillMount() {
        localStorage.setItem("monitoredBP", "")
}
    
  render() {
    return (
      this.showMonitoredBP()
    )
  }
}

export default SystolicBloodPressureHistory