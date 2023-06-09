import {API_URL} from "@/utils/constants";
import axios from 'axios';
import {jwt} from "@/utils/jwt";

const options = {
    headers: {
        Authorization: 'Bearer ' + jwt,
    },
};

export async function getMyAgent() {
    const response = await axios.get(API_URL + '/my/agent', options);
    return response.data;
}