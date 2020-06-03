import React, { Component } from 'react'
import CanvasJSReact from './canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class BloodPressureTable extends Component {	
    constructor(props) {
        super(props);
    
    }

  render() {
    return !!this.props.monitoredPatientList.length && this.props.monitoredPatientList.map(function (patientObject) {
        return (
            <tr>
                <td>{patientObject.patientName}</td>
                <td>{patientObject.bloodPressureData ? patientObject.bloodPressureData.systolicBloodPressure : "-"}</td>
                <td>{patientObject.bloodPressureData ? patientObject.bloodPressureData.diastolicBloodPressure : "-"}</td>
                <td>{patientObject.bloodPressureData ? patientObject.bloodPressureData.effectiveDateTime : "-"}</td>
                <td><button onClick={() => alert("Patient ID: " + patientObject.patientId + "\nBirth Date: " + patientObject.info.birthDate + "\nGender: " + patientObject.info.gender + "\nAddress: " + patientObject.info.address)}>Get Patient Details</button></td>
            </tr>
        )
    }, this)
  }
}

export default BloodPressureTable