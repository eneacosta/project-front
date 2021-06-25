import axios from 'axios';
import {getAuthHeader} from '../utils';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const OPERATION_URL = SERVER_URL + "/operations";


export async function sendMoney(to, amount, coin) {
    let formData = new FormData()
    formData.append('to', to);
    formData.append('amount', amount);
    formData.append('coin', coin);
    const headers = getAuthHeader()
    return axios.post(
        `${OPERATION_URL}`,
        formData,
        {headers: headers}
        )
}
export async function newDeposit(amount, coin) {
    if (!amount || !coin) return;
    let formData = new FormData()
    formData.append('amount', amount);
    formData.append('coin', coin);
    const headers = getAuthHeader()
    return axios.post(
        `${OPERATION_URL}/deposit`,
        formData,
        {headers: headers}
        )
}


export async function getOperations() {
    const headers = getAuthHeader()
    return axios.get(
        `${OPERATION_URL}`,
        {headers: headers}
        )
}

export async function getDeposits() {
    const headers = getAuthHeader()
    return axios.get(
        `${OPERATION_URL}/deposit`,
        {headers: headers}
        )
}