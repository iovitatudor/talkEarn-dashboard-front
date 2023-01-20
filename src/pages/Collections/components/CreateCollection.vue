<template>
  <div>
    <Widget customHeader>
      <h5>Add new Collection</h5>
      <form class="mt" @submit.prevent="saveCollection">
        <b-form-group label="Name" label-for="name">
          <b-input-group>
            <input id="name"
                   v-model="form.name"
                   class="form-control input-transparent pl-3"
                   type="text"
                   required
                   placeholder="Name"/>
          </b-input-group>
        </b-form-group>
<!--        <b-form-group label="Description" label-for="description">-->
<!--          <b-input-group>-->
<!--                <textarea rows="8"-->
<!--                          id="description"-->
<!--                          v-model="form.description"-->
<!--                          class="form-control input-transparent pl-3"-->
<!--                          required-->
<!--                          placeholder="Description">-->
<!--                  </textarea>-->
<!--          </b-input-group>-->
<!--        </b-form-group>-->
        <b-form-group label="Image" label-for="icon">
          <b-form-file id="file-small" size="sm" ref="fileInput" @change="handleIconUpload"></b-form-file>
        </b-form-group>
        <div class="form-widget-footer">
          <b-button block type="submit" variant="success" size="md">
                <span class="auth-btn-circle">
                  <i class="la la-save"></i>
                </span>
            Save
          </b-button>
        </div>
      </form>
    </Widget>
  </div>
</template>

<script>

import {mapActions} from "vuex";
import Widget from "../../../components/Widget/Widget";
import {SetApiError} from "../../../api/errors";

export default {
  name: "CreateCollection",
  components: {Widget},
  data() {
    return {
      form: {
        name: null,
        description: null,
      },
      image: null,
    }
  },
  methods: {
    ...mapActions({
      addCollection: 'collection/saveCollection',
      onSuccess: 'alert/onSuccess',
    }),
    handleIconUpload(e) {
      this.image = e.target.files[0];
    },
    async saveCollection() {
      const formData = new FormData();
      formData.append('image', this.image);
      formData.append('name', this.form.name);
      formData.append('description', this.form.description);

      try {
        await this.addCollection(formData);
        this.onSuccess('Collection has been created successfully');
        this.form.name = null;
        this.form.description = null;
        this.icon = null;
        this.$refs.fileInput.reset();
      } catch (err) {
        SetApiError(err);
      }
    },
  }
}
</script>

<style scoped>

</style>