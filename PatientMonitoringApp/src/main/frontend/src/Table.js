import React, { Component } from 'react'
import './table.css'

class Table extends Component {
    constructor(props) {
        super(props);
    }

    updateMonitoredPatientList = (patient) => {
        console.log(patient)
        this.setState({
            monitoredPatientList: this.state.monitoredPatientList.concat(patient)
        })
    }
    
    // renderTableData() {
    //     return this.state.patientList.map((patient, index) => {
    //        return (
    //           <tr key={patient.lastName}>
    //              <td>{patient.firstName}</td>
    //              <td>{patient.cholesterolValue}</td>
    //              <td>{patient.date}</td>
    //           </tr>
    //        )
    //     })
    //  }

     renderTableHeader() {
           return <tr><th key={0}>NAME</th> <th key={1}>CHOLESTEROL</th> <th key={2}>DATE</th><th key={3}>EXTRA</th></tr>
     }
  

    render() { 
        return <div>
        <h1 id='title'>Monitored Patients</h1>
            <table id='patients'>
               <tbody>
               {this.renderTableHeader()}
               {/* {this.state.search && this.getPatientCholesterol()} */}
               {!!this.props.monitoredPatientList.length && this.props.monitoredPatientList.map(function(patientObject){
                        console.log(patientObject)
                        return (
                            <tr>
                                <td>{patientObject.patientName}</td>
                                <td>{patientObject.data?patientObject.data.cholesterolValue:"-"}</td>
                                <td>{patientObject.data?patientObject.data.effectiveDateTime:"-"}</td>
                                <td><button onClick={() => alert("Patient ID: " + patientObject.patientId + "\nBirth Date:" + "\nGender: " + patientObject.info.gender +  "\nAddress: " + patientObject.info.address)}>Get Patient Details</button></td>
                            </tr>
                        )
                        })}
                    <tr>
                    </tr>
               </tbody>
            </table>
            
        </div>
        

    }
}

export default Table