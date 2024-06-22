import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.21:8000/api', // Your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
