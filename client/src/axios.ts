import axios from 'axios';

export const authRequest = axios.create({
  baseURL: 'http://localhost:3000/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});
