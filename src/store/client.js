import {ClientApi} from "../api/ContentApi/client";

export default {
  namespaced: true,

  state: {
    notAssignedClients: [],
    assignedClients: [],
  },

  getters: {
    getNotAssignedClients: (state) => state.notAssignedClients,
    getAssignedClients: (state) => state.assignedClients,
  },

  mutations: {
    setNotAssignedClients(state, clients) {
      state.notAssignedClients = clients;
    },
    setAssignedClients(state, clients) {
      state.assignedClients = clients;
    },
    deleteClient(state, id) {
      state.notAssignedClients = state.notAssignedClients.filter(client => client.id !== id);
      state.assignedClients = state.assignedClients.filter(client => client.id !== id);
    },
  },

  actions: {
    fetchNotAssignedClients({commit}) {
      return ClientApi.getNotAssigned().then((res) => {
        commit('setNotAssignedClients', res.data.data);
      });
    },
    fetchAssignedClients({commit}, expertId) {
      return ClientApi.getAssigned(expertId).then((res) => {
        commit('setAssignedClients', res.data.data);
      });
    },
    getClientById({commit}, id) {
      return ClientApi.getById(id);
    },
    async editClient({commit, rootGetters}, data) {
      return await ClientApi.edit(data.id, data.data);
    },
    destroyClient({commit}, id) {
      return ClientApi.remove(id).then(() => {
        commit('deleteClient', id);
      });
    },
    async toggleStatus({commit, rootGetters}, id) {
      const result = await ClientApi.toggleStatus(id);
      return result.data;
    },
    async changeClientAssignment({commit}, data) {
      const result = await ClientApi.changeClientAssignment(data.clientId, data.expertId);
      return result.data;
    }
  },
};
