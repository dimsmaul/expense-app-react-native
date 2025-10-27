import axios from 'axios';

const unauth = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export { unauth };
