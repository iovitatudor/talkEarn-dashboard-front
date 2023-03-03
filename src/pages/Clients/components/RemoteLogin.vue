<template>
  <div>
    <b-button size="md" variant="primary" pill @click="remoteLogin()">
      <i class="la la-arrow-right"/>
    </b-button>

  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "RemoteLogin",
  props: {
    client: {type: Object},
  },
  methods: {
    ...mapActions({
      onSuccess: 'alert/onSuccess',
    }),
    async remoteLogin() {
      await this.$socket.emit('remoteLogin', JSON.stringify({client: this.client}));
      this.onSuccess('The request was sent successfully');
    },
  }
}
</script>

<style scoped>

</style>