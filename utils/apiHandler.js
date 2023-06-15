import axios from 'axios';
import {getCookie} from "cookies-next";

const jwt = getCookie('jwt');
const API_URL = 'https://api.spacetraders.io/v2';


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

export async function createMyAgent(values) {
   const response = await axios.post(API_URL + '/register', buildJSON(false, ...values));
   return response;
}

export async function getContracts() {
  const response = await axios.get(API_URL + '/my/contracts', buildJSON());
  return response;
}