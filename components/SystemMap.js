import * as api from "@/utils/apiHandler";
import {React, useEffect, useState} from "react";
import Chart from 'chart.js/auto'

export default function SystemMap() {
  const [waypoints, setWaypoints] = useState({})
  const [currentSystem, setCurrentSystem] = useState('')

  async function buildMap() {
    const resp = await api.getWaypoints(currentSystem);
    const respData = resp.data.data;
    setWaypoints(respData);

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
    for (let i = 0; i < respData.length; i++) {
      waypoint = {
        x: respData[i]['x'],
        y: respData[i]['y'],
        data: {
          symbol: respData[i]['symbol'],
          type: respData[i]['type'],
          orbitals: respData[i]['orbitals'],
          traits: respData[i]['traits'],
          faction: respData[i]['faction']
        }
      }

      myData.datasets[0]['data'].push(waypoint);
    }

    const ctx = document.getElementById('myChart').getContext('2d');
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
        <br/>
          <button onClick={buildMap} className='btn'>Build Map</button>
      </>
  )
}