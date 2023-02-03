import {ServiceApi} from "../api/ContentApi/service";

export default {
  namespaced: true,

  state: {
    services: [],
  },

  getters: {
    getServices: (state) => state.services,
  },

  mutations: {
    setService(state, services) {
      state.services = services;
    },
    addService(state, service) {
      state.services.unshift(service);
    },
    deleteService(state, id) {
      state.services = state.services.filter(services => services.id !== id);
    },
  },

  actions: {
    getServicesByExpert({commit, rootGetters}, id) {
      const defaultLanguage = rootGetters['language/getDefaultLanguage'];
      const languageAbbr = defaultLanguage ? defaultLanguage.abbr : '';
      return ServiceApi.getByExpert(id, languageAbbr);
    },
    getServiceById({commit, rootGetters}, id) {
      const defaultLanguage = rootGetters['language/getDefaultLanguage'];
      const languageAbbr = defaultLanguage ? defaultLanguage.abbr : '';
      return ServiceApi.getById(id, languageAbbr);
    },
    saveService({commit}, data) {
      return ServiceApi.create(data);
    },
    editService({commit}, data) {
      return ServiceApi.edit(data.id, data.data);
    },
    destroyService({commit}, id) {
      return ServiceApi.remove(id).then(() => {
        commit('deleteService', id);
      });
    }
  },
};
