import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class SystolicBloodPressureGraph extends Component {
  constructor() {
    super();
    this.generateDataPoints = this.generateDataPoints.bind(this);
  }

  generateDataPoints() {
    let arrayPatient = [];

    let patientDataString = localStorage.getItem("monitoredBP");
    arrayPatient = patientDataString.split("\n");

    let patientName = "";
    let data = [];
    let re = /:\s|,\s/; // Splitting on re ('space', ':' and ',')
    for (var i = 0; i < arrayPatient.length; i++) {
      let array = arrayPatient[i].split(re);
      patientName = array[0];

      let patientBP = [];
      for (var j = 1; j < array.length; j++) {
        patientBP.push(parseInt(array[j].split(" ")[0]));
      }

      let patientData = {
        name: patientName,
        systolicBP: patientBP,
      };
      data.push(patientData);
    }
    return data;
  }

  generateGraph() {
    let patientData = this.generateDataPoints();
    let graphOptions = [];

    for (var k = 0; k < patientData.length; k++) {
      let systolicBP = patientData[k].systolicBP;
      let dps = [];
      for (var l = 0; l < systolicBP.length; l++) {
        dps.push({ x: l + 1, y: systolicBP[l] });
      }
      let options = {
        theme: "light2", // "light1", "dark1", "dark2"
        animationEnabled: true,
        zoomEnabled: true,
        width: 1500,
        title: {
          text: patientData[k].name,
        },
        axisY: {
          includeZero: false,
        },
        data: [
          {
            type: "line",
            dataPoints: dps,
          },
        ],
      };
      graphOptions.push(options);
    }

    return graphOptions;
  }

  render() {
    let graphOptions = this.generateGraph();

    return graphOptions.map((option, index) => {
      return (
        <CanvasJSChart
          key={index}
          options={option}
          /* onRef={ref => this.chart = ref} */
        />
      );
    });
  }
}

export default SystolicBloodPressureGraph;
