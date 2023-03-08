import axios from 'axios';
const BASE_URL = 'https://ecommerceapp-production-3897.up.railway.app';
// const BASE_URL = 'http://localhost:4000';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});