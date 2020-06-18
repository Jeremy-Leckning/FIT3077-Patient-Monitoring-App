import React, { Component } from 'react'
import '../App.css';
import { Form, Button, Col } from 'react-bootstrap';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cholesterolUpdateFrequency: localStorage.getItem("frequency")?localStorage.getItem("frequency"):30,
            updatingCholesterolFrequency: false,
            time: 0
        };
        this.refreshTimer = this.refreshTimer.bind(this)

    }

    // Changes the frequency at which cholesterol is updated
    updateMonitoredFrequency() {
        this.setState({
            time: this.state.cholesterolUpdateFrequency
        }, ()=> {localStorage.setItem("frequency", this.state.cholesterolUpdateFrequency)})
    }

    handleChange = (e) => {
        this.setState({
            cholesterolUpdateFrequency: e.target.value
        })
    }

    // sets the frequency and calls refresh
    updatingCholesterolFrequencyChange = () => {
        if (this.state.updatingCholesterolFrequency) {
            this.updateMonitoredFrequency()
            clearInterval(this.timer)
            this.refreshTimer()
        }
        this.setState({
            updatingCholesterolFrequency: !this.state.updatingCholesterolFrequency
        })
    }

    // resets the timer for updates
    refreshTimer() {
        this.setState({
            time: this.state.cholesterolUpdateFrequency
        })
        clearInterval(this.timer)
        this.timer = setInterval(() => {
            if (!this.state.time) {
                console.log("Restarting Timer")
                this.props.updateMonitoredPatientCholesterol()
                this.setState({ time: this.state.cholesterolUpdateFrequency })
            } else {
                this.setState({ time: this.state.time - 1 })
            }
        }, 1000);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.updatingCholesterolFrequencyChange();
    }

    render() {
        if (!this.timer) {
            this.refreshTimer()
        }
        return (
            <div className="App">
                <Form inline onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Col xs="auto">
                            {!!this.state.updatingCholesterolFrequency ?
                                <Form.Control min="0" value={this.state.cholesterolUpdateFrequency} required onChange={this.handleChange} type="number" placeholder="Time in seconds" />
                                :<h4>Refresh Timer(s): {this.state.time}</h4>
                            }
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit">Update</Button>
                        </Col>
                    </Form.Row>
                </Form>
            </div>
        );
    }
}

export default Timer;
