<template>
  <div class="tables-basic">
    <b-breadcrumb>
      <b-breadcrumb-item to="/dashboard">Dashboard</b-breadcrumb-item>
      <b-breadcrumb-item active>Parameters</b-breadcrumb-item>
    </b-breadcrumb>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <h2 class="page-title">Parameters</h2>
          </b-col>
        </b-row>
        <create-parameter/>
      </b-col>
      <b-col md="8">
        <b-row>
          <b-col>
            <h2 class="page-title text-right invisible">.</h2>
          </b-col>
        </b-row>
        <Widget customHeader>
          <div class="table-resposive">
            <table class="table table-striped" v-if="parameters.length">
              <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(parameter, key) in parameters" :key="key">
                <td>
                  <b>{{ key + 1 }}</b>
                </td>
                <td>
                  <router-link :to="`/dashboard/parameters/edit/${parameter.id}`">
                    <b>{{ parameter.name }}</b>
                  </router-link>
                </td>
                <td>
                  <remove-parameter :id="parameter.id"/>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="text-center" v-else>
              There is no parameters yet.
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
import CreateParameter from "./components/CreateParameter";
import RemoveParameter from "./components/RemoveParameter";
import {SetApiError} from "../../api/errors";

export default {
  name: "Parameters",
  components: {Widget, CreateParameter, RemoveParameter},
  computed: {
    ...mapGetters({
      parameters: 'parameters/getParameters',
    })
  },
  mounted() {
    try {
      this.getParameters();
    } catch (err) {
      SetApiError(err);
    }
  },
  methods: {
    ...mapActions({
      getParameters: 'parameters/getParameters',
    })
  }
}
</script>