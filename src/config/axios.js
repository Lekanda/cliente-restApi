import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'https://localhost:2000',
  });

export default clienteAxios;