<template>
  <section class="notifications navbar-notifications">
    <header class="header">
      <h6 class="my-3 text-center">You have {{ notifications.length }} notifications</h6>
    </header>

    <NotifictionsList/>

    <footer class="text-sm footer px-4 py-2">
      <span class="fs-mini">Synced at: {{ new Date() | moment('DD MM YYYY, hh:mm:ss') }}</span>
      <b-button
        variant="link"
        @click="loadNotifications"
        :class="{disabled: isLoad, 'btn-xs float-right py-0': true}"
      >
        <span v-if="isLoad"><i class="la la-refresh la-spin"/> Loading...</span>
        <i v-else class="la la-refresh"/>
      </b-button>
    </footer>
  </section>
</template>

<script>
import Vue from 'vue';
import {mapGetters, mapActions} from 'vuex';
import NotifictionsList from './NotificationsDemo/NotificationsList';
import NewNotifictionsList from './NotificationsDemo/NewNotificationsList';
import Messages from './NotificationsDemo/Messages';
import Progress from './NotificationsDemo/Progress';

export default {
  name: 'Notification',
  components: {
    NotifictionsList, NewNotifictionsList, Messages, Progress,
  },
  data() {
    return {
      notificationsTabSelected: 1,
      newNotifications: null,
      isLoad: false,
    };
  },
  computed: {
    ...mapGetters({
      notifications: 'notification/getNotifications',
      authExpert: 'auth/getAuthExpert',
    })
  },
  async mounted() {
    await this.getNotifications(this.authExpert.id);
  },
  methods: {
    ...mapActions({
      getNotifications: 'notification/getAllNotifications',
    }),
    async loadNotifications() {
      Vue.set(this, 'isLoad', true);

      setTimeout(async () => {
        Vue.set(this, 'newNotifications', 'new notifications component');
        Vue.set(this, 'isLoad', false);
        await this.getNotifications(this.authExpert.id);
      }, 1500);
    },
  },
};
</script>

<style src="./Notifications.scss" lang="scss"/>
