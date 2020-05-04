import React, { Component } from 'react'
import axios from "axios"
import './table.css'

class Search extends Component {
    constructor() {
        super();
        this.state = {
            practitionerId: '',
            patientList: []
        };
        this.updatePractitionerId = this.updatePractitionerId.bind(this)
    }

    test = [];
    getPatientList = () => {
        axios.get("http://localhost:8080/api/v1/patient-data?practitionerId="+this.state.practitionerId).then(res => {
            this.setState({
                patientList: this.state.patientList.concat(res.data[0])
              })
            console.log(this.state.patientList[0]);
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

    renderTableData() {
        return this.state.patientList.map((patient, index) => {
           return (
              <tr key={patient.lastName}>
                 <td>{patient.firstName}</td>
                 <td>{patient.cholesterolValue}</td>
                 <td>{patient.date}</td>
              </tr>
           )
        })
     }

     renderTableHeader() {
           return <tr><th key={0}>NAME</th> <th key={1}>CHOLESTEROL</th> <th key={2}>DATE</th></tr>
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
            {/* <h1>Patient List: {this.state.patientList.length?this.state.patientList:"[]"}</h1> */}
   
            {/* {this.state.patientList.map((patient, index) => (
                <p>Patient name: {patient.firstName} {patient.lastName}, Total cholesterol: {patient.cholesterolValue}, DATE: {patient.date}!</p>
            ))}  */}

        <h1 id='title'>Monitored Patients</h1>
            <table id='patients'>
               <tbody>
               {this.renderTableHeader()}
                {this.renderTableData()}
               </tbody>
            </table>
            
        </div>
        

    }
}

export default Search