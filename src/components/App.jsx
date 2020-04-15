import React, { useState, useEffect } from 'react';
import Navbar from './navbar'
import Table from './table/Table';
import '../App.css';
import '../bootstrap-social.css'
import Graphic from './Graphic'

function App() {

  let dias = ['D', 'L', 'M', 'Mier', 'J', 'V', 'S'];
  const [data, setData] = useState({ radiation: [], wind: [], HSPweek: [], VX: [] })

  // DATA
  async function UpdateCharR() {
    let UpdateCharRVector = []
    const dataPointsJson = await fetch("http://34.219.130.100:3001/radiation")
    const dataPoints = await dataPointsJson.json()
    dataPoints.map((data) => {
      UpdateCharRVector.push({
        x: new Date(data.x),
        y: data.y
      })
    })
    setData(prev => {
      return { ...prev, radiation: UpdateCharRVector }
    })
  }

  async function UpdateCharV() {
    let UpdateCharVVector = []
    const dataPointsJson = await fetch("http://34.219.130.100:3001/wind")
    const dataPoints = await dataPointsJson.json()
    dataPoints.map((data) => {
      UpdateCharVVector.push({
        x: new Date(data.x),
        y: data.y
      })
    });
    setData(prev => {
      return { ...prev, wind: UpdateCharVVector }
    })
  }

  async function HSPsemanal() {
    let HSPsemanalVector = []
    var hoy = new Date();
    hoy = hoy.getDay()
    const dataPointsJson = await fetch('http://34.219.130.100:3001/PanelEnergy')
    const dataPoints = await dataPointsJson.json()
    for (var i = 0; i <= hoy; i++) {
      HSPsemanalVector.push({
        label: dias[i],
        y: dataPoints[i]
      });
    }
    setData(prev => {
      return { ...prev, HSPweek: HSPsemanalVector }
    })
  }

  async function VX() {
    let VXvector = []
    var hoy = new Date();
    hoy = hoy.getDay()
    const dataPointsJson = await fetch('http://34.219.130.100:3001/emuEnergy')
    const dataPoints = await dataPointsJson.json()
    // --------
    localStorage.setItem('PV', JSON.stringify(dataPoints));
    // --------
    for (var i = 0; i <= hoy; i++) {
      VXvector.push({
        label: dias[i],
        y: dataPoints[i]
      });
    }
    setData(prev => {
      console.log(VXvector)
      return { ...prev, VX: VXvector }
    })
  }

  useEffect(() => {
    setTimeout(() => {
      UpdateCharV()
      HSPsemanal()
      VX()
      UpdateCharR()
    }, 1);
    setInterval(() => {
      UpdateCharV()
      HSPsemanal()
      VX()
      UpdateCharR()
    }, 15000);
  }, [])


  return (
    <div className="principal" >
      <Navbar />
      <div className="container">
        <Table />
        <section id="graficas">
          <div className="row">
            <Graphic dataPoints={data.wind} axisXTittle="Hora" axisYTittle="Velocidad (m/s)" titleText="Velocidad del Viento" type="stepLine" toolTipContent="Velocidad: {y}" />
            <Graphic dataPoints={data.radiation} axisXTittle="Hora" axisYTittle="Radiación Solar (W/m²)" titleText="Radiación" type="area" toolTipContent="Radiación: {y}" />
          </div>
          <div className="row">
            <Graphic dataPoints={data.HSPweek} axisXTittle="Días" axisYTittle="Wh" titleText="Energía Estimada Panel Bloque C" type="column" toolTipContent="{label}: {y}" />
            <Graphic dataPoints={data.VX} axisXTittle="Días" axisYTittle="kWh" titleText="Energía Estimada Emulador WT UniGRID" type="column" toolTipContent="{label}: {y}" />
          </div>
        </section>
      </div>
    </div>
  );
}
export default App;

