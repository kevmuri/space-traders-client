import {API_URL} from "@/utils/constants";
import axios from 'axios';
import {jwt} from "@/utils/jwt";
import {compareRouterStates} from "next/dist/shared/lib/router/utils/compare-states";

function buildJSON(includeAuth) {
    let jsonObject = {
        headers: {},
        data: {},
    };

    if (includeAuth === true) {
        jsonObject['headers']['Authorization'] = 'Bearer ' + jwt;
    }

    console.log(arguments.length)
    for (let i = 1; i < arguments.length - 1; i++) {
        console.log(arguments[i])
        jsonObject[arguments[i][0]][arguments[i][1]] = arguments[i][2];
    }
    console.log(jsonObject);
    return jsonObject;
}

export async function getMyAgent() {
    const response = await axios.get(API_URL + '/my/agent', buildJSON());
    return response;
}

export async function createMyAgent() {
   let jsonValues = (['headers', 'Content-Type', 'application/json'],
        ['data', 'symbol', 'TESTLOBSTER'],
        ['data', 'faction', 'COSMIC']);

   const response = await axios.post(API_URL + '/register', buildJSON(true, ...jsonValues));
   return response;
}