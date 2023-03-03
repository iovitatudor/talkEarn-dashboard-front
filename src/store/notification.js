import {SupervisorApi} from "../api/NotificationApi/supervisor";

export default {
  namespaced: true,

  state: {
    notifications: [],
  },

  getters: {
    getNotifications: (state) => state.notifications,
  },

  mutations: {
    setNotifications(state, notifications) {
      state.notifications = notifications;
    },
  },

  actions: {
    getAllNotifications({commit}, expertId) {
      return SupervisorApi.getAll(expertId).then((res) => {
        commit('setNotifications', res.data);
      });
    },
  },
};
