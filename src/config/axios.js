const axios = require('axios').default;

const clienteAxios = axios.create({
    baseURL: 'http://localhost:2000'
  });

export default clienteAxios;