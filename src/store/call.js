import {CallApi} from "../api/CallApi";

export default {
  namespaced: true,

  state: {
    token: null,
  },

  getters: {
    getToken: (state) => state.token,
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },

  actions: {
    getToken({commit}, identity) {
      return CallApi.getToken(identity).then(res => {
        commit('setToken', res.data.token);
      });
    },
  },
};
