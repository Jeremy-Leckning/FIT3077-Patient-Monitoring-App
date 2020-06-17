import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class SystolicBloodPressureGraph extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
    this.generateDataPoints = this.generateDataPoints.bind(this);
  }

  generateXPoints() {
    var dps = [
      { x: 1, y: 100 },
      { x: 2, y: 120 },
      { x: 3, y: 118 },
      { x: 4, y: 140 },
      { x: 5, y: 125 },
    ];
    return dps;
  }

  generateDataPoints() {
    let arrayPatient = [];
    let dataPointsArray = [];
    // let testString =
    //   "Adan632 Rogahn59: 83 (2019-07-29T05:18:24.019+10:00), 80 (2018-07-23T05:18:24.019+10:00), 70 (2017-07-17T05:18:24.019+10:00), 83 (2016-07-11T05:18:24.019+10:00), 77 (2015-07-06T05:18:24.019+10:00)\nJenny Rose: 83 (2019-07-29T05:18:24.019+10:00), 80 (2018-07-23T05:18:24.019+10:00), 70 (2017-07-17T05:18:24.019+10:00), 83 (2016-07-11T05:18:24.019+10:00), 77 (2015-07-06T05:18:24.019+10:00)\nTOM CRUISE: 83 (2019-07-29T05:18:24.019+10:00), 80 (2018-07-23T05:18:24.019+10:00), 70 (2017-07-17T05:18:24.019+10:00), 83 (2016-07-11T05:18:24.019+10:00), 77 (2015-07-06T05:18:24.019+10:00)\n";
    let testString = localStorage.getItem("monitoredBP");
    arrayPatient = testString.split("\n");

    let patientName = "";
    let data = [];
    let re = /:\s|,\s/;
    for (var i = 0; i < arrayPatient.length; i++) {
      let array = arrayPatient[i].split(re);
      // patientName = arrayPatient[i].split(":", 1)
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

    // return <div> {data[0].systolicBP[4]} </div>
  }

  generateTest()
  {
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
    
    console.log("OPTIONS")
    console.log(graphOptions[0].data)
    return graphOptions
  }

  render() {
    let test = [
      {
        theme: "light2", // "light1", "dark1", "dark2"
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: "Try Zooming and Panning",
        },
        axisY: {
          includeZero: false,
        },
        data: [
          {
            type: "line",
            dataPoints: this.generateXPoints(),
          },
        ],
      },
      {
        theme: "dark2", // "light1", "dark1", "dark2"
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: "Try Zooming and Panning",
        },
        axisY: {
          includeZero: false,
        },
        data: [
          {
            type: "line",
            dataPoints: this.generateXPoints(),
          },
        ],
      },
    ];

    let graphOptions = this.generateTest()


    return graphOptions.map((option, index) => {
      return (
        <CanvasJSChart key={index} options={option} />
        // <div> Hello </div>
        /* onRef={ref => this.chart = ref} */
      );
    });
  }
}

export default SystolicBloodPressureGraph;
