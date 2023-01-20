<template>
  <div>
    <b-button size="md" variant="gray" pill @click="modalShow = !modalShow">
      <i class="la la-trash"/>
    </b-button>
    <b-modal v-model="modalShow" title="" hide-footer>
      <h5 class="text-center">Are you sure?</h5>
      <p class="my-4 text-center">
        This collection and its links will be permanently deleted!
      </p>
      <div class="text-center pb-16">
        <b-button class="mt-3 mr-5" variant="success" @click="modalShow = !modalShow">
          Cancel
        </b-button>
        <b-button class="mt-3" variant="danger" @click="removeCollection(id)">
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
  name: "RemoveCollection",
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
      deleteCollection: 'collection/destroyCollection',
      onSuccess: 'alert/onSuccess',
    }),
    async removeCollection(id) {
      try {
        await this.deleteCollection(id);
        this.onSuccess('Collection was successfully deleted.');
        this.modalShow = false;
      } catch (err) {
        SetApiError(err);
      }
    }
  }
}
</script>

<style scoped>

</style>