import {getMyAgent, createMyAgent} from "@/utils/apiHandler";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import {React, useState} from "react";

const [agentInfo, setAgentInfo] = useState({});


async function getAgentInfo() {
  let resp = await getMyAgent();
  const respData = resp.data.data;
  console.log(respData)
  setAgentInfo(respData);
}

async function createAgent() {
  let resp = await createMyAgent();

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

