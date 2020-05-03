import React, { Component } from 'react'
import axios from "axios"

class Search extends Component {
    constructor() {
        super();
        this.state = {
            practitionerId: '',
            patientList: []
        };
        this.updatePractitionerId = this.updatePractitionerId.bind(this)
    }

    getPatientList = () => {
        axios.get("http://localhost:8080/api/v1/patient-list?practitionerId="+this.state.practitionerId).then(res => {
            console.log(res);
            this.setState({
                patientList: res.data
            })
        })
    }

    updatePractitionerId(e) {
        this.setState({
            practitionerId: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.practitionerId);
        this.getPatientList();
    }

    render() { 
        return <div>
            <h1>Hello {this.state.practitionerId}</h1>
            <form onSubmit={this.handleSubmit}>
                <label>Practitioner ID:
                    <input type="text" value={this.state.practitionerId} required onChange={this.updatePractitionerId}/>
                    <input type="submit" value = "Search"/>
                </label>
            </form>
            <h1>Patient List: {this.state.patientList.length?this.state.patientList:"[]"}</h1>
        </div>
        

    }
}

export default Search