<template>
  <div>
    <Widget customHeader>
      <b-row>
        <b-col cols="5">
          <v-date-picker locale="en"
                         is-expanded
                         @dayclick="onDayClick"
                         :min-date="minDate"
                         :max-date="maxDate"
                         :attributes="attributes"
                         v-model='myDate'/>
        </b-col>
        <b-col md="7">
          <appointments v-if="appointments.length"
                        :appointments="appointments"
                        :schedule="chooseSchedule"
                        :expert="expert"/>
          <p class="d-flex align-items-center justify-content-center text-center" v-else><br> <br>
            <b>There are no matching appointments for <br>
              <b>{{ selectedDay | moment("dddd, MMMM Do YYYY") }}</b>, <br>
              please choose another day.
            </b>
          </p>
        </b-col>
      </b-row>
    </Widget>
  </div>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import Widget from "../../../components/Widget/Widget";
import CalendarSettings from "./../components/ScheduleSettings";
import DeleteSchedule from "./../components/DeleteSchedule";
import ScheduleTemplates from "./../components/ScheduleTemplates";
import Appointments from "./../components/appointments/Appointments";
import {SetApiError} from "../../../api/errors";
import {AppointmentApi} from "../../../api/ScheduleApi/appointment";

export default {
  name: "ExpertSchedule",
  components: {Widget, CalendarSettings, DeleteSchedule, Appointments, ScheduleTemplates},
  props: {
    expert: {type: Object},
  },
  data() {
    return {
      minDate: new Date(),
      maxDate: new Date(),
      chooseSchedule: {},
      myDate: '',
      appointments: [],
      modalShow: false,
      attributes: [],
      selectedDay: new Date(),
    };
  },
  watch: {
    schedule() {
      const scheduleDates = this.schedule.map(schedule => {
        return new Date(schedule.date);
      })
      this.attributes = [];
      this.attributes.push({
        key: 'today',
        highlight: 'teal',
        dates: new Date(),
      });

      const disabledScheduleDates = [];

      let loop = new Date(this.minDate);
      while (loop <= this.maxDate) {
        disabledScheduleDates.push(loop);
        const newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
      }

      this.attributes.push({
        highlight: {
          class: 'date-circle',
          contentClass: 'date-text',
          fillMode: 'light',
        },
        dates: disabledScheduleDates,
      });

      this.attributes.push({
        highlight: {
          color: 'green',
          fillMode: 'light',
        },
        dates: scheduleDates,
      });

      this.onDayClick(this.formatDate(this.selectedDay));
    }
  },
  computed: {
    ...mapGetters({
      defaultLanguage: 'language/getDefaultLanguage',
      authExpert: 'auth/getAuthExpert',
      schedule: 'schedule/getSchedule',
    }),
  },
  mounted() {
    this.$bus.on('refreshAppointments', (date) => {
      this.fetchAppointments(date.date);
    });
    this.maxDate = this.minDate.setDate(this.minDate.getDate() + 31);
    this.init();
  },
  methods: {
    ...mapActions({
      getSchedule: 'schedule/getSchedule',
      getExpert: 'experts/getExpertById',
    }),
    async init() {
      try {
        await this.getSchedule(this.expert.id);
      } catch (e) {
        SetApiError(e);
      }
    },
    async onDayClick(day) {
      const scheduleSimpleDates = this.schedule.map(schedule => {
        return schedule.date;
      })
      this.appointments = [];
      this.selectedDay = this.formatDate(day.date);
      if (scheduleSimpleDates.includes(this.formatDate(day.date))) {
        await this.fetchAppointments(this.formatDate(day.date))
      }
    },
    async fetchAppointments(day) {
      if (day) {
        try {
          const result = await AppointmentApi.getOpenedMatchedAppointments(
            this.authExpert.id,
            this.expert.id,
            day
          );
          this.appointments = result.data.data;
          this.chooseSchedule = result.data.schedule;
        } catch (e) {
          this.appointments = [];
        }
      }
    },
    formatDate(date = new Date()) {
      const year = date.toLocaleString('default', {year: 'numeric'});
      const month = date.toLocaleString('default', {month: '2-digit'});
      const day = date.toLocaleString('default', {day: '2-digit'});

      return [year, month, day].join('-');
    }
  }
}
</script>

<style>
.date-circle {
  background: #FFF !important;
  opacity: 0.3 !important;
}

.date-text {
  color: #cbd5e0 !important;
}
</style>