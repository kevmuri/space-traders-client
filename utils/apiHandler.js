import {API_URL} from "@/utils/constants";
import axios from 'axios';
import {jwt} from "@/utils/jwt";

function buildJSON(includeAuth=true) {
    let jsonObject = {
        headers: {},
        data: {},
    };

    if (includeAuth === true) {
        jsonObject['headers']['Authorization'] = 'Bearer ' + jwt;
    }

    for (let i = 1; i < arguments.length; i++) {
        jsonObject[arguments[i][0]]= String((arguments[i][1]));
    }
    console.log(jsonObject);
    return jsonObject;
}

export async function getMyAgent() {
    const response = await axios.get(API_URL + '/my/agent', buildJSON());
    return response;
}

export async function createMyAgent() {
   let values = [
        ['symbol', 'LOBSTER'],
        ['faction', 'VOID']
   ];

   const response = await axios.post(API_URL + '/register', buildJSON(false, ...values));
   return response;
}

export async function getContracts() {
  const response = await axios.get(API_URL + '/my/contracts', buildJSON());
  return response;
}