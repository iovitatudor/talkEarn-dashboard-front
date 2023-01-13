import {AuthApi} from "../api/AuthApi";

import {SetTokenToDefaultApiInstance, SetTokenToFormDataApiInstance} from "../api";

export default {
  namespaced: true,

  state: {
    credentials: {
      token: localStorage.getItem('token') || null,
      expertRole: localStorage.getItem('expertRole') || null,
    },
    authExpert: JSON.parse(localStorage.getItem('authExpert')) || null,
    project: JSON.parse(localStorage.getItem('project')) || null,
  },

  getters: {
    getToken: (state) => state.credentials.token,
    getExpertRole: (state) => state.credentials.expertRole,
    getAuthExpert: (state) => state.authExpert,
    getProject: (state) => state.project,
  },

  mutations: {
    setToken(state, token) {
      state.credentials.token = token;
      localStorage.removeItem('token');
      localStorage.setItem('token', token);
    },
    setExpertRole(state, expertRole) {
      state.credentials.expertRole = expertRole;
      localStorage.setItem('expertRole', expertRole);
    },
    setAuthExpert(state, authExpert) {
      state.authExpert = authExpert;
      localStorage.setItem('authExpert', JSON.stringify(authExpert));
    },
    setProject(state, project) {
      state.project = project;
      localStorage.setItem('project', JSON.stringify(project));
    },
    deleteToken(state) {
      state.credentials.token = null;
      localStorage.removeItem('token');
    },
    deleteExpertRole(state) {
      state.credentials.expertRole = null;
      localStorage.removeItem('expertRole');
    },
    deleteAuthExpert(state) {
      state.authExpert = null;
      localStorage.removeItem('authExpert');
    },
    deleteProject(state) {
      state.project = null;
      localStorage.removeItem('project');
    },
  },

  actions: {
    onLogin({commit}, data) {
      return AuthApi.login(data).then((res) => {
        commit('setToken', res.data.token);
        commit('setExpertRole', res.data.expert.type);
        commit('setAuthExpert', res.data.expert);
        commit('setProject', res.data.project);
        SetTokenToDefaultApiInstance(res.data.token);
        SetTokenToFormDataApiInstance(res.data.token);
      });
    },
    onRegister({commit}, data) {
      return AuthApi.register(data).then((res) => {
        commit('setToken', res.data.token);
        commit('setExpertRole', res.data.expert.type);
        commit('setAuthExpert', res.data.expert);
        commit('setProject', res.data.project);
        SetTokenToDefaultApiInstance(res.data.token);
        SetTokenToFormDataApiInstance(res.data.token);
      })
    },
    onLogout({commit}) {
      commit('deleteToken');
      commit('deleteExpertRole');
      commit('deleteAuthExpert');
      commit('deleteProject');
    },
  },
};
