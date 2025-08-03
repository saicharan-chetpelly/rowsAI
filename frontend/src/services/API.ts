import axios from 'axios';

const API_BASE_URL: string = process.env.API_BASE_URL as string;

export default axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
