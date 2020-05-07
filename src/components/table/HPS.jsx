import React, { Component } from 'react';
import { TIME_UPDATE, APP_ORIGIN } from "../../config/index"

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
        var updateData = async function () {
            try {
                const dataPointsJson = await fetch(`${APP_ORIGIN}/HSP`)
                const dataHSP = await dataPointsJson.json()
                //poner un vector para almacenar las horas sol pico de cada día
                var viento = localStorage.getItem('PV');
                viento = JSON.parse(viento)
                var hoy = new Date();
                hoy = hoy.getDay()
                HSPS[hoy] = dataHSP;
                localStorage.setItem('HSPS', JSON.stringify(HSPS));
                wind = viento[hoy]
                var areapanel = 1.572;
                var eficiencia = 0.11;
                var EBC = dataHSP * areapanel * eficiencia * 1000;
                EBC = Number(EBC.toFixed(3));
                var total = wind + EBC;
                var solar = (EBC / total) * 100
                var eolico = (wind / total) * 100
                total = Number(total.toFixed(3));
                solar = Number(solar.toFixed(3));
                eolico = Number(eolico.toFixed(3));
                document.getElementById("demo").innerHTML = dataHSP + " kWh/m²";
                document.getElementById("total").innerHTML = total + " Wh/d";
                document.getElementById("solar").innerHTML = solar + "%";
                document.getElementById("eolico").innerHTML = eolico + "%";
            }
            catch (error) {
                console.log("Ha ocurrido un error actualizando HSP, P.Eolico y Solar")
            }
        };
        setTimeout(function () { updateData() }, 1000);
        setInterval(function () { updateData() }, TIME_UPDATE);
    }
}
export default HPS;