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
    async saveExpert({commit}, data) {
      const result = await ExpertApi.create(data);
      commit('addExpert', result.data);
      return result.data;
    },
    fetchExperts({commit, rootGetters}) {
      const defaultLanguage = rootGetters['language/getDefaultLanguage'];
      const languageAbbr = defaultLanguage ? defaultLanguage.abbr : '';
      return ExpertApi.getAll(languageAbbr).then((res) => {
        commit('setExperts', res.data.data);
      });
    },
    getExpertById({commit, rootGetters}, id) {
      const defaultLanguage = rootGetters['language/getDefaultLanguage'];
      const languageAbbr = defaultLanguage ? defaultLanguage.abbr : '';
      return ExpertApi.getById(id, languageAbbr);
    },
    async editExpert({commit, rootGetters}, data) {
      const result = await ExpertApi.edit(data.id, data.data);
      const expert = result.data;
      const authExpert = rootGetters['auth/getAuthExpert'];
      if (authExpert.id === expert.id) {
        commit('auth/setAuthExpert', expert, {root: true});
      }
      return result;
    },
    async editExpertVideo({commit, rootGetters}, data) {
      const result = await ExpertApi.editVideo(data.id, data.data);
      return result;
    },
    destroyExpert({commit}, id) {
      return ExpertApi.remove(id).then(() => {
        commit('deleteExpert', id);
      });
    },
    async toggleStatus({commit, rootGetters}, id) {
      const result = await ExpertApi.toggleStatus(id);
      const expert = result.data;
      const authExpert = rootGetters['auth/getAuthExpert'];
      if (authExpert.id === expert.id) {
        commit('auth/setAuthExpert', expert, {root: true});
      }
      return expert;
    }
  },
};
