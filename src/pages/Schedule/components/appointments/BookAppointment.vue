<template>
  <b-col md="3" class="appointments-item">
    <div class="appointments-item-inside" @click="showModal()">
      <p>
        {{ appointmentInfo.time }} -
        {{ $moment(appointmentInfo.time, 'HH.mm').add(appointmentInfo.duration, 'minutes') | moment("HH.mm") }}
      </p>
      <p> {{ appointment.duration }} min</p>
      <b-row>
        <b-col md="6">
          <b-badge pill variant="success" v-if="appointmentInfo.status === 'reserved'">
            {{ appointmentInfo.status }}
          </b-badge>
          <b-badge pill variant="primary" v-if="appointmentInfo.status === 'opened'">
            {{ appointmentInfo.status }}
          </b-badge>
          <b-badge pill variant="warning" v-if="appointmentInfo.status === 'hold'">
            {{ appointmentInfo.status }}
          </b-badge>
          <b-badge pill variant="danger" v-if="appointmentInfo.status === 'closed'">
            {{ appointmentInfo.status }}
          </b-badge>
        </b-col>
        <b-col md="6" class="text-right">
          <b-icon icon="x-circle"
                  @click.stop="attemptChangeStatus('closed')"
                  v-if="appointmentInfo.status !== 'closed'">
          </b-icon>
          <b-icon icon="check-circle-fill"
                  @click.stop="changeStatus('opened')"
                  v-if="appointmentInfo.status === 'closed'">
          </b-icon>

          <b-modal v-model="modalChangeStatus" title="" hide-footer>
            <h5 class="text-center">Are you sure?</h5>
            <p class="my-4 text-center">
              This action will cancel the reservation for this appointment!
            </p>
            <div class="text-center pb-16">
              <b-button class="mt-3 mr-5" variant="success" @click="modalChangeStatus = !modalChangeStatus">
                Cancel
              </b-button>
              <b-button class="mt-3" variant="danger" @click="changeStatus(statusToChange)">
                Continue
              </b-button>
            </div>
            <br>
          </b-modal>
        </b-col>
      </b-row>
    </div>
    <b-modal v-model="modalShow" title="Book an appointment" hide-footer>
      <Widget customHeader>
        <h5 class="text-center">
          {{ appointment.schedule.date | moment("dddd, MMMM Do YYYY") }},
          {{ appointmentInfo.time }} -
          {{ $moment(appointmentInfo.time, 'HH.mm').add(appointmentInfo.duration, 'minutes') | moment("HH.mm") }}
        </h5>

        <h5 v-if="appointment.appointmentReservation"
            class="text-center">
          <a :href="`https://instantexpert.online/ro/conference/${appointment.appointmentReservation.room.token}`"
             target="_blank">
            https://instantexpert.online/ro/conference/{{ appointment.appointmentReservation.room.token }}
          </a>
        </h5>
        <hr>
        <form class="mt" @submit.prevent="book">
          <b-row class="days-list">
            <b-col md="12">
              <b-form-group label="Full Name*" label-for="name">
                <b-input-group>
                  <input id="name"
                         class="form-control input-transparent pl-3"
                         type="text"
                         v-model="form.name"
                         required/>
                </b-input-group>
              </b-form-group>
              <b-form-group label="Email*" label-for="email">
                <b-input-group>
                  <input id="email"
                         class="form-control input-transparent pl-3"
                         type="email"
                         v-model="form.email"
                         required/>
                </b-input-group>
              </b-form-group>
              <b-form-group label="Phone*" label-for="phone">
                <b-input-group>
                  <input id="phone"
                         class="form-control input-transparent pl-3"
                         type="tel"
                         v-model="form.phone"
                         required/>
                </b-input-group>
              </b-form-group>
              <b-form-group label="Language" label-for="language">
                <b-input-group>
                  <select id="language"
                          class="form-control input-transparent pl-3"
                          v-model="form.language"
                          required>
                    <option :value="language.abbr" v-for="language in languages">{{ language.name }}</option>
                  </select>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col md="12" class="text-center">
              <b-button type="submit" variant="success" size="md" v-if="appointmentInfo.status === 'reserved'">
                Update data
              </b-button>
              <b-button type="submit" variant="success" size="md" v-else>
                Book now
              </b-button>
            </b-col>
          </b-row>
        </form>
      </Widget>
    </b-modal>
  </b-col>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import Widget from "../../../../components/Widget/Widget";
import {AppointmentApi} from "../../../../api/ScheduleApi/appointment";
import {SetApiError} from "../../../../api/errors";

export default {
  name: "BookAppointment",
  components: {Widget},
  props: {
    appointment: {type: Object},
  },
  data() {
    return {
      modalShow: false,
      modalChangeStatus: false,
      appointmentInfo: {},
      statusToChange: null,
      form: {
        name: '',
        email: '',
        phone: '',
        language: '',
      }
    };
  },
  computed: {
    ...mapGetters({
      languages: 'language/getLanguages',
    })
  },
  mounted() {
    this.appointmentInfo = this.appointment;
  },
  methods: {
    ...mapActions({
      onSuccess: 'alert/onSuccess',
    }),
    attemptChangeStatus(status) {
      this.statusToChange = status;
      this.modalChangeStatus = true;
    },
    async changeStatus(status) {
      try {
        if (status) {
          const result = await AppointmentApi.changeStatusAppointment(this.appointmentInfo.id, status);
          this.appointmentInfo = result.data;
          this.onSuccess('Status was changed successfully');
        }
        this.modalChangeStatus = false;
      } catch (e) {
        SetApiError(e);
      }
    },
    async showModal() {
      if (this.appointmentInfo.status === 'reserved') {
        await this.getReservedAppointment();
      }
      if (this.appointmentInfo.status !== 'closed') {
        this.modalShow = !this.modalShow;
      }
    },
    async getReservedAppointment() {
      try {
        const result = await AppointmentApi.getReservedAppointment(this.appointmentInfo.id);
        this.form.name = result.data.name;
        this.form.email = result.data.email;
        this.form.phone = result.data.phone;
        this.form.language = result.data.language;
      } catch (e) {
        SetApiError(e);
      }
    },
    async book() {
      try {
        const data = {
          appointmentId: this.appointment.id,
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          language: this.form.language,
        };
        if (this.appointmentInfo.status === 'opened') {
          const result = await AppointmentApi.bookAppointment(data);
          this.appointmentInfo = result.data;
        }

        if (this.appointmentInfo.status === 'reserved') {
          const result = await AppointmentApi.editBookAppointment(this.appointmentInfo.id, data);
          this.appointmentInfo = result.data;
        }

        this.modalShow = false;
        this.onSuccess('The reservation has been created successfully');
      } catch (e) {
        SetApiError(e);
      }
    }
  }
}
</script>

<style scoped>

</style>