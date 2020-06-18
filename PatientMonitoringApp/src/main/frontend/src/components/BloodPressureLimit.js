import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';

class BloodPressureLimit extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateXY()
  }

  updateX = (e) => {
    localStorage.setItem("systolicX", e.target.value)
  }

  updateY = (e) => {
    localStorage.setItem("diastolicY", e.target.value)
  }

  render() {
    return <div>
      <Form inline onSubmit={this.handleSubmit}>
        <Form.Label column lg={2}>
          Systolic X Value
          </Form.Label>

        <Form.Control
          className="mb-2 mr-sm-2"
          id="inlineFormInputName2"
          defaultValue={localStorage.getItem("systolicX") ? localStorage.getItem("systolicX") : 0}
          disabled={!this.props.updatingXY}
          onChange={this.updateX}
        />
        <Form.Label column lg={2}>
          Diastolic Y Value
          </Form.Label>

        <Form.Control
          className="mb-2 mr-sm-2"
          id="inlineFormInputName2"
          defaultValue={localStorage.getItem("diastolicY") ? localStorage.getItem("diastolicY") : 0}
          disabled={!this.props.updatingXY}
          onChange={this.updateY}
        />
        <Button type="submit" className="mb-2">
          {this.props.updatingXY ? 'Submit' : 'Update'}
        </Button>
      </Form>
    </div>
  }
}

export default BloodPressureLimit 