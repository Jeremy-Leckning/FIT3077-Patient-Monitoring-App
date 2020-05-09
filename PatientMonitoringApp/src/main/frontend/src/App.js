import React, { Component } from 'react'
import './App.css';
import Search from './Search'
import Table from './Table'
import axios from "axios"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        practitionerIdentifier: '500',
        patientList: [],
        monitoredPatientList: [],
        patientInfo: []
    };
    this.updatePractitionerIdentifier = this.updatePractitionerIdentifier.bind(this);
    this.updatePatientList = this.updatePatientList.bind(this);
    this.updateMonitoredPatientList = this.updateMonitoredPatientList.bind(this);

}

updatePractitionerIdentifier(identifier){
  console.log(identifier)
  this.setState({
    practitionerIdentifier: identifier
  })
}

updatePatientList(patient){
  this.setState({
    monitoredPatientList: []
  })
  for (var i = 0; i < patient.length; i++) {
    console.log(patient[i]);
    var parsedJSON = JSON.parse(patient[i])
    parsedJSON.inMonitored = false
    patient[i] = parsedJSON
}
  this.setState({
    patientList: patient
  })
}

updateMonitoredPatientList = async (patient) => {
  console.log(JSON.parse(patient))

  var patientInMonitored = JSON.parse(patient).inMonitored

  if (!patientInMonitored) {
  let urlOne = "http://localhost:8080/api/v1/patient-cholesterol?patientId="+JSON.parse(patient).patientId
  let urlTwo = "http://localhost:8080/api/v1/patient-data?patientId="+JSON.parse(patient).patientId

  const requestOne = axios.get(urlOne)
  const requestTwo = axios.get(urlTwo)

  await axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
    const resOne = responses[0]
    const resTwo = responses[1]

      this.setState({
        monitoredPatientList: [...this.state.monitoredPatientList, {patientName: JSON.parse(patient).patientName, patientId: JSON.parse(patient).patientId, data: resOne.data, info: resTwo.data}]
      })
      console.log("patientInfo")
      console.log(this.state.monitoredPatientList)


      for (var i = 0; i < this.state.patientList.length; i++) {
        console.log(this.state.patientList[i]);
        if (this.state.patientList[i].patientId === JSON.parse(patient).patientId){
          this.state.patientList[i].inMonitored = !this.state.patientList[i].inMonitored
          this.forceUpdate()
        }
      }

  })
  )

}
  else {
    console.log("im removing")

    var array = [...this.state.monitoredPatientList]; // make a separate copy of the array
    var pos = array.map(function(e) { return e.patientId; }).indexOf(JSON.parse(patient).patientId);
    if (pos !== -1) {
      array.splice(pos, 1);
      this.setState({monitoredPatientList: array});

      array = [...this.state.patientList]
      pos = array.map(function(e) { return e.patientId; }).indexOf(JSON.parse(patient).patientId);
      this.state.patientList[pos].inMonitored = !this.state.patientList[pos].inMonitored
      this.forceUpdate()
    }
  }
}
  render() {
    return (
      <div className="App">
          <Search practitionerIdentifier = {this.state.practitionerIdentifier} 
            updatePractitionerIdentifier={this.updatePractitionerIdentifier}
            patientList = {this.state.patientList}
            updatePatientList={this.updatePatientList} 
            updateMonitoredPatientList={this.updateMonitoredPatientList}/>
          <Table monitoredPatientList={this.state.monitoredPatientList}/>
          {/* <Patient /> */}
      </div>
    );
  }
}

export default App;
