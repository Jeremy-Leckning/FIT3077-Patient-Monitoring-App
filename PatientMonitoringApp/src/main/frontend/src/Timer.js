import React, { Component } from 'react'
import './App.css';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cholesterolUpdateFrequency: 30,
            updatingCholesterolFrequency: false,
            time: 0
        };
        this.refreshTimer = this.refreshTimer.bind(this)

    }

    // Changes the frequency at which cholesterol is updated
    updateMonitoredFrequency() {
        this.setState({
            time: this.state.cholesterolUpdateFrequency
        })
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

    render() {
        if (!this.timer) {
            this.refreshTimer()
        }
        return (
            <div className="App">
                <label>Cholesterol Update Frequency in seconds:
                {' '}
                    {!this.state.updatingCholesterolFrequency && this.state.cholesterolUpdateFrequency}
                    {!!this.state.updatingCholesterolFrequency &&
                        <label>
                            <input type="number" id="quantity" name="quantity" min="0" value={this.state.cholesterolUpdateFrequency} onChange={this.handleChange} />
                        </label>}
                    <button onClick={this.updatingCholesterolFrequencyChange}>Update</button>

                </label>
                <h3>Refresh Timer(s): {this.state.time}</h3>
            </div>
        );
    }
}

export default Timer;
