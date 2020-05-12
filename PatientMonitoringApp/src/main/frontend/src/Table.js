import React, { Component } from 'react'
import './table.css'

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    renderTableHeader() {
        return <tr><th key={0}>NAME</th> <th key={1}>CHOLESTEROL</th> <th key={2}>DATE</th><th key={3}>EXTRA</th></tr>
    }


    render() {
        return <div>
            {this.state.isLoading && <h6>Loading...</h6>}
            <h1 id='title'>Monitored Patients</h1>
            <div style={{ height: '80vh', overflow: 'auto' }}>
                <table id='patients'>
                    <tbody>
                        {this.renderTableHeader()}
                        {/* {this.state.search && this.getPatientCholesterol()} */}
                        {!!this.props.monitoredPatientList.length && this.props.monitoredPatientList.map(function (patientObject) {
                            return (
                                <tr>
                                    <td>{patientObject.patientName}</td>
                                    <td style={patientObject.data.cholesterolValue > this.props.averageCholesterol ? { color: "red" } : { color: "black" }}>{patientObject.data ? patientObject.data.cholesterolValue : "-"}</td>
                                    <td>{patientObject.data ? patientObject.data.effectiveDateTime : "-"}</td>
                                    <td><button onClick={() => alert("Patient ID: " + patientObject.patientId + "\nBirth Date: " + patientObject.info.birthDate + "\nGender: " + patientObject.info.gender + "\nAddress: " + patientObject.info.address)}>Get Patient Details</button></td>
                                </tr>
                            )
                        }, this)}
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


    }
}

export default Table