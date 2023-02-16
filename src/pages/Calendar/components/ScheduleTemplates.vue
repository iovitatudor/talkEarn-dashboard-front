<template>
  <div>
    <Widget v-if="scheduleTemplates.length">
      <b-row>
        <b-col>
          <h5>Schedule Templates:</h5>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
              <tr>
                <th>#</th>
                <th>Week Day</th>
                <th>Consultation Duration</th>
                <th>Break between consultations</th>
                <th>Auto generation</th>
                <th>Regenerate At</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(scheduleTemplate, key) in scheduleTemplates" :key="key">
                <td>
                  <b>{{ key + 1 }}</b>
                </td>

                <td><b>{{ $moment().day(scheduleTemplate.day) | moment("dddd") }}</b></td>
                <td><b>{{ scheduleTemplate.consultationDuration }} minutes</b></td>
                <td><b>{{ scheduleTemplate.consultationBreak }} minutes</b></td>
                <td>
                  <b-badge variant="success" v-if="scheduleTemplate.autoGenerate">Yes</b-badge>
                  <b-badge variant="warning" v-else>No</b-badge>
                </td>
                <td>
                  {{ scheduleTemplate.regenerateDate | moment("dddd, MMMM Do YYYY") }}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </b-col>
      </b-row>
    </Widget>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import Widget from "../../../components/Widget/Widget";
import {ScheduleApi} from "../../../api/ScheduleApi/schedule";
import {SetApiError} from "../../../api/errors";

export default {
  name: "ScheduleTemplates",
  components: {Widget},
  data() {
    return {
      scheduleTemplates: [],
    };
  },
  watch: {
    schedule() {
      this.fetchScheduleTemplates();
    }
  },
  computed: {
    ...mapGetters({
      authExpert: 'auth/getAuthExpert',
      schedule: 'schedule/getSchedule',
    })
  },
  mounted() {
    this.fetchScheduleTemplates();
  },
  methods: {
    async fetchScheduleTemplates() {
      try {
        const result = await ScheduleApi.getScheduleTemplates(this.authExpert.id);
        this.scheduleTemplates = result.data;
      } catch (e) {
        SetApiError(e);
      }
    }
  }
}
</script>

<style scoped>

</style>