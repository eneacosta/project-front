import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export async function loginUser(username, password) {
    let formData = new FormData()
    formData.append('username', username);
    formData.append('password', password);
    return axios.post(`${SERVER_URL}/auth`, formData)
   }