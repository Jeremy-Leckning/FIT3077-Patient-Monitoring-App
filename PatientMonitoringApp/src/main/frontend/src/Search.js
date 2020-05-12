import React, { Component } from 'react'
import axios from "axios"
import './table.css'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    // Gets list of patient from all the encounters
    getPatientList = (e) => {
        console.log("gettingPatientList")
        this.setState({
            isLoading: true
        })
        axios.get("http://localhost:8080/api/v1/patient-list?practitionerIdentifier=" + this.props.practitionerIdentifier).then(res => {
            this.props.updatePatientList(res.data)
            this.setState({
                isLoading: false
            })
        }).catch(err => {
            alert(err)
            this.setState({
                isLoading: false
            })
        })
    }

    updatepractitionerIdentifier = (e) => {
        this.props.updatePractitionerIdentifier(e.target.value)
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.getPatientList(e);
    }

    // Adds/Remove patients from the monitoring list
    updateMonitoredPatientList = async (e) => {
        this.setState({
            isLoading: true
        })
        await this.props.updateMonitoredPatientList(e.target.value).then(res => {
            this.setState({
                isLoading: false
            })
        })
    }



    render() {
        return <div>
            <div style={{ height: '170px' }}>
                <h1>Hello {this.props.practitionerIdentifier}</h1>

                <form onSubmit={this.handleSubmit}>
                    <label>Practitioner Identifier:
                    <input type="text" value={this.props.practitionerIdentifier} required onChange={this.updatepractitionerIdentifier} />
                        <input disabled={this.state.isLoading && "disabled"} type="submit" value="Search" />
                    </label>
                </form>

                {!this.state.isLoading ? <h1 id='title'>All Patients</h1> : <h2>Loading...</h2>}
            </div>

            <div style={{ height: '80vh', overflow: 'auto' }}>
                <table id='patients'>
                    <tbody>
                        <tr><th key={0}>NAME</th><th key={1}>ACTION</th></tr>
                        {!!this.props.patientList.length && this.props.patientList.map((patient, index) => {
                            return (
                                <tr key={patient}>
                                    <td>{patient.patientName}</td>
                                    <td><button disabled={this.state.isLoading} value={JSON.stringify(patient)} onClick={this.updateMonitoredPatientList}>{!patient.inMonitored ? "Add to monitor" : "Remove from monitor"}</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    }
}

export default Search