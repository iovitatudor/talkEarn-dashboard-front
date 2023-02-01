<template>
  <div>
    <Widget customHeader>
      <h5>Add new category</h5>
      <form class="mt" @submit.prevent="saveCategory">

        <b-form-group :label="`Name [${defaultLanguage.abbr}]`" label-for="name">
          <b-input-group>
            <input id="name"
                   v-model="form.name"
                   class="form-control input-transparent pl-3"
                   type="text"
                   required/>
          </b-input-group>
        </b-form-group>
        <b-form-group :label="`Description [${defaultLanguage.abbr}]`" label-for="description">
          <b-input-group>
                <textarea rows="8"
                          id="description"
                          v-model="form.description"
                          class="form-control input-transparent pl-3"
                          required>
                  </textarea>
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

import {mapActions, mapGetters} from "vuex";
import Widget from "../../../components/Widget/Widget";
import {SetApiError} from "../../../api/errors";

export default {
  name: "CreateCategory",
  components: {Widget},
  data() {
    return {
      form: {
        name: '',
        description: '',
      },
      icon: null,
    }
  },
  computed: {
    ...mapGetters({
      defaultLanguage: 'language/getDefaultLanguage',
    }),
  },
  methods: {
    ...mapActions({
      addCategory: 'categories/saveCategory',
      onSuccess: 'alert/onSuccess',
    }),
    handleIconUpload(e) {
      this.icon = e.target.files[0];
    },
    async saveCategory() {
      const formData = new FormData();
      if (this.icon) {
        formData.append('icon', this.icon);
      }
      formData.append('langId', this.defaultLanguage.id);
      formData.append('name', this.form.name);
      formData.append('description', this.form.description);

      try {
        await this.addCategory(formData);
        this.onSuccess('Category has been created successfully\n');
        this.form.name = '';
        this.form.description = '';
        this.icon = null;
        this.$refs.fileInput.reset();
      } catch (err) {
        SetApiError(err);
      }
    },
  }
}
</script>