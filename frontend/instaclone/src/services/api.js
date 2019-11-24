import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.url,
});

export default api;
