import React, { Component } from 'react'
import axios from "axios"
import './table.css'

class Search extends Component {
    constructor(props) {
        super(props);
    }

    getPatientList = (e) => {
        console.log("gettingPatientList")
        axios.get("http://localhost:8080/api/v1/patient-list?practitionerIdentifier="+this.props.practitionerIdentifier).then(res => {
            this.props.updatePatientList(res.data)
        })
    }

    updatepractitionerIdentifier = (e) => {
        this.props.updatePractitionerIdentifier(e.target.value)
      };

    handleSubmit = (e) => {
        e.preventDefault();
        this.getPatientList(e);
    }

    updateMonitoredPatientList = (e) => {
        this.props.updateMonitoredPatientList(e.target.value)
    }



    render() { 
        return <div>
            <h1>Hello {this.props.practitionerIdentifier}</h1>
            <form onSubmit={this.handleSubmit}>
                <label>Practitioner ID:
                    <input type="text" value={this.props.practitionerIdentifier} required onChange={this.updatepractitionerIdentifier}/>
                    <input type="submit" value = "Search"/>
                </label>
            </form>

            <h1 id='title'>All Patients</h1>
                <table id='patients'>
                    <tbody>
                        <tr><th key={0}>NAME</th><th key={1}>ACTION</th></tr>
                        {!!this.props.patientList.length && this.props.patientList.map((patient, index) => {
                        return (
                            <tr key={patient}>
                                <td>{patient.patientName}</td>
                        <td><button value={JSON.stringify(patient)} onClick={this.updateMonitoredPatientList}>{!patient.inMonitored?"Add to monitor":"Remove from monitor"}</button></td>
                            </tr>
                        )
                        })}
                    </tbody>
                </table>
        </div>
    }
}

export default Search