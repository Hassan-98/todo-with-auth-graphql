import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9999",
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;