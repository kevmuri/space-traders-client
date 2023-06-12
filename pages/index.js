import {getMyAgent, createMyAgent} from "@/utils/apiHandler";
import {React, useEffect, useState} from "react";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import {create} from "axios";

export default function Home() {
  const [agentInfo, setAgentInfo] = useState('');

  async function getAgentInfo() {
      let resp = await getMyAgent();
      const respData = JSON.stringify(resp.data.data);
      console.log(respData)
      setAgentInfo(respData);
    }

    async function createAgent() {
      let resp = await createMyAgent();
      console.log(resp)
    }

  return (
      <div>
          <button onClick={getAgentInfo}>Get Agent Info</button>
          <strong>{agentInfo}</strong>
          <button onClick={createAgent}>Create Agent</button>
      </div>
  );
}
