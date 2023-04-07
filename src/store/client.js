import {ClientApi} from "../api/ContentApi/client";

export default {
  namespaced: true,

  state: {
    notAssignedClients: [],
    assignedClients: [],
    notAssignedClientsMeta: {},
    assignedClientsMeta: {},
  },

  getters: {
    getNotAssignedClients: (state) => state.notAssignedClients,
    getAssignedClients: (state) => state.assignedClients,
    getNotAssignedClientsMeta: (state) => state.notAssignedClientsMeta,
    getAssignedClientsMeta: (state) => state.assignedClientsMeta,
  },

  mutations: {
    setNotAssignedClients(state, data) {
      if (data.page === 1) {
        state.notAssignedClients = data.clients.data;
      } else {
        state.notAssignedClients = state.notAssignedClients.concat(data.clients.data);
      }
      state.notAssignedClientsMeta = data.clients.meta;
    },
    setAssignedClients(state, data) {
      if (data.page === 1) {
        state.assignedClients = data.clients.data;
      } else {
        state.assignedClients = state.assignedClients.concat(data.clients.data);
      }
      state.notAssignedClientsMeta = data.clients.meta;
    },
    deleteClient(state, id) {
      state.notAssignedClients = state.notAssignedClients.filter(client => client.id !== id);
      state.assignedClients = state.assignedClients.filter(client => client.id !== id);
    },
  },

  actions: {
    fetchNotAssignedClients({commit}, page) {
      return ClientApi.getNotAssigned(page).then((res) => {
        commit('setNotAssignedClients', {clients: res.data, page});
      });
    },
    fetchAssignedClients({commit}, expertId, page) {
      return ClientApi.getAssigned(expertId, page).then((res) => {
        commit('setAssignedClients', {clients: res.data, page});
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
