<template>
  <span>
    <b-button variant="default" class="mr-3" size="md" @click="modalShow = !modalShow">
      <b-icon icon="trash"></b-icon>
      Delete schedule
    </b-button>
    <b-modal v-model="modalShow" title="" hide-footer>
      <h5 class="text-center">Are you sure?</h5>
      <p class="my-4 text-center">
        This will delete the entire schedule, including the appointment booking!
      </p>
      <div class="text-center pb-16">
        <b-button class="mt-3 mr-5" variant="success" @click="modalShow = !modalShow">
          Cancel
        </b-button>
        <b-button class="mt-3" variant="danger" @click="removeSchedule()">
          Delete
        </b-button>
      </div>
      <br>
    </b-modal>
  </span>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {SetApiError} from "../../../api/errors";

export default {
  name: "DeleteSchedule",
  props: {
    id: {type: Number}
  },
  data() {
    return {
      modalShow: false,
    }
  },
  computed: {
    ...mapGetters({
      authExpert: 'auth/getAuthExpert',
    })
  },
  methods: {
    ...mapActions({
      destroySchedule: 'schedule/destroySchedule',
      onSuccess: 'alert/onSuccess',
    }),
    async removeSchedule(id) {
      try {
        await this.destroySchedule(this.authExpert.id);
        this.onSuccess('Schedule was successfully deleted.');
        this.modalShow = false;
      } catch (err) {
        SetApiError(err);
      }
    }
  }
}
</script>