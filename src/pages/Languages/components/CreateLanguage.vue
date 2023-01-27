<template>
  <div>
    <Widget customHeader>
      <h5>Add new Language</h5>
      <form class="mt" @submit.prevent="saveLanguage">
        <b-form-group label="Name" label-for="name">
          <b-input-group>
            <input id="name"
                   v-model="form.name"
                   class="form-control input-transparent pl-3"
                   type="text"
                   required/>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Abbr" label-for="abbr">
          <b-input-group>
            <input id="abbr"
                   v-model="form.abbr"
                   class="form-control input-transparent pl-3"
                   type="text"
                   required/>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Icon" label-for="icon">
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
  name: "CreateLanguage",
  components: {Widget},
  data() {
    return {
      form: {
        name: '',
        abbr: '',
        default: false,
      },
      icon: '',
    }
  },
  methods: {
    ...mapActions({
      addLanguage: 'language/saveLanguage',
      onSuccess: 'alert/onSuccess',
    }),
    handleIconUpload(e) {
      this.icon = e.target.files[0];
    },
    async saveLanguage() {
      const formData = new FormData();
      formData.append('icon', this.icon);
      formData.append('name', this.form.name);
      formData.append('abbr', this.form.abbr);

      try {
        await this.addLanguage(formData);
        this.onSuccess('Language has been created successfully\n');
        this.form.name = '';
        this.form.abbr = '';
        this.icon = '';
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