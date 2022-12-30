<template>
  <div>
    <b-button size="md" variant="gray" pill @click="modalShow = !modalShow">
      <i class="la la-trash"/>
    </b-button>
    <b-modal v-model="modalShow" title="" hide-footer>
      <h5 class="text-center">Are you sure?</h5>
      <p class="my-4 text-center">
        This parameter and its links will be permanently deleted!
      </p>
      <div class="text-center pb-16">
        <b-button class="mt-3 mr-5" variant="success" @click="modalShow = !modalShow">
          Cancel
        </b-button>
        <b-button class="mt-3" variant="danger" @click="removeParameter(id)">
          Delete
        </b-button>
      </div>
      <br>
    </b-modal>
  </div>
</template>

<script>

import {mapActions} from "vuex";
import {SetApiError} from "../../../api/errors";

export default {
  name: "RemoveParameter",
  props: {
    id: {type: Number}
  },
  data() {
    return {
      modalShow: false,
    }
  },
  methods: {
    ...mapActions({
      deleteParameter: 'parameters/destroyParameter',
      onSuccess: 'alert/onSuccess',
    }),
    async removeParameter(id) {
      try {
        await this.deleteParameter(id);
        this.onSuccess('Parameter was successfully deleted.');
        this.modalShow = false;
      } catch (err) {
        SetApiError(err);
      }
    }
  }
}
</script>