import * as api from "@/utils/apiHandler";
import {React, useEffect, useState} from "react";
import Head from "next/head";
import {getCookie, hasCookie, setCookie, deleteCookie, getCookies} from "cookies-next";
import {useRouter} from "next/navigation";

export default function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [agentInfo, setAgentInfo] = useState({});

  const [newSymbol, setNewSymbol] = useState('');
  const [newFaction, setNewFaction] = useState('');
  const [receivedToken, setReceivedToken] = useState()

  const [submittedToken, setSubmittedToken] = useState('')

  async function checkLogon() {
    if (hasCookie('jwt')) {
      try {
        const resp = await api.getMyAgent()
        setAgentInfo(resp.data.data);
        setLoggedIn(true)
      }
      catch(e) {
        console.log(e);
      }
    }
    else {
      setLoggedIn(false);
    }
  }

  function logon(submittedToken) {
    let cookies = getCookies();
    for (let i = 0; i < cookies.length; i++) {
      console.log(cookies[i])
    }

    setCookie('jwt', submittedToken);
    checkLogon();
  }

  function logoff() {
    setCookie('jwt',null);
  }

  async function createAgent() {
    const resp = await api.createMyAgent(['symbol', newSymbol], ['faction', newFaction])
    setReceivedToken(resp.data.data.token)
  }

  useEffect(() => {
    checkLogon();
  }, []);

  return (
      <div>
        <Head>
          <title>Page Title</title>
          <meta property="og:title" content="Page Title" key="title" />
        </Head>
        {
            loggedIn ?
                <div>
                  <strong>Welcome, {JSON.stringify(agentInfo.symbol)}.</strong>
                  <button onClick={logoff}>Log out?</button>
                </div> :
                <div>
                  <strong>CREATE AGENT</strong>
                  <input value={newSymbol}
                         placeholder='SYMBOL'
                         onChange={e => setNewSymbol(e.target.value)} />
                  <input value={newFaction}
                         placeholder={'FACTION'}
                         onChange={e => setNewFaction(e.target.value)} />
                  <button onClick={createAgent}>Submit</button>
                  <input value={receivedToken} readOnly={true}/>

                  <br/>-OR-<br/>
                  <strong>LOGIN</strong>
                  <input value={submittedToken}
                         placeholder='PASTE TOKEN HERE'
                         onChange={e => setSubmittedToken(e.target.value)} />
                  <button onClick={logon}>Submit</button>
                </div>
        }
      </div>
  )

}
