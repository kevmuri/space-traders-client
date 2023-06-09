import {getMyAgent} from "@/utils/apiHandler";
import {React, useEffect, useState} from "react";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";

export default function Home() {
  const [agentInfo, setAgentInfo] = useState('');

  async function getAgentInfo() {
      const resp = await getMyAgent();
      const respData = resp.data['symbol'];
      setAgentInfo(respData);
    }

  return (
      <div>
          <button onClick={getAgentInfo}>Button</button>
          <strong>{agentInfo}</strong>
      </div>
  );
}
