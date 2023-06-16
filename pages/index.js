import * as api from "../utils/apiHandler";
import {React, useEffect, useState} from "react";
import Head from "next/head";
import {useRouter, redirect} from "next/navigation";
import {deleteCookie, hasCookie, setCookie} from "cookies-next";

export default function Index() {
  const [newSymbol, setNewSymbol] = useState('');
  const [newFaction, setNewFaction] = useState('');
  const [receivedToken, setReceivedToken] = useState()
  const [submittedToken, setSubmittedToken] = useState('')
  const router = useRouter()

  async function checkLogon() {
    if (hasCookie('jwt')) {
      const resp = await api.getMyAgent();
      if (resp.status === 200) {
        router.push('/Home');
      }
    }
  }

  async function logon() {
    await setCookie('jwt', submittedToken);
    router.refresh();
  }

  async function createAgent() {
    const resp = await api.createMyAgent([['symbol', newSymbol], ['faction', newFaction]]);
    setReceivedToken(resp.data.data.token);
  }

  useEffect(() => {
    checkLogon();
  }, []);

  return (
      <div className='login'>
        <Head>
          <title>Page Title</title>
          <meta property="og:title" content="Page Title" key="title" />
        </Head>
        <div>
          <strong>CREATE AGENT</strong>
          <br/>
          <input value={newSymbol}
                 placeholder='SYMBOL'
                 onChange={e => setNewSymbol(e.target.value)} />
          <br/>
          <input value={newFaction}
                 placeholder={'FACTION'}
                 onChange={e => setNewFaction(e.target.value)} />
          <br/>
          <button onClick={createAgent} className='btn'>Submit</button>
          {
            receivedToken &&
              <div>
                <input value={receivedToken}
                       size='80'
                       readOnly={true} />
                <div>Copy and paste this. Keep is safe.</div>
              </div>
          }
          <br/>- - - - -<br/>
          <strong>LOGIN</strong>
          <br/>
          <input value={submittedToken}
                 size='80'
                 placeholder='PASTE TOKEN HERE'
                 onChange={e => setSubmittedToken(e.target.value)} />
          <br/>
          <button onClick={logon} className='btn'>Submit</button>
        </div>
      </div>
  )
}
