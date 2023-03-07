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
    deleteNotification(state, notificationId) {
      state.notifications = state.notifications.filter(notification => notification.id !== notificationId);
    },
  },

  actions: {
    getAllNotifications({commit}, expertId) {
      return SupervisorApi.getAll(expertId).then((res) => {
        commit('setNotifications', res.data);
      });
    },
    allowSupervisorRequest({commit}, notificationId) {
      return SupervisorApi.allowSupervisorRequest(notificationId).then(() => {
        commit('deleteNotification', notificationId);
      });
    },
    denySupervisorRequest({commit}, notificationId) {
      return SupervisorApi.deleteSupervisorNotification(notificationId).then(() => {
        commit('deleteNotification', notificationId);
      });
    },
  },
};
