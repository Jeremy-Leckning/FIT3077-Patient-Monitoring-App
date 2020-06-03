import React, { Component } from 'react'
import './table.css'
import Graph from './Graph'
import CholesterolTable from './CholesterolTable';
import BloodPressureTable from './BloodPressureTable';
import CombinedTable from './CombinedTable';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            tableView: 'Cholesterol Table'
        };
    }

    renderTableHeader() {
        console.log(this.state.tableView)
        if (this.state.tableView .match('Cholesterol Graph')) {
            return
        } else if (this.state.tableView.match('Cholesterol Table')){
            return <tr><th key={0}>NAME</th> <th key={1}>CHOLESTEROL</th> <th key={2}>DATE</th><th key={3}>EXTRA</th></tr>
        } else if (this.state.tableView.match('Blood Pressure Table')){
            return <tr><th key={0}>NAME</th> <th key={1}>Systolic Blood Pressure</th><th key={2}>Diastolic Blood Pressure</th><th key={3}>DATE</th><th key={4}>EXTRA</th></tr>
        } else if (this.state.tableView.match('Combined Table')){
            return <tr><th key={0}>NAME</th> <th key={1}>Total Cholesterol</th> <th key={2}>DATE</th><th key={3}>Systolic Blood Pressure</th><th key={4}>Diastolic Blood Pressure</th><th key={5}>Date</th><th key={6}>EXTRA</th></tr>
        }  else if (this.state.tableView.match('Blood Pressure Graph')){
            return <h1>SHOW BP GRAPH HERE</h1>
        }
        else {
            return <h1>No view</h1>
        }
        
    }

    renderTableTitle(title) {
        this.setState({
            tableView: title
        })
    }

    renderTableData() {
        if (this.state.tableView .match('Cholesterol Graph')) {
            return <Graph monitoredPatientList={this.props.monitoredPatientList} />
        } else if (this.state.tableView.match('Cholesterol Table')){
            return <CholesterolTable monitoredPatientList={this.props.monitoredPatientList} averageCholesterol={this.props.averageCholesterol} />
        } else if (this.state.tableView.match('Blood Pressure Table')){
            return <BloodPressureTable monitoredPatientList={this.props.monitoredPatientList} />
        } else if (this.state.tableView.match('Combined Table')){
            return <CombinedTable monitoredPatientList={this.props.monitoredPatientList} averageCholesterol={this.props.averageCholesterol} />
        }  else if (this.state.tableView.match('Blood Pressure Graph')){
            return <h1>SHOW BP GRAPH HERE</h1>
        }
        else {
            return <h1>No view</h1>
        }
    }

    render() {
        return <div>
            {this.state.isLoading && <h6>Loading...</h6>}
            <div>
                <div class="dropdown" style={{float: 'left'}} >
                    <button class="dropbtn">Change View</button>
                    <div class="dropdown-content">
                        <a onClick = {() => {this.renderTableTitle("Cholesterol Graph")}} style={{cursor: 'pointer'}}>Cholesterol Graph</a>
                        <a onClick = {() => {this.renderTableTitle("Cholesterol Table")}} style={{cursor: 'pointer'}}>Cholesterol Table</a>
                        <a onClick = {() => {this.renderTableTitle("Blood Pressure Table")}} style={{cursor: 'pointer'}}>Blood Pressure Table</a>
                        <a onClick = {() => {this.renderTableTitle("Combined Table")}} style={{cursor: 'pointer'}}>Combined Table</a>
                        <a onClick = {() => {this.renderTableTitle("Blood Pressure Graph")}} style={{cursor: 'pointer'}}>Blood Pressure Graph</a>
                    </div>
                </div>
                <h1 id='title' style={{ display: 'inlineBlock' }}>
                    {this.state.tableView.length?this.state.tableView:'no view'}
                </h1>
            </div>
            
            <div style={{ height: '80vh', overflow: 'auto' }}>
                <table id='patients'>
                    <tbody>
                        {this.renderTableHeader()}
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        </div>


    }

}
export default Table