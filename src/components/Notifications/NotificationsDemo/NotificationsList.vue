<template>
  <b-list-group class="listGroup thin-scroll">
    <b-list-group-item class="listGroupItem" v-for="(notification, key) in notifications" :key="key">
      <b-row align-v="center">
        <b-col cols="2">
           <span class="notificationIcon thumb-sm">
             <img class="rounded-circle"
                  :src="`${getNotificationSenderImage(notification)}`"
                  v-if="getNotificationSenderImage(notification)"
                  height="50"/>
             <img class="rounded-circle"
                  src="https://hope.be/wp-content/uploads/2015/05/no-user-image.gif"
                  height="50"
                  v-else/>
          </span>
        </b-col>
        <b-col>
          <div class="m-0 overflow-hidden">
            <small>{{ notification.message }}</small><br><br>
            <b-row class="text-left">
              <b-col>
                <b-button size="xs"
                          block
                          variant="success"
                          @click="allowRequest(notification.id)">
                  Allow</b-button>
              </b-col>
              <b-col>
                <b-button size="xs"
                          block
                          variant="danger"
                          @click="denyRequest(notification.id)">
                  Deny</b-button>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </b-list-group-item>
  </b-list-group>
</template>

<script>

import {mapGetters, mapActions} from 'vuex';
import {SetApiError} from "../../../api/errors";

export default {
  name: 'NotificationsList',
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      notifications: 'notification/getNotifications',
    })
  },
  methods: {
    ...mapActions({
      allowSupervisorRequest: 'notification/allowSupervisorRequest',
      denySupervisorRequest: 'notification/denySupervisorRequest',
      onSuccess: 'alert/onSuccess',
    }),
    getNotificationSenderImage(notification) {
      if (notification.requestedId !== notification.supervisor.id) {
        return notification.supervisor.avatar;
      }
      return notification.supervisee.avatar;
    },
    async allowRequest(notificationId) {
      try {
        await this.allowSupervisorRequest(notificationId);
        this.onSuccess('The request was successfully accepted!');
      } catch (err) {
        SetApiError(err);
      }
    },
    async denyRequest(notificationId) {
      try {
        await this.denySupervisorRequest(notificationId);
        this.onSuccess('The request was successfully denied!');
      } catch (err) {
        SetApiError(err);
      }
    },
  }
};
</script>

<style src="./ListGroup.scss" lang="scss"/>
