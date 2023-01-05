import Vue from 'vue';
import Vuex from 'vuex';

import layout from './layout';
import auth from './auth';
import alert from './alert';
import categories from './category';
import parameters from './parameter';
import experts from './expert';
import services from './services';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    layout,
    auth,
    alert,
    categories,
    parameters,
    experts,
    services,
  },
});
