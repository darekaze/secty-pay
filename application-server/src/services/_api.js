const axios = require('axios');

module.exports = token => axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://sectypay.herokuapp.com/'
    : 'http://localhost:8095/',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
