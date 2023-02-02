<template>
  <div class="tables-basic">
    <b-breadcrumb>
      <b-breadcrumb-item to="/dashboard">Dashboard</b-breadcrumb-item>
      <b-breadcrumb-item active>Collections</b-breadcrumb-item>
    </b-breadcrumb>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <h2 class="page-title">Collections</h2>
          </b-col>
        </b-row>
        <create-collection/>
      </b-col>
      <b-col md="8">
        <b-row>
          <b-col>
            <h2 class="page-title text-right invisible">.</h2>
          </b-col>
        </b-row>
        <Widget customHeader>
          <div class="table-resposive">
            <table class="table table-striped" v-if="collections.length">
              <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(collection, key) in collections" :key="key">
                <td>
                  <b>{{ key + 1 }}</b>
                </td>
                <td>
                  <router-link :to="`/dashboard/collections/edit/${collection.id}`">
                    <img class="rounded-circle"
                         :src="`${collection.image}`" width="50px"
                         height="50"
                         v-if="collection.image"/>
                    <img class="rounded-circle" src="https://hope.be/wp-content/uploads/2015/05/no-user-image.gif"
                         width="50px" height="50" v-else/>
                  </router-link>
                </td>
                <td>
                  <router-link :to="`/dashboard/collections/edit/${collection.id}`">
                    <b>{{ collection.name }}</b>
                  </router-link>
                </td>
                <td>
                  <remove-collection :id="collection.id"/>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="text-center" v-else>
              There is no collections yet.
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
import CreateCollection from "./components/CreateCollection";
import RemoveCollection from "./components/RemoveCollection";
import {SetApiError} from "../../api/errors";

export default {
  name: "Categories",
  components: {Widget, CreateCollection, RemoveCollection},
  computed: {
    ...mapGetters({
      collections: 'collection/getCollections',
      defaultLanguage: 'language/getDefaultLanguage',
    })
  },
  watch: {
    defaultLanguage() {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions({
      getCollections: 'collection/getCollections',
    }),
    init() {
      try {
        this.getCollections();
      } catch (err) {
        SetApiError(err);
      }
    }
  }
}
</script>