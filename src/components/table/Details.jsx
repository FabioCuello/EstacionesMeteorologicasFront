import React, { Component } from 'react';
class details extends Component {
  render() {
    return (
      <div>
        <table className="table table-sm" >
          <thead style={{ whiteSpace: "nowrap" }}>
            <tr className="bg-warning">
              <th scope="col">Panel Solar</th>
              <th scope="col">Turbina Eólica</th>
            </tr>
          </thead>
          <tbody style={{ whiteSpace: "nowrap" }}>
            <tr>
              <td id="eficienciaP"></td>
              <td id="TSR"></td>
            </tr>
            <tr>
              <td></td>
              <td id="eficienciaT"></td>
            </tr>
            <tr>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  componentDidMount() {
    var eficienciaTurbina = 0.34;
    var TSR = 6.37;
    var eficienciaPanel = 0.11;
    document.getElementById("eficienciaP").innerHTML = "Eficiencia: " + eficienciaPanel;
    document.getElementById("TSR").innerHTML = "TSR: " + TSR;
    document.getElementById("eficienciaT").innerHTML = "Eficiencia: " + eficienciaTurbina;
  }
}
export default details;