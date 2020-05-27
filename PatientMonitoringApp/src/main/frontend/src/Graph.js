import React, { Component } from 'react'
import CanvasJSReact from './canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class Graph extends Component {	
  render() {
    const options = {
      title: {
        text: "Total Cholesterol mg/dL"
      },
      data: [{				
                type: "column",
                dataPoints: [
                    { label: "Jane",  y: 150 },
                    { label: "Tom", y: 100  },
                    { label: "Sara", y: 200  },
                    { label: "Sam",  y: 170  }
                ]
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