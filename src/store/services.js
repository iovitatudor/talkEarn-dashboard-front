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
    getServicesByExpert({commit}, id) {
      return ServiceApi.getByExpert(id);
    },
    getServiceById({commit}, id) {
      return ServiceApi.getById(id);
    },
    saveService({commit}, data) {
      return ServiceApi.create(data);
    },
    editService({commit}, data) {
      return ServiceApi.edit(data.id, data.data);
    },
    destroyService({commit}, id) {
      return ServiceApi.remove(id).then((res) => {
        commit('deleteService', id);
      });
    }
  },
};
