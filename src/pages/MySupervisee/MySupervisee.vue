<template>
  <div class="tables-basic">
    <b-breadcrumb>
      <b-breadcrumb-item to="/dashboard">Dashboard</b-breadcrumb-item>
      <b-breadcrumb-item active>My Supervisee</b-breadcrumb-item>
    </b-breadcrumb>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <h2 class="page-title">My Supervisee</h2>
          </b-col>
        </b-row>
        <Widget customHeader>
          <div class="table-responsive">
            <h5 v-if="!superviseeExperts.length" class="text-center">
              You don't have supervisee yet!
            </h5>
            <table class="table table-striped" v-else>
              <thead>
              <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Profession</th>
                <th>Schedule</th>
                <th>Information</th>
                <th>View Profile</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(expert, key) in superviseeExperts" :key="key" v-if="expert.type !== 'Administrator'">
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
                <td>
                  <b-modal size="lg" v-model="modalScheduleShow" :title="`${expert.name}'s schedule`" hide-footer>
                    <expert-schedule :expert="expert"/>
                  </b-modal>
                  <b-button size="md" variant="gray" pill @click="modalScheduleShow = !modalScheduleShow">
                    <i class="la la-calendar"/>
                  </b-button>
                </td>
                <td>
                  <b-button size="md" variant="gray" pill @click="modalShow = !modalShow">
                    <i class="la la-info"/>
                  </b-button>
                  <b-modal v-model="modalShow" title="Information" hide-footer>
                    <b-row>
                      <b-col cols="3">Experience:</b-col>
                      <b-col cols="9"><b>{{ expert.experience }} Years</b></b-col>
                    </b-row>
                    <hr>
                    <b-row>
                      <b-col cols="3">Language:</b-col>
                      <b-col cols="9"><b>{{ expert.language }}</b></b-col>
                    </b-row>
                    <hr>
                    <b-row>
                      <b-col cols="3">Price:</b-col>
                      <b-col cols="9"><b>{{ expert.price > 0 ? expert.price + '$/h' : '---' }}</b></b-col>
                    </b-row>
                    <hr>
                    <b-row>
                      <b-col cols="3">Rating:</b-col>
                      <b-col cols="9"><b>{{ expert.rating }}</b></b-col>
                    </b-row>
                    <hr>
                    <b-row>
                      <b-col cols="3">Description:</b-col>
                      <b-col cols="9"><p v-html="expert.description"></p></b-col>
                    </b-row>
                    <hr>
                  </b-modal>
                </td>
                <td>
                  <a :href="`https://instantexpert.online/expert/${expert.category.slug}/${expert.slug}`"
                     class="btn btn-gray btn-md rounded-pill"
                     target="_blank">
                    <i class="la la-link"/>
                  </a>
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
import {ExpertApi} from '../../api/ContentApi/expert';
import ExpertSchedule from "../Schedule/components/ExpertSchedule";

export default {
  name: "MySupervisee",
  components: {Widget, ExpertSchedule},
  data() {
    return {
      modalScheduleShow: false,
      modalShow: false,
      authExpertData: {},
      superviseeExperts: [],
    }
  },
  computed: {
    ...mapGetters({
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
      onSuccess: 'alert/onSuccess',
      getExpertById: 'experts/getExpertById',
    }),
    async init() {
      try {
        const result = await ExpertApi.getExpertSupervisee(this.defaultLanguage.abbr, this.authExpert.id);
        this.superviseeExperts = result.data.data;
      } catch (err) {
        SetApiError(err);
      }
    },
  }
}
</script>

<style lang="scss" scoped/>
