import React, { Component } from 'react'
import CanvasJSReact from './canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// class dataPoint {
//   constructor(label, y) {
//     this.label = label;
//     this.y = y;
//   }
// }

class CholesterolTable extends Component {	
    constructor(props) {
        super(props);
    
    }

  render() {
    return !!this.props.monitoredPatientList.length && this.props.monitoredPatientList.map(function (patientObject) {
        return (
            <tr>
                <td>{patientObject.patientName}</td>
                <td style={patientObject.cholesterolData.cholesterolValue > this.props.averageCholesterol ? { color: "red" } : { color: "black" }}>{patientObject.cholesterolData ? patientObject.cholesterolData.cholesterolValue : "-"}</td>
                <td>{patientObject.cholesterolData ? patientObject.cholesterolData.effectiveDateTime : "-"}</td>
                <td><button onClick={() => alert("Patient ID: " + patientObject.patientId + "\nBirth Date: " + patientObject.info.birthDate + "\nGender: " + patientObject.info.gender + "\nAddress: " + patientObject.info.address)}>Get Patient Details</button></td>
            </tr>
        )
    }, this)
  }
}

export default CholesterolTable