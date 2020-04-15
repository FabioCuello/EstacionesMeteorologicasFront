import React, { Component } from 'react';


var Data = [];
var HSP = 0;
var wind = [];
var HSPS = [];
class HPS extends Component {
    render() {
        return (

            <div>
                <button type="button" className="btn btn-warning">
                    Horas sol pico <span className="badge badge-light" id="demo"></span >
                </button>

                <table className="table table-sm" >
                    <thead>
                        <tr>
                            <th scope="col">Total Energía</th>
                            <td id="total"></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Solar</th>
                            <td id="solar"></td>
                        </tr>
                        <tr>
                            <th scope="row">Eólico</th>
                            <td id="eolico"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
    componentDidMount() {
        var updateData = function () {
            fetch('https://api.weather.com/v2/pws/observations/all/1day?stationId=IATLNTIC4&format=json&units=m&apiKey=8c1a32a8e11c4d819a32a8e11ccd81e7')
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    var n = 0;
                    for (var i = 0; i < data.observations.length; i++) {
                        n = new Date(data.observations[i].obsTimeLocal)
                        Data.push({
                            x: n.getHours(),
                            y: n.getMinutes(),
                            z: data.observations[i].solarRadiationHigh
                        });
                    }
                    if (Data.length > 1) {
                        var m = []; //minutos
                        var h = 0;
                        var temp = 0;
                        for (var j = 0; j < Data.length - 1; j++) {
                            m[j] = Data[j + 1].y - Data[j].y
                            //Aquí hago la resta de los minutos
                            if (m[j] < 0) {
                                //Si los minutos son negativos
                                h = Data[j + 1].x - 1 //Conversion de la hora para ver el tiempo transcurrido
                                temp = Data[j + 1].y + 60;
                                h = h - Data[j].x;
                                temp = temp - Data[j].y;
                                m[j] = h * 60 + temp;
                            }
                        }
                    }
                    for (var u = 0; u < m.length; u++) {
                        HSP = (HSP + (m[u] * Data[u + 1].z) / 60);
                    }
                    HSP = HSP / 1000;
                    HSP = Number(HSP.toFixed(3));
                    //poner un vector para almacenar las horas sol pico de cada día
                    var viento = localStorage.getItem('PV');
                    viento = JSON.parse(viento)
                    var hoy = new Date();
                    hoy = hoy.getDay()
                    HSPS[hoy] = HSP;
                    localStorage.setItem('HSPS', JSON.stringify(HSPS));
                    //console.log(hoy)
                    wind = viento[hoy]
                    var areapanel = 1.572;
                    var eficiencia = 0.11;
                    var EBC = HSP * areapanel * eficiencia * 1000;
                    EBC = Number(EBC.toFixed(3));
                    var total = wind + EBC;
                    var solar = (EBC / total) * 100
                    var eolico = (wind / total) * 100
                    total = Number(total.toFixed(3));
                    solar = Number(solar.toFixed(3));
                    eolico = Number(eolico.toFixed(3));
                    console.log(total, solar, eolico)
                    document.getElementById("demo").innerHTML = HSP + " kWh/m²";
                    document.getElementById("total").innerHTML = total + " Wh/d";
                    document.getElementById("solar").innerHTML = solar + "%";
                    document.getElementById("eolico").innerHTML = eolico + "%";
                    Data = [];
                    HSP = 0;
                })
                .catch(function (error) {

                });
        };
        setTimeout(function () { updateData() }, 1000);
        setInterval(function () { updateData() }, 900000);
    }
}
export default HPS;