import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Vuetify from 'vuetify';
import Toasted from 'vue-toasted';

import store from './store';
import router from './Routes';
import App from './App';
import layoutMixin from './mixins/layout';
import VueSocketIO from "vue-socket.io";
import { io } from "socket.io-client";
// import {SetTokenToDefaultApiInstance} from './api';

Vue.use(BootstrapVue);
Vue.use(Vuetify);

Vue.mixin(layoutMixin);
Vue.use(Toasted, {duration: 5000, position: 'top-center'});

const options = {};
// const host = process.env.VUE_APP_BACK_END_URL
const host = 'https://core.talkearn.app'
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: io(host, options),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
  })
);

Vue.config.productionTip = false;

// SetTokenToDefaultApiInstance(store.getters['auth/getToken']);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
