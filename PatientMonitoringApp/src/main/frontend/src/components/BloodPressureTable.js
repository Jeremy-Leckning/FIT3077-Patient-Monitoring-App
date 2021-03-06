import React, { Component } from 'react'
import { Table } from 'react-bootstrap';

class BloodPressureTable extends Component {	
  render() {
    return <div>
        <Table responsive striped bordered hover variant="dark">
        <thead>
            <tr>
            <th>Name</th>
            <th>Systolic Blood Pressure</th>
            <th>Diastolic Blood Pressure</th>
            <th>Date</th>
            </tr>
        </thead>
        <tbody>
        {!!this.props.monitoredPatientList.length && this.props.monitoredPatientList.map(function (patientObject) {
        return (
            <tr>
                <td>{patientObject.patientName}</td>
                <td style={localStorage.getItem("systolicX") < patientObject.bloodPressureData.systolicBloodPressure ? { color: "yellow" } : { color: "white" }}>{patientObject.bloodPressureData ? patientObject.bloodPressureData.systolicBloodPressure : "-"}</td>
                <td style={localStorage.getItem("diastolicY") < patientObject.bloodPressureData.diastolicBloodPressure ? { color: "yellow" } : { color: "white" }}>{patientObject.bloodPressureData ? patientObject.bloodPressureData.diastolicBloodPressure : "-"}</td>
                <td>{patientObject.bloodPressureData ? patientObject.bloodPressureData.effectiveDateTime : "-"}</td>
            </tr>
        )
    }, this)}
        </tbody>
        </Table>
    </div>
  }
}

export default BloodPressureTable 