<template>
  <div class="tables-basic">
    <b-breadcrumb>
      <b-breadcrumb-item to="/dashboard">Dashboard</b-breadcrumb-item>
      <b-breadcrumb-item active>Not Assigned Clients</b-breadcrumb-item>
    </b-breadcrumb>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <h2 class="page-title">Not Assigned Clients</h2>
          </b-col>
        </b-row>
        <Widget customHeader v-if="clients.length">
          <list-clients :clients="clients"/>
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
  name: "NotAssignedClients",
  components: {Widget, ListClients},
  data() {
    return {
      modalShow: false,
    }
  },
  computed: {
    ...mapGetters({
      clients: 'client/getNotAssignedClients',
    }),
  },
  mounted() {
    this.initClients();
    setInterval(() => {
      this.initClients();
    }, 60000);
  },
  methods: {
    ...mapActions({
      fetchClients: 'client/fetchNotAssignedClients',
    }),
    async initClients() {
      try {
        await this.fetchClients();
      } catch (err) {
        SetApiError(err);
      }
    }
  }
}
</script>

