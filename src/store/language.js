import {LanguageApi} from "../api/ContentApi/languageApi";

export default {
  namespaced: true,

  state: {
    languages: [],
  },

  getters: {
    getLanguages: (state) => state.languages,
  },

  mutations: {
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
    getLanguages({commit}) {
      return LanguageApi.getAll().then((res) => {
        commit('setLanguages', res.data);
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
