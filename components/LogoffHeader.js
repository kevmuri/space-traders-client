import * as api from "@/utils/apiHandler";
import {React, useEffect, useState} from "react";
import Head from "next/head";
import {getCookie, hasCookie, setCookie, deleteCookie, getCookies} from "cookies-next";
import {useRouter, redirect} from "next/navigation";

export default function LogoffHeader() {
  const [agentInfo, setAgentInfo] = useState({});
  const router = useRouter()

  async function checkLogon() {
    const resp = await api.getMyAgent();

    if (resp.status === 200) {
      setAgentInfo(resp.data.data);
    }
    else {
      logoff();
  }
}

  function logoff() {
    deleteCookie('jwt')
    router.push('/');
  }

  useEffect(() => {
    checkLogon();
  }, []);

  return (
      <div className='logoff'>
        <Head>
          <title>Page Title</title>
          <meta property="og:title" content="Page Title" key="title" />
        </Head>
        {
            <div>
                  <strong>Welcome, {JSON.stringify(agentInfo.symbol)} </strong>
                  <button onClick={logoff} className='btn'>Log out?</button>
                </div>
        }
      </div>
  )

}
