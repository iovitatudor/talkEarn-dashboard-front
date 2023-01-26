import {CategoryApi} from "../api/ContentApi/category";

export default {
  namespaced: true,

  state: {
    categories: [],
  },

  getters: {
    getCategories: (state) => state.categories,
  },

  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    addCategory(state, category) {
      state.categories.unshift(category);
    },
    deleteCategory(state, id) {
      state.categories = state.categories.filter(category => category.id !== id);
    },
  },

  actions: {
    getCategories({commit}) {
      return CategoryApi.getAll().then((res) => {
        commit('setCategories', res.data);
      });
    },
    getCategoryById({commit}, id) {
      return CategoryApi.getById(id);
    },
    saveCategory({commit}, data) {
      return CategoryApi.create(data).then((res) => {
        commit('addCategory', res.data);
      });
    },
    editCategory({commit}, data) {
      return CategoryApi.edit(data.id, data.data);
    },
    destroyCategory({commit}, id) {
      return CategoryApi.remove(id).then(() => {
        commit('deleteCategory', id);
      });
    }
  },
};
