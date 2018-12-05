import axios from 'axios';
import store from '../../store';

export default () => axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://comp3334-secty.herokuapp.com/'
    : 'http://localhost:8083/',
  headers: {
    Authorization: `Bearer ${store.state.auth.token}`,
  },
});
