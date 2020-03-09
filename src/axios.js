import axios from 'axios';
import store from './store';

axios.interceptors.response.use((response) => response.data, (error) => {
  if (error.response.status === 401) {
    if (error.response.data.message === 'Expired token') {
      return Promise
        .resolve(store.dispatch('user/refreshToken')
          .then(() => {
            error.config.headers.Authorization = `Bearer ${store.state.user.accessToken}`;
            error.config.baseURL = '';
            return axios.request(error.config);
          }));
    }
    return store.dispatch('user/logout');
  }
  return Promise.reject(error.response.data && error.response.data.message);
});

axios.interceptors.request.use(
  (config) => {
    if (store.state.user.accessToken && !config.url.includes('oauth')) {
      config.headers.Authorization = `Bearer ${store.state.user.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
axios.defaults.baseURL = 'http://localhost:9000/api';
