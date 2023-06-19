import * as api from "@/utils/apiHandler";
import {React, useEffect, useState} from "react";
import Chart from 'chart.js/auto'

export default function SystemMap() {
  const [pageQuantity, setPageQuantity] = useState()
  const [currentSystem, setCurrentSystem] = useState('')

  async function buildMap() {

    let waypoints = []
      const resp = await api.getWaypoints(currentSystem);
      const respData = resp.data.data;
      for (let j = 0; j < respData.length; j++) {
        waypoints.push(respData[j]);
      }

    console.log(waypoints)

    let myData = {
      datasets: [{
        label: currentSystem,
        data:[],
        color: '#FFF',
        borderColor: '#FFF',
        backgroundColor: '#FFF'
      }]
    };

    let waypoint = {};
    for (let i = 0; i < waypoints.length; i++) {
      waypoint = {
        x: waypoints[i]['x'],
        y: waypoints[i]['y'],
        data: {
          symbol: waypoints[i]['symbol'],
          type: waypoints[i]['type'],
          orbitals: waypoints[i]['orbitals'],
          traits: waypoints[i]['traits'],
          faction: waypoints[i]['faction']
        }
      }

      myData.datasets[0]['data'].push(waypoint);
    }

    const ctx = document.getElementById('myChart').getContext('2d');

    let chartStatus = Chart.getChart("myChart"); // <canvas> id
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
    const myChart = new Chart(ctx, {
      type: 'scatter',
      data: myData,
      options: {
        aspectRatio: 1,
        responsive: true,
        scales: {
          x: {
            grid: {
              color: "#FFF"
            }
          },
          y: {
            grid: {
              color: "#FFF"
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              afterLabel: (context) => {
                return  JSON.stringify(context.raw, null, 2)
              }
            }
          }
        }
      }
    })
  }

  return (
      <>
          <h1>
            {
              currentSystem ? currentSystem : 'ENTER SYSTEM TO MAP'
            }
          </h1>
        <br/>
        <canvas id='myChart' />
        <br/>
          <input
            value={currentSystem}
            onChange={e => setCurrentSystem(e.target.value)}
            placeholder='SYSTEM'
          />
          <input
            value={pageQuantity}
            onChange={e => setPageQuantity(e.target.value)}
            placeholder='# OF PAGES'
          />
        <br/>
          <button onClick={buildMap} className='btn'>Build Map</button>
      </>
  )
}