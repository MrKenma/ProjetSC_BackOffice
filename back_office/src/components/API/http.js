import axios from 'axios';
const internalIP = "172.1.3.67"; // remplassez l'ip par votre IP à vous

const instance = axios.create({
    baseURL: `http://${internalIP}:3001`
});

export default instance;