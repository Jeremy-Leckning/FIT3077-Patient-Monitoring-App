import React, { Component } from 'react'
import './App.css';
import Search from './Search'
import Table from './Table'
import Patient from './Patient'
import axios from "axios"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        practitionerIdentifier: '500',
        patientList: [],
        monitoredPatientList: []
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
    patientList: patient
  })
}

updateMonitoredPatientList = async (patient) => {
  console.log(JSON.parse(patient))
  await axios.get("http://localhost:8080/api/v1/patient-cholesterol?patientId="+JSON.parse(patient).patientId).then(res => {
    this.setState({
      monitoredPatientList: [...this.state.monitoredPatientList, {patientName: JSON.parse(patient).patientName, patientId: JSON.parse(patient).patientId, data: res.data}]
    })
  })
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
