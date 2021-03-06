import React, { Component } from 'react'
import CanvasJSReact from '../canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class CholesterolGraph extends Component {	
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
        dataPoints.push({label: labelVal, y: yVal, indexLabel: yVal.toString()})
      })}
      return dataPoints
    }

  render() {
    const options = {
      theme: "dark2", // Different themes available: "light1", "dark1", "dark2"
			animationEnabled: true,
      zoomEnabled: true,
      width: 1600,
      height: 600,
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
        />
      </div>
    );
  }
}

export default CholesterolGraph