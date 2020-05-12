import React, { Component } from 'react'
import axios from "axios"

class Patient extends Component {
    constructor() {
        super();
        this.state = {
            patientList: []
        };
    }

    fetchPatients = () => {
        axios.get("http://localhost:8080/api/v1/patient-data").then(res => {
            console.log("WHAT THIS")
            console.log(res);
            this.setState({
                patientList: res.data
            })
        }).catch(err => {alert(err)})
    }
    
    render() {
        if (!this.state.patientList.length){
            this.fetchPatients()
        }
        return this.state.patientList.map((patient, index) => {
            return (
            <div>
                <h1>Patient Data</h1>
                <p>First Name: {patient.firstName}</p>
                <p>Last Name: {patient.lastName}</p>
                <p>Cholesterol Value: {patient.cholesterolValue}</p>
                <p>Gender: {patient.gender}</p>
                <p>Address: {patient.address}</p>
            </div>
            )  
        })
    }
}

export default Patient