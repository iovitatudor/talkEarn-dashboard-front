export default {
  namespaced: true,

  state: {
    error: null,
    success: null,
  },

  getters: {
    getError: (state) => state.error,
    getSuccess: (state) => state.success,
  },

  mutations: {
    setError(state, message) {
      state.error = message;
    },
    resetError(state) {
      state.error = null;
    },
    setSuccess(state, message) {
      state.success = message
    },
    resetSuccess(state) {
      state.success = null;
    },
  },

  actions: {
    onError({commit}, message) {
      commit('setError', message);
    },
    onResetError({commit}) {
      commit('resetError');
    },
    onSuccess({commit}, message) {
      commit('setSuccess', message);
    },
    onResetSuccess({commit}) {
      commit('resetSuccess');
    }
  },
};
