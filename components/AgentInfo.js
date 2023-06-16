import * as api from "@/utils/apiHandler";
import {React, useEffect, useState} from "react";

export default function AgentInfo() {
  const [agentInfo, setAgentInfo] = useState({});

  async function load() {
    getAgentInfo();
    const timer = setTimeout(async () => {
      getAgentInfo();
    }, 15000);

  }

  async function getAgentInfo() {
    const resp = await api.getMyAgent();
    const respData = resp.data.data
    setAgentInfo(respData)
  }

  useEffect(() => {
    load();
  }, []);



  return (
      <div>
        HQ: {agentInfo.headquarters} | Credits: {agentInfo.credits}
      </div>
  )
}