import axios from 'axios';

export default () => axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://xxx.herokuapp.com/'
    : 'http://localhost:8095/',
});
