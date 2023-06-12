import {getMyAgent, createMyAgent} from "@/utils/apiHandler";
import {React, useEffect, useState} from "react";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import ReactDOM from 'react-dom/client';

function createIntroduction() {
  return <div>Hello!</div>;
}

export default function Home() {
  const [agentInfo, setAgentInfo] = useState({});
  const [motd, setMOTD] = useState();

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

function createIntroduction() {
    return <div>Hello!</div>;
  }


  useEffect(() => {
    createIntroduction();
  }, []);

    return (
        <div>
          <createIntroduction />
        </div>
    );
}
