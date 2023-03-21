<template>
  <div>
    <Widget customHeader>
      <b-row class="flex-fill service-item">
        <b-col md="7">
          <h5>Expert Services</h5>
        </b-col>
        <b-col md="5" class="text-right">
          <create-service @addService="addService"
                          :expertId="expertId"
                          v-if="expertId"/>
        </b-col>
      </b-row>
      <div class="service-item" v-for="(service, key) in services" :key="key">
        <edit-service :service="service"
                      :expertId="expertId"
                      @editService="editService"
                      v-if="expertId">
          <span slot="remove-service">
            <remove-service :serviceId="service.id"
                            @removeService="removeService"/>
          </span>
        </edit-service>
      </div>
    </Widget>
  </div>
</template>

<script>

import {mapActions} from "vuex";
import {SetApiError} from "../../../../api/errors";
import Widget from "../../../../components/Widget/Widget";
import CreateService from "./CreateService";
import EditService from "./EditService";
import RemoveService from "./RemoveService";

export default {
  name: "ServicesExpert",
  components: {Widget, CreateService, EditService, RemoveService},
  props: {
    expertId: {type: Number},
  },
  data() {
    return {
      modalShow: false,
      services: [],
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapActions({
      getServicesByExpert: 'services/getServicesByExpert'
    }),
    async initData() {
      try {
        const result = await this.getServicesByExpert(this.expertId);
        this.services = result.data;
      } catch (err) {
        SetApiError(err);
      }
    },
    removeService() {
      this.initData();
    },
    addService() {
      this.services = [];
      this.initData();
    },
    editService() {
      this.initData();
    }
  }
}
</script>

<style scoped>
.service-item {
  border-bottom: 1px solid #2A414F;
  margin-bottom: 15px;
  padding-bottom: 15px;
}
</style>