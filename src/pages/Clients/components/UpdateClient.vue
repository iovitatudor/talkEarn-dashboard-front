<template>
  <div v-if="client">
    <b-row>
      <b-col md="8">
        <Widget customHeader>
          <h5>Client <small>{{ client.cookie }}</small></h5>
          <form class="mt" @submit.prevent="saveForm">
            <b-form-group label="Name" label-for="name">
              <b-input-group>
                <input id="name"
                       v-model="form.name=client.name"
                       class="form-control input-transparent pl-3"
                       type="text"
                       required/>
              </b-input-group>
            </b-form-group>
            <b-form-group label="Email" label-for="email">
              <b-input-group>
                <input id="email"
                       v-model="form.email=client.email"
                       class="form-control input-transparent pl-3"
                       type="text"
                       required/>
              </b-input-group>
            </b-form-group>
            <b-form-group label="Phone" label-for="Phone">
              <b-input-group>
                <input id="price"
                       v-model="form.phone=client.phone"
                       class="form-control input-transparent pl-3"
                       type="number"
                       required/>
              </b-input-group>
            </b-form-group>

            <b-form-group label="Avatar" label-for="avatar">
              <b-row>
                <b-col class="flex-center" md="9">
                  <b-form-file id="inputIcon" size="sm" ref="fileInput" @change="handleAvatarUpload"></b-form-file>
                </b-col>
                <b-col md="3">
                  <img class="rounded-circle"
                       :src="`${client.avatar}`" width="100px"
                       height="100"
                       v-if="client.avatar"/>
                  <img class="rounded-circle" src="https://hope.be/wp-content/uploads/2015/05/no-user-image.gif"
                       alt="" height="100" v-else/>
                </b-col>
              </b-row>
            </b-form-group>
            <div class="form-widget-footer text-center">
              <b-button type="submit" variant="success" size="md">
                <span class="auth-btn-circle">
                  <i class="la la-save"></i>
                </span>
                Save
              </b-button>
            </div>
          </form>
        </Widget>
      </b-col>
      <b-col md="4">
        <Widget customHeader>
          <h5>Generate an order</h5>
          <table class="table table-striped">
            <thead>
            <tr class="text-center">
              <th colspan="2">Details</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Price</td>
              <td>{{ authExpert.price }} USD</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td>60 min</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>{{ new Date() | moment("dddd, MMMM Do YYYY") }}</td>
            </tr>
            <tr>
              <td>Time</td>
              <td>{{ new Date() | moment("H:mm") }}</td>
            </tr>
            </tbody>
          </table>

          <div class="form-widget-footer text-center">
            <b-button type="button" variant="success" size="md" @click="sendPayment">
                <span class="auth-btn-circle">
                  <i class="la la-send"></i>
                </span>
              Send payment notification
            </b-button>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import {SetApiError} from "../../../api/errors";
import Widget from "../../../components/Widget/Widget";
import {OrderApi} from "../../../api/ContentApi/order";

export default {
  name: "UpdateClient",
  components: {Widget},
  props: {
    client: {type: Object},
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
      },
      avatar: null,
    };
  },
  computed: {
    ...mapGetters({
      authExpert: 'auth/getAuthExpert',
    }),
  },
  methods: {
    ...mapActions({
      editClient: 'client/editClient',
      onSuccess: 'alert/onSuccess',
    }),
    async sendPayment() {
      const date = new Date();
      const callDate = this.$moment(date, 'MM D, YYYY HH:mm:ss').format('Do MMMM YYYY');
      const callTime = this.$moment(date, 'MM D, YYYY HH:mm:ss').format('HH:mm');
      const data = {
        expert_id: this.authExpert.id,
        user_id: this.client.id,
        type: 'call',
        amount: this.authExpert.price,
        date: callDate,
        time: callTime,
        duration: '0',
      };
      try {
        const order = await OrderApi.createOrder(data);
        const notificationDetails = {
          client: this.client,
          order: order,
        };
        await this.$socket.emit('paymentNotification', JSON.stringify(notificationDetails));
        this.onSuccess('The notification was sent successfully.');
      } catch (e) {
        SetApiError(e);
      }
    },
    handleAvatarUpload(e) {
      this.avatar = e.target.files[0];
    },
    async saveForm() {
      try {
        const formData = new FormData();
        if (this.avatar) {
          formData.append('avatar', this.avatar);
        }
        Object.keys(this.form).forEach(key => formData.append(key, this.form[key]));
        const res = await this.editClient({id: this.client.id, data: formData});
        this.$emit('reloadComponent', res.data);
        this.$refs.fileInput.reset();
        this.onSuccess('Client has been edited successfully');
      } catch (err) {
        SetApiError(err);
      }
    }
  },
}
</script>