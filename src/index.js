import Vue from 'vue';
import Router from 'vue-router';

import Layout from './components/Layout.vue';
import routes from './routes';
import store from './store';
import '../index.html';

Vue.use(Router);
Vue.config.productionTip = false;

const router = new Router({
  routes,
  mode: 'history',
});

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  components: { Layout },
  router,
  store,
});
