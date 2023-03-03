<template>
  <div class="tables-basic">
    <b-breadcrumb>
      <b-breadcrumb-item to="/dashboard">Dashboard</b-breadcrumb-item>
      <b-breadcrumb-item active>My Experts</b-breadcrumb-item>
    </b-breadcrumb>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <h2 class="page-title">My Experts</h2>
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
                <th>Profession</th>
                <th>Experience</th>
                <th>Language</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Description</th>
                <th>View Profile</th>
                <th>Assign as Supervisor</th>
                <th>Assign as Supervisee</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(expert, key) in experts" :key="key" v-if="expert.type !== 'Administrator'">
                <td>
                  <b>{{ key + 1 }}</b>
                </td>
                <td>
                  <img class="rounded-circle"
                       :src="`${expert.avatar}`"
                       @error="expert.avatar = null"
                       v-if="expert.avatar"
                       height="50"/>
                  <img class="rounded-circle"
                       src="https://hope.be/wp-content/uploads/2015/05/no-user-image.gif"
                       height="50"
                       v-else/>
                </td>
                <td><b>{{ expert.name }}</b></td>
                <td><b>{{ expert.profession }}</b></td>
                <td><b>{{ expert.experience }} Years</b></td>
                <td><b>{{ expert.language }}</b></td>
                <td><b>{{ expert.price > 0 ? expert.price + '$/h' : '---' }}</b></td>
                <td><b>{{ expert.rating }}</b></td>
                <td>
                  <b-button size="md" variant="gray" pill @click="modalShow = !modalShow">
                    <i class="la la-pen"/>
                  </b-button>
                  <b-modal v-model="modalShow" title="" hide-footer>
                    <h5 class="text-center">Description</h5>
                    <p class="my-4" v-html="expert.description"></p>
                    <br>
                  </b-modal>
                </td>
                <td>
                  <a :href="`https://instantexpert.online/expert/${expert.category.slug}/${expert.slug}`"
                     class="btn btn-gray btn-md rounded-pill"
                     target="_blank">
                    <i class="la la-link"/>
                  </a>
                </td>
                <td>
                  <b-button variant="success" @click="assignAsSupervisor(expert.id)">
                    <i class="la la-handshake" style="font-size: 28px;"/>
                  </b-button>
                </td>
                <td>
                  <b-button size="md" variant="primary" @click="assignAsSupervisee(expert.id)">
                    <i class="la la-hands-helping" style="font-size: 28px;"/>
                  </b-button>
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
import {SupervisorApi} from "../../api/NotificationApi/supervisor";

export default {
  name: "MyExperts",
  components: {Widget},
  data() {
    return {
      modalShow: false,
      authExpertData: {},
    }
  },
  computed: {
    ...mapGetters({
      experts: 'experts/getExperts',
      defaultLanguage: 'language/getDefaultLanguage',
      authExpert: 'auth/getAuthExpert',
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
      onSuccess: 'alert/onSuccess',
      getExpertById: 'experts/getExpertById',
    }),
    async init() {
      try {
        const result = await this.getExpertById(this.authExpert.id);
        this.authExpertData = result.data;
        await this.fetchExperts();
      } catch (err) {
        SetApiError(err);
      }
    },
    async assignAsSupervisor(expertId) {
      const data = {
        supervisorId: expertId,
        superviseeId: this.authExpert.id,
        requestedId: expertId,
        status: 'opened',
        message: `${this.authExpertData.name} wants to assign you as a supervisor`,
      };
      try {
        await SupervisorApi.createRequestToAssign(data);
        this.onSuccess('The request was sent successfully');
      } catch (err) {
        SetApiError(err);
      }
    },
    async assignAsSupervisee(expertId) {
      console.log(this.authExpertData);
      const data = {
        supervisorId: this.authExpert.id,
        superviseeId: expertId,
        requestedId: expertId,
        status: 'opened',
        message: `${this.authExpertData.name} wants to assign you as a supervisee`,
      };
      try {
        await SupervisorApi.createRequestToAssign(data);
        this.onSuccess('The request was sent successfully');
      } catch (err) {
        SetApiError(err);
      }
    }
  }
}
</script>

<style lang="scss" scoped/>
