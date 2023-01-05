<template>
  <div>
    <b-button type="submit" variant="default" size="sm" @click="modalShow = !modalShow">
      <span class="auth-btn-circle">
        <i class="la la-plus"></i>
      </span>
      Add new
    </b-button>
    <b-modal v-model="modalShow" title="Create new service" hide-footer>
      <div class="pb-16">
        <form class="mt" @submit.prevent="save">
          <b-row>
            <b-col>
              <b-form-group label="Title" label-for="title">
                <b-input-group>
                  <input id="title"
                         v-model="form.name"
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
                         v-model="form.price"
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
                      v-model="form.description"
                      rows="3"
                      class="form-control input-transparent pl-3"
                      required
                      placeholder="Description">
            </textarea>
            </b-input-group>
          </b-form-group>
          <b-form-group label="Image" label-for="image">
            <b-row>
              <b-col class="flex-center" md="12">
                <b-form-file id="inputImage" size="sm" ref="inputImage" @change="handleIconUpload"></b-form-file>
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
      </div>
      <br>
    </b-modal>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {SetApiError} from "../../../../api/errors";

export default {
  name: "CreateService",
  props: {
    expertId: {type: Number},
  },
  data() {
    return {
      modalShow: false,
      form: {
        name: null,
        description: null,
        price: 0,
      },
      image: null,
    };
  },
  methods: {
    ...mapActions({
      saveService: 'services/saveService',
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
        const result = await this.saveService(formData);
        this.$emit('addService', result.data);
        this.onSuccess('Service has been created successfully');
        this.modalShow = false;
        this.resetForm();
      } catch (err) {
        SetApiError(err);
      }
    },
    resetForm() {
      this.form.name = null;
      this.form.description = null;
      this.form.price = null;
      this.$refs.inputImage.reset();
    }
  }
}
</script>
