import * as api from "../utils/apiHandler";
import {React, useEffect, useState} from "react";
import Head from "next/head";
import Login from "@/components/login";

export default function Index() {
  return (
      <div>
        <Head>
          <title>Page Title</title>
          <meta property="og:title" content="Page Title" key="title" />
        </Head>
          <Login />
      </div>
  )
}
