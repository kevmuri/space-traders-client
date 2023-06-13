import * as api from "@/utils/apiHandler";
import {React, useEffect, useState} from "react";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import styles from '@/styles.module.css';

export default function Home() {
  const [agentInfo, setAgentInfo] = useState({});
  const [myContracts, setMyContracts] = useState({})


  async function getAgentInfo() {
      let resp = await api.getMyAgent();
      const respData = resp.data.data;
      console.log(respData)
      setAgentInfo(respData);
    }


    async function createAgent() {
      const resp = await api.createMyAgent();

      if (resp.status === 201) {
          let token = 'export const jwt = \'' + resp.data.data.token +'\'';
          let hiddenElement = document.createElement('a');
          hiddenElement.href = 'data:attachment/text,' + encodeURI(token);
          hiddenElement.target = '_blank';
          hiddenElement.download = 'jwt.js';
          hiddenElement.click();
      }

      console.log(resp);
    }

    async function viewWaypoints() {
      const resp = await api.getContracts();
      const respData = resp.data;
      console.log(respData)
      setMyContracts(respData)
    }

  useEffect(() => {
    getAgentInfo();
  }, []);

return (
    <body className={styles.body}>
      <div className={styles.rootContainer}>
        <div>
          { agentInfo.symbol
              ? <div>Welcome, {JSON.stringify(agentInfo.symbol)}.</div>
              : <div>No agent found. <button onClick={createAgent}>Create Agent?</button></div>
          }
          <br/>
          <div>Headquarters: {JSON.stringify(agentInfo.headquarters)}</div>
          <div>Credits: {JSON.stringify(agentInfo.credits)}</div>
          <div>Faction: {JSON.stringify(agentInfo.startingFaction)}</div>
        </div>
        <br/>
        <button onClick={viewContracts} className={styles.buttons}>Get Contracts</button>
      </div>
    </body>
)
}
