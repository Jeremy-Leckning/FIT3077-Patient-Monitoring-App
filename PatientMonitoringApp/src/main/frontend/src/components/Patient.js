import React, { Component } from 'react'
import { Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Patient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
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
            <Table responsive striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>Name</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {!!this.props.patientList.length && this.props.patientList.map((patient, index) => {
                return (
                    <tr key={patient}>
                        <td>{patient.patientName}</td>
                        <td>
                            <Button disabled={this.state.isLoading} value={JSON.stringify(patient)} onClick={this.updateMonitoredPatientList} variant="primary">{!patient.inMonitored ? "Add to monitor" : "Remove from monitor"}</Button>{' '}
                        </td>
                    </tr>
                )
            })}
            </tbody>
            </Table>
        </div>
    }
}

export default Patient