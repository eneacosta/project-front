import axios from 'axios';
import { getAuthHeader } from '../utils';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const COIN_URL = SERVER_URL + "/coin";





export async function getCoins() {
    return axios.get(
        `${COIN_URL}`,
    )
}

export async function newCoin(name, cod) {
    let formData = new FormData()
    formData.append('name', name);
    formData.append('cod', cod);
    const headers = getAuthHeader()
    return axios.post(
        `${COIN_URL}`,
        formData,
        { headers: headers }
    )
}