<template>
  <form class="mt" @submit.prevent="save" v-if="service">
    <b-row>
      <b-col>
        <b-form-group label="Title" label-for="title">
          <b-input-group>
            <input id="title"
                   v-model="form.name=service.name"
                   class="form-control input-transparent pl-3"
                   type="text"
                   required
                   placeholder="Title"/>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Price" label-for="price">
          <b-input-group>
            <input id="price"
                   v-model="form.price=service.price"
                   class="form-control input-transparent pl-3"
                   type="number"
                   required
                   placeholder="Price"/>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-form-group label="Description" label-for="description">
      <b-input-group>
            <textarea id="description"
                      v-model="form.description=service.description"
                      rows="3"
                      class="form-control input-transparent pl-3"
                      placeholder="Description">
            </textarea>
      </b-input-group>
    </b-form-group>
    <b-form-group label="Image" label-for="image">
      <b-row>
        <b-col class="flex-center" md="10">
          <b-form-file :id="`inputImage${service.id}`" size="sm" ref="fileInput"
                       @change="handleIconUpload"></b-form-file>
        </b-col>
        <b-col md="2">
          <img class="rounded-circle"
               :src="`${$store.state.layout.processEnv.VUE_APP_BACK_END_URL}/${service.image}`"
               width="50"
               height="50"
               v-if="service.image && service.image !== 'null'"/>
          <img class="rounded-circle"
               src="https://hope.be/wp-content/uploads/2015/05/no-user-image.gif"
               height="50"
               width="50"
               v-else/>
        </b-col>
      </b-row>
    </b-form-group>
    <div class="form-widget-footer text-right">
      <slot name="remove-service"/>
      <b-button type="submit" variant="success" size="sm" class="ml-4">
        <span class="auth-btn-circle">
          <i class="la la-save"></i>
        </span>
        Save
      </b-button>
    </div>
  </form>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import {SetApiError} from "../../../../api/errors";

export default {
  name: "EditService",
  props: {
    service: {type: Object},
    expertId: {type: Number},
  },
  data() {
    return {
      form: {
        name: null,
        price: null,
        description: null,
      },
      image: null,
    }
  },
  methods: {
    ...mapActions({
      editService: 'services/editService',
      destroyService: 'services/destroyService',
      onSuccess: 'alert/onSuccess',
    }),
    handleIconUpload(e) {
      this.image = e.target.files[0];
    },
    async save() {
      const formData = new FormData();
      if (this.image) {
        formData.append('image', this.image);
      }
      formData.append('expert_id', this.expertId);
      Object.keys(this.form).forEach(key => formData.append(key, this.form[key]));

      try {
        const result = await this.editService({id: this.service.id, data: formData});
        this.$emit('editService', result.data);
        this.onSuccess('Service has been edited successfully');
      } catch (err) {
        SetApiError(err);
      }
    }
  }
}
</script>