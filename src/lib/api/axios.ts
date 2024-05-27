import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const PORT = process.env.NEXT_PUBLIC_API_PORT;

const BASE_URL = `${API_URL}:${PORT}`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
