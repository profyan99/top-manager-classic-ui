import axios from 'axios';
import store from './store';

axios.interceptors.response.use((response) => response.data, (error) => {
  if (error.response.status === 401) {
    return store.dispatch('user/logout');
  }
  return Promise.reject(error.response.data && error.response.data.message);
});

axios.interceptors.request.use(
  (config) => {
    if (store.state.user.accessToken && !config.url.includes('oauth')) {
      config.headers.Authorization = `Bearer ${ store.state.user.accessToken }`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
axios.defaults.baseURL = '/api';
