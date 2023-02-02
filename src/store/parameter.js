import {ParameterApi} from "../api/ContentApi/parameter";

export default {
  namespaced: true,

  state: {
    parameters: [],
  },

  getters: {
    getParameters: (state) => state.parameters,
  },

  mutations: {
    setParameters(state, parameters) {
      state.parameters = parameters;
    },
    addParameter(state, parameter) {
      state.parameters.unshift(parameter);
    },
    deleteParameter(state, id) {
      state.parameters = state.parameters.filter(parameter => parameter.id !== id);

    },
  },

  actions: {
    getParameters({commit}) {
      return ParameterApi.getAll().then((res) => {
        commit('setParameters', res.data);
      });
    },
    getByExpert({commit, rootGetters}, id) {
      const defaultLanguage = rootGetters['language/getDefaultLanguage'];
      const languageAbbr = defaultLanguage ? defaultLanguage.abbr : '';
      return ParameterApi.getByExpert(id, languageAbbr);
    },
    getParameterById({commit}, id) {
      return ParameterApi.getById(id);
    },
    saveParameter({commit}, data) {
      return ParameterApi.create(data).then((res) => {
        commit('addParameter', res.data);
      });
    },
    saveBulkParameter({commit}, data) {
      return ParameterApi.createBulk(data.data, data.id);
    },
    editParameter({commit}, data, langId) {
      return ParameterApi.edit(data.id, data.data);
    },
    destroyParameter({commit}, id) {
      return ParameterApi.remove(id).then(() => {
        commit('deleteParameter', id);
      });
    }
  },
};
