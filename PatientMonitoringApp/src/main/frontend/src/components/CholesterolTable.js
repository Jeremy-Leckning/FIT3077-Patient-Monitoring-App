import React, { Component } from 'react'
import { Table } from 'react-bootstrap';

class CholesterolTable extends Component {	
  render() {
    return <div>
        <Table responsive striped bordered hover variant="dark">
        <thead>
            <tr>
            <th>Name</th>
            <th>Cholesterol</th>
            <th>Date</th>
            </tr>
        </thead>
        <tbody>
        {!!this.props.monitoredPatientList.length && this.props.monitoredPatientList.map(function (patientObject) {
        return (
            <tr>
                <td>{patientObject.patientName}</td>
                <td style={patientObject.cholesterolData.cholesterolValue > this.props.averageCholesterol ? { color: "red" } : { color: "white" }}>{patientObject.cholesterolData ? patientObject.cholesterolData.cholesterolValue : "-"}</td>
                <td>{patientObject.cholesterolData ? patientObject.cholesterolData.effectiveDateTime : "-"}</td>
            </tr>
        )
    }, this)}
        </tbody>
        </Table>
    </div>
  }
}

export default CholesterolTable