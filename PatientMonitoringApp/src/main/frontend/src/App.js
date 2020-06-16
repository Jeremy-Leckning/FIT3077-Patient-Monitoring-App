import React, { Component } from 'react'
import './App.css';
import Search from './components/Search'
import Patient from './components/Patient'
import CholesterolTable from './components/CholesterolTable'
import CombinedTable from './components/CombinedTable'
import PatientData from './components/PatientData'
import BloodPressureLimit from './components/BloodPressureLimit'
import CholesterolGraph from './components/CholesterolGraph'
import Timer from './components/Timer'
import axios from "axios"
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Col, Tabs, Tab, Jumbotron, Container, ListGroup, Row, Card } from 'react-bootstrap';
import BloodPressureTable from './components/BloodPressureTable';
import SystolicBloodPressureHistory from './components/SystolicBloodPressureHistory';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      practitionerIdentifier: '',
      patientList: [],
      monitoredPatientList: [],
      patientInfo: [],
      averageCholesterol: 0,
      updatingXY: false
    };
    this.updatePractitionerIdentifier = this.updatePractitionerIdentifier.bind(this);
    this.updatePatientList = this.updatePatientList.bind(this);
    this.updateMonitoredPatientList = this.updateMonitoredPatientList.bind(this);
  }

  fetchSystolicBP() {
    localStorage.setItem("monitoredBP", "" ) 
    {!!this.state.monitoredPatientList.length && this.state.monitoredPatientList.map((patientObject) => {
        if (localStorage.getItem("systolicX") < patientObject.bloodPressureData.systolicBloodPressure){
            // {this.fetchSystolicBP(patientObject.patientId)}
            axios.get("http://localhost:8080/api/v1/patient-systolicBloodPressure?patientId=" + patientObject.patientId).then(res => {
                localStorage.setItem("monitoredBP", localStorage.getItem("monitoredBP") + res.data + "\n" ) 
            })
        }})}
    console.log("fetch function called")
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
      let urlThree = "http://localhost:8080/api/v1/patient-bloodPressure?patientId=" + JSON.parse(patient).patientId

      const requestOne = axios.get(urlOne)
      const requestTwo = axios.get(urlTwo)
      const requestThree = axios.get(urlThree)

      await axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
        const resOne = responses[0]
        const resTwo = responses[1]
        const resThree = responses[2]

        this.setState({
          monitoredPatientList: [...this.state.monitoredPatientList, { patientName: JSON.parse(patient).patientName, patientId: JSON.parse(patient).patientId, cholesterolData: resOne.data, bloodPressureData: resThree.data, info: resTwo.data }]
        })

        for (var i = 0; i < this.state.patientList.length; i++) {
          if (this.state.patientList[i].patientId === JSON.parse(patient).patientId) {
            this.state.patientList[i].inMonitored = !this.state.patientList[i].inMonitored
            this.forceUpdate()
          }
        }
        this.calculateAverageCholesterol()
        this.fetchSystolicBP()
      })
      ).catch(err => { alert(err) })

    }
    else {
      console.log("removing patient from monitor")
      var array = [...this.state.monitoredPatientList]; // make a separate copy of the array
      var pos = array.map(function (e) { return e.patientId; }).indexOf(JSON.parse(patient).patientId);
      if (pos !== -1) {
        array.splice(pos, 1);
        this.setState({ monitoredPatientList: array }, () => { this.calculateAverageCholesterol(); this.fetchSystolicBP(); });

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
        arrayItem.cholesterolData = res.data
      }).catch(err => { alert(err) })
      axios.get("http://localhost:8080/api/v1/patient-bloodPressure?patientId=" + patientId).then(res => {
        arrayItem.bloodPressureData = res.data
      }).catch(err => { alert(err) })
    });
    this.calculateAverageCholesterol()
    this.fetchSystolicBP()
  }

  // Gets the average cholesterol of all the patients being monitored (except those that have no cholesterol)
  calculateAverageCholesterol() {
    var calculatedAverageCholesterol = 0
    var monitoredPatientListLength = 0
    if (this.state.monitoredPatientList.length) {
      var totalCholesterol = 0
      this.state.monitoredPatientList.forEach(function (arrayItem) {
        if (arrayItem.cholesterolData.cholesterolValue !== 0) {
          monitoredPatientListLength += 1
          totalCholesterol += arrayItem.cholesterolData.cholesterolValue;
        }
      })
      calculatedAverageCholesterol = totalCholesterol / monitoredPatientListLength
    }

    this.setState({
      averageCholesterol: calculatedAverageCholesterol
    })
    console.log(this.state.averageCholesterol)
  }

  updateXY = () => {
    this.setState({updatingXY: !this.state.updatingXY}, ()=> {this.fetchSystolicBP()})
  }

  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Patient Monitoring App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Form inline>
              {!!this.state.monitoredPatientList.length && <Timer updateMonitoredPatientCholesterol={this.updateMonitoredPatientCholesterol} />}
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <br />
        <Search
          practitionerIdentifier={this.state.practitionerIdentifier}
          updatePractitionerIdentifier={this.updatePractitionerIdentifier}
          patientList={this.state.patientList}
          updatePatientList={this.updatePatientList}
          updateMonitoredPatientList={this.updateMonitoredPatientList}
        />
        {!!this.state.monitoredPatientList.length && <BloodPressureLimit updateXY={this.updateXY} updatingXY={this.state.updatingXY}/>}
        <Tabs defaultActiveKey="allPatients" id="uncontrolled-tab-example">
          <Tab eventKey="allPatients" title="All Patients">
            <Patient
              patientList={this.state.patientList}
              updateMonitoredPatientList={this.updateMonitoredPatientList}
            />
          </Tab>
          <Tab eventKey="cholesterolTable" title="Cholesterol Table">
            <CholesterolTable monitoredPatientList={this.state.monitoredPatientList} averageCholesterol={this.state.averageCholesterol} />
          </Tab>
          <Tab eventKey="cholesterolGraph" title="Cholesterol Graph">
            <CholesterolGraph monitoredPatientList={this.state.monitoredPatientList} />
          </Tab>
          <Tab eventKey="bloodPressureTable" title="Blood Pressure Table">
            <BloodPressureTable monitoredPatientList={this.state.monitoredPatientList} />
          </Tab>
          <Tab eventKey="SystolicBPHistory" title="Systolic Blood Pressure history">
            <SystolicBloodPressureHistory/>
          </Tab>
          <Tab eventKey="bloodPressureGraph" title="Blood Pressure Graph">

          </Tab>
          <Tab eventKey="combinedTable" title="Combined Table">
            <CombinedTable monitoredPatientList={this.state.monitoredPatientList} averageCholesterol={this.state.averageCholesterol} />
          </Tab>
          <Tab eventKey="patientData" title="Patient Data">
            <PatientData monitoredPatientList={this.state.monitoredPatientList} averageCholesterol={this.state.averageCholesterol} />
          </Tab>

        </Tabs>
      </div>
    );
  }
}

export default App;
