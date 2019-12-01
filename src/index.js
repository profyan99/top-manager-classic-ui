import Vue from 'vue';
import Router from 'vue-router';
import Vuelidate from 'vuelidate';

import Layout from './components/Layout.vue';
import routes from './routes';
import store from './store';
import '../index.html';

Vue.use(Router);
Vue.use(Vuelidate);

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
