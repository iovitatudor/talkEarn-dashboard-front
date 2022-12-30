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
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(expert, key) in experts" :key="key">
                <td>
                  <b>{{ key + 1 }}</b>
                </td>
                <td>
                  <router-link :to="`/dashboard/experts/edit/${expert.id}`">
                    <img class="rounded-circle"
                         :src="`${$store.state.layout.processEnv.VUE_APP_BACK_END_URL}/${expert.avatar}`" alt=""
                         height="50" v-if="expert.avatar"/>
                    <img class="rounded-circle" src="https://hope.be/wp-content/uploads/2015/05/no-user-image.gif"
                         alt="" height="50" v-else/>
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
                    <span class="mb-0 mt-0">
                      <small>
                        <span class="fw-semi-bold">Category:</span>
                        <span class="text-muted">&nbsp; {{ expert.category ? expert.category.name : '---' }}</span>
                      </small>
                    </span> <br>
                    <span class="mb-0">
                      <small>
                        <span class="fw-semi-bold">Profession:</span>
                        <span class="text-muted">&nbsp; {{
                            expert.profession ? expert.profession : '---'
                          }}</span>
                      </small>
                    </span>
                  </div>
                </td>
                <td><b>{{ expert.price > 0 ? expert.price + '$/h' : '---' }}</b></td>
                <td>
                  <remove-expert :id="expert.id" v-if="expert.type !== 'Administrator'"/>
                  <p v-else>
                    <small> Project Administrator</small>
                  </p>
                </td>
              </tr>
              </tbody>
            </table>
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

export default {
  name: "Experts",
  components: {Widget, CreateExpert, RemoveExpert},
  data() {
    return {
      modalShow: false,
    }
  },
  computed: {
    ...mapGetters({
      experts: 'experts/getExperts',
    })
  },
  async mounted() {
    try {
      await this.fetchExperts();
    } catch (err) {
      SetApiError(err);
    }
  },
  methods: {
    ...mapActions({
      fetchExperts: 'experts/fetchExperts',
    }),
  }
}
</script>

<style src="./Experts.scss" lang="scss" scoped/>
