import {CollectionApi} from "../api/ContentApi/collection";

export default {
  namespaced: true,

  state: {
    collections: [],
  },

  getters: {
    getCollections: (state) => state.collections,
  },

  mutations: {
    setCollections(state, collections) {
      state.collections = collections;
    },
    addCollection(state, collection) {
      state.collections.unshift(collection);
    },
    deleteCollection(state, id) {
      state.collections = state.collections.filter(collection => collection.id !== id);
    },
  },

  actions: {
    getCollections({commit}) {
      return CollectionApi.getAll().then((res) => {
        commit('setCollections', res.data);
      });
    },
    getCollectionById({commit}, id) {
      return CollectionApi.getById(id);
    },
    saveCollection({commit}, data) {
      return CollectionApi.create(data).then((res) => {
        commit('addCollection', res.data);
      });
    },
    editCollection({commit}, data) {
      return CollectionApi.edit(data.id, data.data);
    },
    destroyCollection({commit}, id) {
      return CollectionApi.remove(id).then(() => {
        commit('deleteCollection', id);
      });
    }
  },
};
