<template>
  <div class="tables-basic">
    <b-breadcrumb>
      <b-breadcrumb-item to="/dashboard">Dashboard</b-breadcrumb-item>
      <b-breadcrumb-item active>Assigned Clients</b-breadcrumb-item>
    </b-breadcrumb>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <h2 class="page-title">
              Assigned Clients
              <a href="#" @click="initClients">
                <b-icon icon="bootstrap-reboot"></b-icon>
              </a>
            </h2>
          </b-col>
        </b-row>
        <Widget customHeader v-if="clients.length">
          <list-clients :clients="clients"/>
        </Widget>
        <Widget customHeader v-else>
          <div class="text-center">
            There is no clients yet.
          </div>
        </Widget>
      </b-col>
    </b-row>

  </div>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import {SetApiError} from "../../api/errors";
import Widget from "../../components/Widget/Widget";
import ListClients from "./components/ListClients";

export default {
  name: "AssignedClients",
  components: {Widget, ListClients},
  data() {
    return {
      modalShow: false,
    }
  },
  computed: {
    ...mapGetters({
      clients: 'client/getAssignedClients',
      authExpert: 'auth/getAuthExpert',
    })
  },
  mounted() {
    this.initClients();
    // setTimeout(() => {
    //   this.initClients();
    // }, 60000);
  },
  methods: {
    ...mapActions({
      fetchClients: 'client/fetchAssignedClients',
    }),
    async initClients() {
      try {
        await this.fetchClients(this.authExpert.id);
      } catch (err) {
        SetApiError(err);
      }
    }
  }
}
</script>

