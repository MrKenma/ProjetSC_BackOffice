import axios from 'axios';
const internalIP = "10.101.102.152"; // remplassez l'ip par votre IP à vous

const instance = axios.create({
    baseURL: `http://${internalIP}:3001`
});

export default instance;