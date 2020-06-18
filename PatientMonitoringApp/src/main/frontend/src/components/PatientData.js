import React, { Component } from 'react'
import { Table } from 'react-bootstrap';

class PatientData extends Component {	
  render() {
    return <div>
        <Table responsive striped bordered hover variant="dark">
        <thead>
            <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Birth Date</th>
            <th>Address</th>
            </tr>
        </thead>
        <tbody>
        {!!this.props.monitoredPatientList.length && this.props.monitoredPatientList.map(function (patientObject) {
        return (
            <tr>
                <td>{patientObject.patientName}</td>
                <td>{patientObject.patientId}</td>
                <td>{patientObject.info.birthDate}</td>
                <td>{patientObject.info.address}</td>
            </tr>
        )
    }, this)}
        </tbody>
        </Table>
    </div>
  }
}

export default PatientData