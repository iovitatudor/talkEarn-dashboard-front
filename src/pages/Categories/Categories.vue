<template>
  <div class="tables-basic">
    <b-breadcrumb>
      <b-breadcrumb-item to="/dashboard">Dashboard</b-breadcrumb-item>
      <b-breadcrumb-item active>Categories</b-breadcrumb-item>
    </b-breadcrumb>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <h2 class="page-title">Categories</h2>
          </b-col>
        </b-row>
        <create-category/>
      </b-col>
      <b-col md="8">
        <b-row>
          <b-col>
            <h2 class="page-title text-right invisible">.</h2>
          </b-col>
        </b-row>
        <Widget customHeader>
          <div class="table-resposive">
            <table class="table table-striped" v-if="categories.length">
              <thead>
              <tr>
                <th>#</th>
                <th>Icon</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(category, key) in categories" :key="key">
                <td>
                  <b>{{ key + 1 }}</b>
                </td>
                <td>
                  <router-link :to="`/dashboard/categories/edit/${category.id}`">
                    <img class="rounded-circle"
                         :src="`${category.icon}`"
                         @error="category.icon = null"
                         width="50px"
                         height="50"
                         v-if="category.icon"/>
                    <img class="rounded-circle"
                         src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-4.png"
                         width="50px"
                         height="50"
                         v-else/>
                  </router-link>
                </td>
                <td>
                  <router-link :to="`/dashboard/categories/edit/${category.id}`">
                    <b>{{ category.name }}</b>
                  </router-link>
                </td>
                <td>
                  <remove-category :id="category.id"/>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="text-center" v-else>
              There is no category yet.
            </div>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import Widget from "../../components/Widget/Widget";
import CreateCategory from "./components/CreateCategory";
import RemoveCategory from "./components/RemoveCategory";
import {SetApiError} from "../../api/errors";

export default {
  name: "Categories",
  components: {Widget, CreateCategory, RemoveCategory},
  computed: {
    ...mapGetters({
      categories: 'categories/getCategories',
      defaultLanguage: 'language/getDefaultLanguage',
    })
  },
  watch: {
    defaultLanguage() {
      this.fetchCategories();
    }
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    ...mapActions({
      getCategories: 'categories/getCategories',
    }),
    fetchCategories() {
      try {
        this.getCategories();
      } catch (err) {
        SetApiError(err);
      }
    }
  }
}
</script>