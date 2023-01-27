<template>
  <div class="tables-basic">
    <b-breadcrumb>
      <b-breadcrumb-item to="/dashboard">Dashboard</b-breadcrumb-item>
      <b-breadcrumb-item active>Languages</b-breadcrumb-item>
    </b-breadcrumb>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <h2 class="page-title">Languages</h2>
          </b-col>
        </b-row>
        <create-language/>
      </b-col>
      <b-col md="8">
        <b-row>
          <b-col>
            <h2 class="page-title text-right invisible">.</h2>
          </b-col>
        </b-row>
        <Widget customHeader>
          <div class="table-responsive">
            <table class="table table-striped" v-if="languages.length">
              <thead>
              <tr>
                <th>#</th>
                <th>Icon</th>
                <th>Name</th>
                <th>Abbr</th>
                <th>Default</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(language, key) in languages" :key="key">
                <td>
                  <b>{{ key + 1 }}</b>
                </td>
                <td>
                  <router-link :to="`/dashboard/languages/edit/${language.id}`">
                    <img class="rounded-circle"
                         :src="`${language.icon}`"
                         width="30"
                         height="30"
                         v-if="language.icon"/>
                    <img class="rounded-circle" src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-4.png"
                         width="30px" height="30" v-else/>
                  </router-link>
                </td>
                <td>
                  <router-link :to="`/dashboard/languages/edit/${language.id}`">
                    <b>{{ language.name }}</b>
                  </router-link>
                </td>
                <td>
                  <router-link :to="`/dashboard/languages/edit/${language.id}`">
                    <b>{{ language.abbr }}</b>
                  </router-link>
                </td>
                <td>
                  <b-badge variant="success" v-if="language.default">
                    <b-icon icon="file-check"></b-icon>
                  </b-badge>
                  <b-badge variant="warning" v-else>
                    <b-icon icon="file-minus"></b-icon>
                  </b-badge>
                </td>
                <td>
                  <remove-language :id="language.id" v-if="!language.default"/>
                  <span v-else>---</span>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="text-center" v-else>
              There is no language yet.
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
import CreateLanguage from "./components/CreateLanguage";
import RemoveLanguage from "./components/RemoveLanguage";
import {SetApiError} from "../../api/errors";

export default {
  name: "Categories",
  components: {Widget, CreateLanguage, RemoveLanguage},
  computed: {
    ...mapGetters({
      languages: 'language/getLanguages',
    })
  },
  mounted() {
    try {
      this.getLanguages();
    } catch (err) {
      SetApiError(err);
    }
  },
  methods: {
    ...mapActions({
      getLanguages: 'language/getLanguages',
    }),
  }
}
</script>