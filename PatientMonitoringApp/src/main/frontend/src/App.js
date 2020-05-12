import React, { Component } from 'react'
import './App.css';
import Search from './Search'
import Table from './Table'
import Timer from './Timer'
import axios from "axios"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      practitionerIdentifier: '',
      patientList: [],
      monitoredPatientList: [],
      patientInfo: [],
      averageCholesterol: 0
    };
    this.updatePractitionerIdentifier = this.updatePractitionerIdentifier.bind(this);
    this.updatePatientList = this.updatePatientList.bind(this);
    this.updateMonitoredPatientList = this.updateMonitoredPatientList.bind(this);
  }

  // Updates identifier
  updatePractitionerIdentifier(identifier) {
    this.setState({
      practitionerIdentifier: identifier
    })
  }

  // Updates original patient list
  updatePatientList(patient) {
    this.setState({
      monitoredPatientList: []
    })
    for (var i = 0; i < patient.length; i++) {
      var parsedJSON = JSON.parse(patient[i])
      parsedJSON.inMonitored = false
      patient[i] = parsedJSON
    }
    this.setState({
      patientList: patient
    })
  }

  // Updates the monitored patient list, calls cholesterol and data for patient if not in monitored
  updateMonitoredPatientList = async (patient) => {
    var patientInMonitored = JSON.parse(patient).inMonitored

    if (!patientInMonitored) {
      console.log("adding patient to monitor")
      let urlOne = "http://localhost:8080/api/v1/patient-cholesterol?patientId=" + JSON.parse(patient).patientId
      let urlTwo = "http://localhost:8080/api/v1/patient-data?patientId=" + JSON.parse(patient).patientId

      const requestOne = axios.get(urlOne)
      const requestTwo = axios.get(urlTwo)

      await axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
        const resOne = responses[0]
        const resTwo = responses[1]

        this.setState({
          monitoredPatientList: [...this.state.monitoredPatientList, { patientName: JSON.parse(patient).patientName, patientId: JSON.parse(patient).patientId, data: resOne.data, info: resTwo.data }]
        })


        for (var i = 0; i < this.state.patientList.length; i++) {
          if (this.state.patientList[i].patientId === JSON.parse(patient).patientId) {
            this.state.patientList[i].inMonitored = !this.state.patientList[i].inMonitored
            this.forceUpdate()
          }
        }
        this.calculateAverageCholesterol()
      })
      ).catch(err => { alert(err) })

    }
    else {
      console.log("removing patient from monitor")
      var array = [...this.state.monitoredPatientList]; // make a separate copy of the array
      var pos = array.map(function (e) { return e.patientId; }).indexOf(JSON.parse(patient).patientId);
      if (pos !== -1) {
        array.splice(pos, 1);
        this.setState({ monitoredPatientList: array }, () => { this.calculateAverageCholesterol() });

        array = [...this.state.patientList]
        pos = array.map(function (e) { return e.patientId; }).indexOf(JSON.parse(patient).patientId);
        this.state.patientList[pos].inMonitored = !this.state.patientList[pos].inMonitored
        this.forceUpdate()
      }

    }
  }

  // Function that is called every N seconds based on frequency
  updateMonitoredPatientCholesterol = () => {
    console.log("Updating Patient Colesterol")
    this.state.monitoredPatientList.forEach(function (arrayItem) {
      var patientId = arrayItem.patientId;
      axios.get("http://localhost:8080/api/v1/patient-cholesterol?patientId=" + patientId).then(res => {
        arrayItem.data = res.data
      }).catch(err => { alert(err) })
    });
    this.calculateAverageCholesterol()
  }

  // Gets the average cholesterol of all the patients being monitored (except those that have no cholesterol)
  calculateAverageCholesterol() {
    var calculatedAverageCholesterol = 0
    var monitoredPatientListLength = 0
    if (this.state.monitoredPatientList.length) {
      var totalCholesterol = 0
      this.state.monitoredPatientList.forEach(function (arrayItem) {
        if (arrayItem.data.cholesterolValue !== 0) {
          monitoredPatientListLength += 1
          totalCholesterol += arrayItem.data.cholesterolValue;
        }
      })
      calculatedAverageCholesterol = totalCholesterol / monitoredPatientListLength
    }

    this.setState({
      averageCholesterol: calculatedAverageCholesterol
    })
  }

  render() {
    return (
      <div className="App" style={{ width: '100%' }}>
        <div style={{ float: 'left', width: '35vw' }}>
          <Search practitionerIdentifier={this.state.practitionerIdentifier}
            updatePractitionerIdentifier={this.updatePractitionerIdentifier}
            patientList={this.state.patientList}
            updatePatientList={this.updatePatientList}
            updateMonitoredPatientList={this.updateMonitoredPatientList} />
        </div>

        <div style={{ float: 'left', width: '60vw' }}>
          <div style={{ height: '113px' }}>
            {!!this.state.monitoredPatientList.length && <Timer updateMonitoredPatientCholesterol={this.updateMonitoredPatientCholesterol} />}
          </div>

          <Table averageCholesterol={this.state.averageCholesterol} monitoredPatientList={this.state.monitoredPatientList} />
        </div>



        {/* <Patient /> */}
      </div>
    );
  }
}

export default App;
