import axios from 'axios';
import config from '../config/config';

/**
 * API axios para comunicação de requisições pro Backend
 */
const api = axios.create({
  baseURL: config.url,
});

export default api;
