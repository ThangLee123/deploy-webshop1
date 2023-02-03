import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://webshop1-app.onrender.com',
});
