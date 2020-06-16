
import React, { Component } from 'react'
import axios from "axios"

class SystolicBloodPressureHistory extends Component {
    constructor(props) {
      super(props);
      this.state = {
        monitoredSystolicBP: []
      };
    //  this.fetchSystolicBP = this.fetchSystolicBP.bind(this);
    }



    componentWillMount() {
        localStorage.setItem("monitoredBP", "")
}
    
      render() {
        //   {this.fetchSystolicBP()}
          return(<div>
            return (
          </div>)
    }
}

export default SystolicBloodPressureHistory