import React from 'react';
import CanvasJSReact from '../canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
function Graphic(props) {
    const options = {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        zoomEnabled: true,
        colorSet: "Amarillito",
        title: {
            text: props.titleText
        },
        axisY: {
            title: props.axisYTittle,
            includeZero: false,
        },
        axisX: {
            title: props.axisXTittle
        },

        data: [{
            type: props.type,
            //xValueFormatString: "MMM YYYY",
            // yValueFormatString: "$#,##0.00",
            toolTipContent: props.toolTipContent,
            dataPoints: props.dataPoints
        }]
    }
    return <div className="col-lg-6 col-md-6 col-sm-12">
        <div className="Cuadro"> <CanvasJSChart options={options} /></div>
    </div>
}



export default Graphic 