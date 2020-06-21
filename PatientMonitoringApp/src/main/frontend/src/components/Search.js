import React, { Component } from 'react'
import axios from "axios"
import { Form, Button, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Row>
                            <Form.Label column lg={2}>
                                Practitioner Identifier
                            </Form.Label>
                            
                            <Col xs={7}>
                                <Form.Control value={this.props.practitionerIdentifier} required onChange={this.updatepractitionerIdentifier} type="text" placeholder="Enter your Health Practitioner Identifier" />
                            </Col>
                            <Button disabled={this.state.isLoading} variant="primary" type="submit" >
                                {this.state.isLoading ? 'Loading…' : 'Submit'}
                            </Button>
                        </Form.Row>
                    </Form.Group>
                </Form>
        </div>
    }
}

export default Search