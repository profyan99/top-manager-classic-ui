import axios from 'axios';
import store from './store';

axios.interceptors.response.use((response) => response.data, (error) => {
  if (error.response.status === 401) {
    return store.dispatch('setUser', null);
  }
  return Promise.reject(error.response.data && error.response.data.message);
});
