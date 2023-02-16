import {ScheduleApi} from "../api/ScheduleApi/schedule";

export default {
  namespaced: true,

  state: {
    schedule: [],
  },

  getters: {
    getSchedule: (state) => state.schedule,
  },

  mutations: {
    setSchedule(state, schedule) {
      state.schedule = schedule;
    },
    removeSchedule(state) {
      state.schedule = [];
    },
  },

  actions: {
    createSchedule({commit}, data) {
      return ScheduleApi.createSchedule(data).then(result => {
        commit('setSchedule', result.data);
      });
    },
    destroySchedule({commit}, expertId) {
      return ScheduleApi.removeSchedule(expertId).then(() => {
        commit('removeSchedule');
      });
    },
    getSchedule({commit}, expertId) {
      return ScheduleApi.getSchedule(expertId).then(data => {
        commit('setSchedule', data.data);
      });
    },
  },
};
