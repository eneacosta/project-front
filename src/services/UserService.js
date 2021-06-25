import axios from 'axios';
import {getAuthHeader} from '../utils';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const USER_URL = SERVER_URL + "/users";


export async function getSaldos() {
    const headers = getAuthHeader()
    return axios.get(
        `${USER_URL}/saldo`,
        {headers: headers})
}
