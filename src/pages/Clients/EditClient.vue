<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item to="/dashboard">Dashboard</b-breadcrumb-item>
      <b-breadcrumb-item to="/dashboard/experts">Clients</b-breadcrumb-item>
      <b-breadcrumb-item active>Update Client</b-breadcrumb-item>
    </b-breadcrumb>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <h2 class="page-title">Clients</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <div>
              <update-client @reloadComponent="reloadComponents"
                             :client="client"
                             v-if="client"/>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import {mapActions} from "vuex";
import {SetApiError} from "../../api/errors";
import UpdateClient from "./components/UpdateClient";

export default {
  name: "EditClient",
  components: {UpdateClient},
  data() {
    return {
      services: [],
      ready: true,
      modalShow: false,
      client: null,
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapActions({
      getClientById: 'client/getClientById',
    }),
    async initData() {
      const id = parseInt(this.$route.params.id);
      try {
        const res = await this.getClientById(id);
        this.client = res.data;
      } catch (err) {
        SetApiError(err);
      }
    },
    reloadComponents(client) {
      this.client = client
    }
  }
}
</script>