<template>
  <span>
    <b-button type="button" variant="danger" size="sm" class="ml-4"  @click="modalShow = !modalShow">
        <span class="auth-btn-circle">
          <i class="la la-trash"></i>
        </span>
      Delete
    </b-button>
    <b-modal v-model="modalShow" title="" hide-footer>
      <h5 class="text-center">Are you sure?</h5>
      <p class="my-4 text-center">
        This service will be permanently deleted!
      </p>
      <div class="text-center pb-16">
        <b-button class="mt-3 mr-5" variant="success" @click="modalShow = !modalShow">
          Cancel
        </b-button>
        <b-button class="mt-3" variant="danger" @click="removeService(serviceId)">
          Delete
        </b-button>
      </div>
      <br>
    </b-modal>
  </span>
</template>

<script>
import {mapActions} from "vuex";
import {SetApiError} from "../../../../api/errors";

export default {
  name: "RemoveService",
  props: {
    serviceId: {type: Number},
  },
  data() {
    return {
      modalShow: false,
    }
  },
  methods: {
    ...mapActions({
      deleteService: 'services/destroyService',
      onSuccess: 'alert/onSuccess',
    }),
    async removeService(id) {
      try {
        const result = await this.deleteService(id);
        this.$emit('removeService', result);
        this.onSuccess('Service was successfully deleted.');
        this.modalShow = false;
      } catch (err) {
        SetApiError(err);
      }
    }
  }
}
</script>