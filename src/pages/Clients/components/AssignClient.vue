<template>
  <div>
    <b-button size="md" variant="success" pill v-if="client.expertId === 0" @click="assignClient(authExpert.id)">
      <i class="la la-fire"/>
    </b-button>
    <b-button size="md" variant="warning" pill v-else @click="assignClient(0)">
      <i class="la la-fire"/>
    </b-button>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {SetApiError} from "../../../api/errors";

export default {
  name: "AssignClient",
  props: {
    client: {type: Object},
  },
  computed: {
    ...mapGetters({
      authExpert: 'auth/getAuthExpert',
    }),
  },
  methods: {
    ...mapActions({
      changeClientAssignment: 'client/changeClientAssignment',
      fetchAssignedClients: 'client/fetchAssignedClients',
      fetchNotAssignedClients: 'client/fetchNotAssignedClients',
      onSuccess: 'alert/onSuccess',
    }),
    async assignClient(expertId) {
      try {
        await this.changeClientAssignment({
          clientId: this.client.id,
          expertId,
        });
        if (expertId === 0) {
          await this.fetchAssignedClients(this.authExpert.id);
        } else {
          await this.fetchNotAssignedClients();
        }
        this.onSuccess('Client successfully assigned\n');
      } catch (err) {
        SetApiError(err);
      }
    },
  }
}
</script>