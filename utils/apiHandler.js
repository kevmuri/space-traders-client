import axios from 'axios';
import {getCookie} from "cookies-next";

const jwt = getCookie('jwt');
const API_URL = 'https://api.spacetraders.io/v2';


function buildJSON(includeAuth=true) {
    let jsonObject = {
        headers: {},
        data: {}
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

function buildJSONMeta() {
  let jsonObject = {
    headers: {
      Authorization: 'Bearer' + jwt
    },
    meta: {
      limit: 20
    },
    data: {}
};
return jsonObject;
}

export async function getMyAgent() {
  return await axios.get(API_URL + '/my/agent', buildJSON());
}

export async function createMyAgent(values) {
  return await axios.post(API_URL + '/register', buildJSON(false, ...values));
}

export async function getWaypoints(systemSymbol, pageNumber) {
  return await axios.get(API_URL + '/systems/' + systemSymbol + '/waypoints', buildJSONMeta());
}