import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

var dataPoints = [];
CanvasJS.addColorSet("Amarillito",
	[//colorSet Array
		"#FFDB12",
	]);

class ChartR extends Component {
	render() {
		const options = {
			theme: "light2",
			animationEnabled: true,
			exportEnabled: true,
			zoomEnabled: true,
			colorSet: "Amarillito",
			title: {
				text: "Radiación"
			},
			axisY: {
				title: "Radiación Solar (W/m²)",
				includeZero: false,
			},
			axisX: {
				title: "Hora"
			},

			data: [{
				type: "area",
				//xValueFormatString: "MMM YYYY",
				// yValueFormatString: "$#,##0.00",
				toolTipContent: "Radiación: {y}",
				dataPoints: dataPoints
			}]
		}

		return (
			<div>
				<CanvasJSChart options={options}
					onRef={ref => this.chart = ref}
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>

		);
	}

	componentDidMount() {

		var chart = this.chart;
		var updateChart = function () {
			fetch('https://api.weather.com/v2/pws/observations/all/1day?stationId=IPUERTOC4&format=json&units=m&apiKey=8c1a32a8e11c4d819a32a8e11ccd81e7')
				.then(function (response) {
					return response.json();
				})
				.then(function (data) {
					for (var i = 0; i < data.observations.length; i++) {
						dataPoints.push({
							x: new Date(data.observations[i].obsTimeLocal),
							y: data.observations[i].solarRadiationHigh
						});
					}
					//console.log(dataPoints);
					chart.render();
					chart.options.data[0].dataPoints = dataPoints;
					dataPoints = [];
				})
				.catch(function (error) {

				});


			//dataPoints.shift();
		};

		setTimeout(function () { updateChart() }, 1000);
		setInterval(function () { updateChart() }, 900000);
	}
}
export default ChartR;                           