import * as api from "@/utils/apiHandler";
import {React, useEffect, useState} from "react";
import {getCookie, hasCookie, setCookie, deleteCookie, getCookies} from "cookies-next";
import {useRouter, redirect} from "next/navigation";

export default function LogoffFooter() {
  const [agentSymbol, setAgentSymbol] = useState('');
  const router = useRouter()

  async function checkLogon() {
    const resp = await api.getMyAgent();

    if (resp.status === 200) {
      setAgentSymbol(resp.data.data.symbol);
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
        {
            <div>
                  <strong>Welcome, {JSON.stringify(agentSymbol)} </strong>
                  <button onClick={logoff} className='btn'>Log out?</button>
                </div>
        }
      </div>
  )

}
