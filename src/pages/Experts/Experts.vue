<template>
  <div class="tables-basic">
    <b-breadcrumb>
      <b-breadcrumb-item to="/dashboard">Dashboard</b-breadcrumb-item>
      <b-breadcrumb-item active>Experts</b-breadcrumb-item>
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
        <Widget customHeader>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
              <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Active</th>
                <th>Status</th>
                <th>Info</th>
                <th>Price</th>
                <th>Seller</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(expert, key) in experts" :key="key" v-if="expert.type !== 'Administrator'">
                <td>
                  <b>{{ key + 1 }}</b>
                </td>
                <td>
                  <router-link :to="`/dashboard/experts/edit/${expert.id}`">
                    <img class="rounded-circle"
                         :src="`${expert.avatar}`"
                         @error="expert.avatar = null"
                         v-if="expert.avatar"
                         height="50"/>
                    <img class="rounded-circle"
                         src="https://hope.be/wp-content/uploads/2015/05/no-user-image.gif"
                         height="50"
                         v-else/>
                  </router-link>
                </td>
                <td>
                  <router-link :to="`/dashboard/experts/edit/${expert.id}`">
                    <b>{{ expert.name }}</b>
                  </router-link>
                </td>
                <td><b>{{ expert.email }}</b></td>
                <td>
                  <b-badge variant="success" v-if="expert.active">Active</b-badge>
                  <b-badge variant="warning" v-else>Inactive</b-badge>
                </td>
                <td>
                  <b-badge variant="success" v-if="expert.available">Online</b-badge>
                  <b-badge variant="warning" v-else>Offline</b-badge>
                </td>
                <td class="flex-section">
                  <div class="mb-0 mt-0">
                    <!--                    <span class="mb-0 mt-0">-->
                    <!--                      <small>-->
                    <!--                        <span class="fw-semi-bold">Category:</span>-->
                    <!--                        <span class="text-muted">&nbsp; {{ expert.category ? expert.category.name : '-&#45;&#45;' }}</span>-->
                    <!--                      </small>-->
                    <!--                    </span> <br>-->
                    <span class="mb-0">
                      <small>
                        <span class="fw-semi-bold">Profession:</span>
                        <span class="text-muted">
                          {{ expert.profession ? expert.profession : '---' }}
                        </span>
                      </small>
                    </span>
                  </div>
                </td>
                <td><b>{{ expert.price > 0 ? expert.price + '$/h' : '---' }}</b></td>
                <td>
                  <div v-if="expert.seller">
                    <b-button variant="default" class="mr-3" size="md" @click="trackStatusModal = !trackStatusModal">
                      Track status
                    </b-button>
                    <b-modal v-model="trackStatusModal" :title="`Track ${expert.name} status`" hide-footer>
                      <seller-info v-if="expert.seller" :seller="expert.seller"/>
                    </b-modal>
                  </div>
                  <div v-else>
                    ---
                  </div>
                </td>
                <td>
                  <remove-expert :id="expert.id" v-if="expert.type !== 'Administrator'"/>
                  <p v-else>
                    <small> Project Administrator</small>
                  </p>
                </td>
              </tr>
              </tbody>
            </table>

            <div class="text-center" v-if="metaExperts.totalPages > page">
              <b-button class="mt-3" variant="success" @click="init()">
                Load more
              </b-button>
            </div>
          </div>
        </Widget>
      </b-col>
    </b-row>

  </div>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import Widget from "../../components/Widget/Widget";
import {SetApiError} from "../../api/errors";
import CreateExpert from "./components/CreateExpert";
import RemoveExpert from "./components/RemoveExpert";
import SellerInfo from "../Payment/Components/SellerInfo";

export default {
  name: "Experts",
  components: {Widget, CreateExpert, RemoveExpert, SellerInfo},
  data() {
    return {
      modalShow: false,
      trackStatusModal: false,
      page: 0,
    }
  },
  computed: {
    ...mapGetters({
      experts: 'experts/getExperts',
      defaultLanguage: 'language/getDefaultLanguage',
      metaExperts: 'experts/getMetaExperts',
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
      fetchExperts: 'experts/fetchExperts',
    }),
    async init() {
      try {
        await this.fetchExperts(Number(this.page) + 1);
        this.page = this.metaExperts.currentPage;
      } catch (err) {
        SetApiError(err);
      }
    }
  }
}
</script>

<style src="./Experts.scss" lang="scss" scoped/>
