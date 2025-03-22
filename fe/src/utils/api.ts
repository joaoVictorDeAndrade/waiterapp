import axios from 'axios';

export const BASE_URL = 'http://192.168.3.41:3001';

export const api = axios.create({
  baseURL: BASE_URL
});
