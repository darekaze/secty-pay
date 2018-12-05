const axios = require('axios');

module.exports = token => axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://comp3334-pay.herokuapp.com/'
    : 'http://localhost:8095/',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
