import axios from 'axios';
import store from '../../store';

export default () => axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://xxx.herokuapp.com/'
    : 'http://localhost:8083/',
  headers: {
    Authorization: `Bearer ${store.state.auth.token}`,
  },
});
