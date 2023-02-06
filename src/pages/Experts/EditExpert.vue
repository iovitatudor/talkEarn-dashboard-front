<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item to="/dashboard">Dashboard</b-breadcrumb-item>
      <b-breadcrumb-item to="/dashboard/experts">Experts</b-breadcrumb-item>
      <b-breadcrumb-item active>Update Expert</b-breadcrumb-item>
    </b-breadcrumb>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <h2 class="page-title">Experts</h2>
          </b-col>
          <b-col class="text-right">
            <b-button variant="default" class="mr-3" size="md" @click="modalShow = !modalShow">
              Add new Expert
            </b-button>
            <b-modal v-model="modalShow" title="Create Expert" hide-footer>
              <create-expert @closeModal="modalShow = !modalShow"/>
            </b-modal>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6">
            <div>
              <update-expert-info @reloadComponent="reloadComponents"
                                  :expert="expert"
                                  v-if="expert"/>
            </div>
            <div>
              <services-expert :expert-id="expert.id"
                               v-if="expert"/>
            </div>
          </b-col>
          <b-col md="6">
            <div>
              <update-expert-video @reloadComponent="reloadComponents"
                                   :expert="expert"
                                   v-if="expert"/>
            </div>
            <div>
              <update-expert-credentials @reloadComponent="reloadComponents"
                                         :expert="expert"
                                         v-if="expert"/>
            </div>
            <div>
              <parameters-expert :expert-id="expert.id"
                                 v-if="expert"/>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import CreateExpert from "./components/CreateExpert";
import UpdateExpertInfo from "./components/UpdateExpertInfo";
import UpdateExpertCredentials from "./components/UpdateExpertCredentials";
import ServicesExpert from "./components/services/ServicesExpert";
import ParametersExpert from "./components/ParametersExpert";
import UpdateExpertVideo from "./components/UpdateExpertVideo";
import {SetApiError} from "../../api/errors";

export default {
  name: "EditExpert",
  components: {
    CreateExpert,
    UpdateExpertInfo,
    UpdateExpertCredentials,
    ServicesExpert,
    ParametersExpert,
    UpdateExpertVideo
  },
  data() {
    return {
      services: [],
      ready: true,
      modalShow: false,
      expert: null,
    }
  },
  watch: {
    async defaultLanguage() {
      this.expert = null;
      await this.initData();
    }
  },
  computed: {
    ...mapGetters({
      defaultLanguage: 'language/getDefaultLanguage',
    }),
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapActions({
      getExpertById: 'experts/getExpertById',
      getServicesByExpert: 'services/getServicesByExpert',
      getCategories: 'categories/getCategories',
      getCollections: 'collection/getCollections',
    }),
    async initData() {
      const id = parseInt(this.$route.params.id);
      try {
        await this.getCategories();
        const res = await this.getExpertById(id);
        this.expert = res.data;
        await this.getCollections();
      } catch (err) {
        SetApiError(err);
      }
    },
    reloadComponents(expert) {
      this.expert = expert
    }
  }
}
</script>