import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.145:5000/', // Substitua pelo endereço correto da sua API
});

export default api;
