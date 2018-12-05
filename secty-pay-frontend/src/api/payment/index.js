import axios from 'axios';

export default () => axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://comp3334-pay.herokuapp.com/'
    : 'http://localhost:8095/',
});
