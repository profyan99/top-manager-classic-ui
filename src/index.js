import Vue from 'vue';
import Router from 'vue-router';
import Vuelidate from 'vuelidate';
import vSelect from 'vue-select';

import Layout from './components/Layout.vue';
import routes from './routes';
import store from './store';
import { confirm, notification } from '~/plugins';

import './styles/app.sass';
import '../index.html';
import './axios';
import './icons';

Vue.component('v-select', vSelect);
Vue.use(Router);
Vue.use(Vuelidate);
Vue.use(confirm);
Vue.use(notification);

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
  confirm,
  notification,
});
