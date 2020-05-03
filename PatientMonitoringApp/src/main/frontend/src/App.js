import React, {useState, useEffect} from 'react';
import './App.css';
import axios from "axios"
import Search from './Search'

const Patients = () => {

  const [patients, setPatients] = useState([]);
  const fetchPatients = () => {
    axios.get("http://localhost:8080/api/v1/patient-data").then(res => {
      console.log(res);
      setPatients(res.data);
    })
  }

  useEffect( () => {
    fetchPatients();
  }, []);

  return patients.map((patient, index) => {
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

const submitPractitionerId = (practiionerId) => {
  console.log(practiionerId)
}

function App() {
  return (
    <div className="App">
      <Search />
        <Patients />
    </div>
  );
}

export default App;
