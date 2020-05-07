import React, { useState, useEffect } from 'react';
import Navbar from './navbar'
import Table from './table/Table';
import Graphic from './Graphic'
import { TIME_UPDATE, APP_ORIGIN } from "../config/index"

function App() {

  let dias = ['D', 'L', 'M', 'Mier', 'J', 'V', 'S'];
  const [data, setData] = useState({ radiation: [], wind: [], HSPweek: [], VX: [] })

  // DATA
  async function UpdateCharR() {
    let UpdateCharRVector = []
    try {
      const dataPointsJson = await fetch(`${APP_ORIGIN}/radiation`)
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
    catch (error) {
      console.log("Un error ha ocurrido Actualizando Gráfica de radiación: " + error)
    }
  }

  async function UpdateCharV() {
    let UpdateCharVVector = []
    try {
      const dataPointsJson = await fetch(`${APP_ORIGIN}/wind`)
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
    catch (error) {
      console.log("Un error ha ocurrido Actualizando Gráfica de Viento: " + error)
    }
  }

  async function HSPsemanal() {
    let HSPsemanalVector = []
    var hoy = new Date();
    hoy = hoy.getDay()
    const dataPointsJson = await fetch(`${APP_ORIGIN}/PanelEnergy`)
    const dataPoints = await dataPointsJson.json()
    for (var i = 0; i <= hoy; i++) {
      HSPsemanalVector.push({
        label: dias[i],
        y: dataPoints[i]
      });
    }
    setData(prev => { return { ...prev, HSPweek: HSPsemanalVector } })
  }

  async function VX() {
    let VXvector = []
    var hoy = new Date();
    hoy = hoy.getDay()
    const dataPointsJson = await fetch(`${APP_ORIGIN}/emuEnergy`)
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
    setData(prev => { return { ...prev, VX: VXvector } })
  }

  useEffect(() => {

    // update firt time all the functions to display the graphics
    UpdateCharV()
    HSPsemanal()
    VX()
    UpdateCharR()

    // set interval to update graphics
    setInterval(() => {
      console.log(APP_ORIGIN)
      UpdateCharV()
      HSPsemanal()
      VX()
      UpdateCharR()
    }, TIME_UPDATE);
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
            <Graphic dataPoints={data.VX} axisXTittle="Días" axisYTittle="kWh" titleText="Energía Estimada Emulador WT UniGRID" type="column" toolTipContent="{label}: {y}" />
            <Graphic dataPoints={data.HSPweek} axisXTittle="Días" axisYTittle="Wh" titleText="Energía Estimada Panel Bloque C" type="column" toolTipContent="{label}: {y}" />
          </div>
        </section>
      </div>
    </div>
  );
}
export default App;

