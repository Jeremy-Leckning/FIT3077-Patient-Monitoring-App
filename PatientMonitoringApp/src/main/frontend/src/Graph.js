import React, { Component } from 'react'
import CanvasJSReact from './canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// class dataPoint {
//   constructor(label, y) {
//     this.label = label;
//     this.y = y;
//   }
// }

class Graph extends Component {	
    constructor(props) {
        super(props);
        this.generateDataPoints = this.generateDataPoints.bind(this);
    }

    generateDataPoints() {
      var dataPoints = [];
      var labelVal = "";
      var yVal = 0;
      {this.props.monitoredPatientList.map(function(patientObject){
        labelVal = patientObject.patientName;
        yVal = patientObject.cholesterolData.cholesterolValue;
        dataPoints.push({label: labelVal, y: yVal})
      })}
      return dataPoints
    }

  render() {
    const options = {
      theme: "dark2", // Different themes available: "light1", "dark1", "dark2"
			animationEnabled: true,
      zoomEnabled: true,
      width:1100,
      title: {
        text: "Total Cholesterol mg/dL",
      },
    
      data: [{				
                type: "column",
                dataPoints: this.generateDataPoints()
       }]
   }
		
   return (
      <div>
        <CanvasJSChart options = {options}
            /* onRef = {ref => this.chart = ref} */
        />
      </div>
    );
  }
}

export default Graph