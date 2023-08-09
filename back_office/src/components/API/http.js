import axios from 'axios';
import axiosRetry from 'axios-retry';
const internalIP = "192.168.1.9"; // remplassez l'ip par votre IP à vous
const version = "1.0.0";
export const API_PROFILE_PICTURE = `http://${internalIP}:3001/profile_picture/`;

const instance = axios.create({
    baseURL: `http://${internalIP}:3001/${version}`
});

axiosRetry(instance, {
    retries: 10,
    retryDelay: axiosRetry.exponentialDelay
});

export default instance;