import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints = [];
class HSPsemanal extends Component {
	render() {
		const options = {
			theme: "light2",
			animationEnabled: true,
			exportEnabled: true,
			zoomEnabled: true,
			title: {
				text: "Energía Estimada Panel Bloque C"
			},
			axisY: {
				title: "kWh",
				includeZero: false,
			},
			axisX: {
				title: "Días"
			},

			data: [{
				type: "column",
				toolTipContent: "{label}: {y}",
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
			fetch('http://localhost:3001/EnergiaBloqueC')
				.then(function (response) {
					return response.json();
				})
				.then(function (data) {

					var hoy = new Date();
					hoy = hoy.getDay()
					//data = JSON.parse(data)
					console.log(data);
					var dias = ['D', 'L', 'M', 'Mier', 'J', 'V', 'S'];
					for (var i = 0; i <= hoy; i++) {
						dataPoints.push({
							label: dias[i],
							y: data[i]
						});
					}
					chart.render();
					chart.options.data[0].dataPoints = dataPoints;
					dataPoints = [];
				})
				.catch(function (error) {

				});
		};
		setTimeout(function () { updateChart() }, 1000);
		setInterval(function () { updateChart() }, 900000);

	}
}
export default HSPsemanal;                           