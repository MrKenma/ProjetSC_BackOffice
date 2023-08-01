import axios from 'axios';
const internalIP = "192.168.1.22"; // remplassez l'ip par votre IP à vous

const instance = axios.create({
    baseURL: `http://${internalIP}:3001`
});

export default instance;