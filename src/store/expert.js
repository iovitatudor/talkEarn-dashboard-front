import {ExpertApi} from "../api/ContentApi/expert";

export default {
  namespaced: true,

  state: {
    experts: [],
    lastCreatedExpert: null,
  },

  getters: {
    getExperts: (state) => state.experts,
    getLastCreatedExpert: (state) => state.lastCreatedExpert,
  },

  mutations: {
    setExperts(state, experts) {
      state.experts = experts;
    },
    addExpert(state, expert) {
      state.experts.unshift(expert);
      state.lastCreatedExpert = expert;
    },
    deleteExpert(state, id) {
      state.experts = state.experts.filter(expert => expert.id !== id);
    },
  },

  actions: {
    saveExpert({commit}, data) {
      ExpertApi.create(data).then((res) => {
        commit('addExpert', res.data);
      });
    },
    fetchExperts({commit}) {
      return ExpertApi.getAll().then((res) => {
        commit('setExperts', res.data);
      });
    },
    getExpertById({commit}, id) {
      return ExpertApi.getById(id);
    },
    editExpert({commit}, data) {
      return ExpertApi.edit(data.id, data.data);
    },
    destroyExpert({commit}, id) {
      return ExpertApi.remove(id).then((res) => {
        commit('deleteExpert', id);
      });
    }
  },
};
