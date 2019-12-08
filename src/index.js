import Vue from 'vue';
import Router from 'vue-router';
import Vuelidate from 'vuelidate';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSearch,
  faLock,
  faTrophy,
  faFile,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Layout from './components/Layout.vue';
import routes from './routes';
import store from './store';
import '../index.html';

library.add(faSearch, faLock, faTrophy, faFile);

Vue.component('icon', FontAwesomeIcon);
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
