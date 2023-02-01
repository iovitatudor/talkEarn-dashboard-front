import {LanguageApi} from "../api/ContentApi/languageApi";

export default {
  namespaced: true,

  state: {
    defaultLanguage: {},
    languages: [],
  },

  getters: {
    getLanguages: (state) => state.languages,
    getDefaultLanguage: (state) => state.defaultLanguage,
  },

  mutations: {
    setDefaultLanguage(state, language) {
      state.defaultLanguage = language;
    },
    setLanguages(state, languages) {
      state.languages = languages;
    },
    addLanguage(state, language) {
      state.languages.push(language);
    },
    deleteLanguage(state, id) {
      state.languages = state.languages.filter(language => language.id !== id);
    },
  },

  actions: {
    setDefaultLanguage({commit}, language) {
      commit('setDefaultLanguage', language);
    },
    getLanguages({commit}) {
      return LanguageApi.getAll().then((res) => {
        commit('setLanguages', res.data);
        commit('setDefaultLanguage', res.data[0]);
      });
    },
    getLanguageById({commit}, id) {
      return LanguageApi.getById(id);
    },
    saveLanguage({commit}, data) {
      return LanguageApi.create(data).then((res) => {
        commit('addLanguage', res.data);
      });
    },
    editLanguage({commit}, data) {
      return LanguageApi.edit(data.id, data.data);
    },
    destroyLanguage({commit}, id) {
      return LanguageApi.remove(id).then(() => {
        commit('deleteLanguage', id);
      });
    }
  },
};
