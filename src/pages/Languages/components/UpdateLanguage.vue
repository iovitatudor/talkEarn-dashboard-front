<template>
  <div>
    <Widget customHeader>
      <h5>Update Language</h5>
      <form class="mt" @submit.prevent="updateCategory" v-if="!loading">
        <b-form-group label="Name" label-for="name">
          <b-input-group>
            <input id="name"
                   v-model="form.name=language.name"
                   class="form-control input-transparent pl-3"
                   type="text"
                   required
                   placeholder="Name"/>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Abbr" label-for="abbr">
          <b-input-group>
            <input id="abbr"
                   v-model="form.abbr=language.abbr"
                   class="form-control input-transparent pl-3"
                   type="text"
                   required/>
          </b-input-group>
        </b-form-group>
        <b-row>
          <b-col md="8">
            <b-form-group label="Icon" label-for="icon">
              <b-row>
                <b-col class="flex-center" md="8">
                  <b-form-file id="inputIcon" size="sm" ref="fileInput" @change="handleIconUpload"></b-form-file>
                </b-col>
                <b-col>
                  <img class="rounded-circle"
                       :src="`${language.icon}`"
                       @error="language.icon = null"
                       width="100px"
                       height="100"
                       v-if="language.icon"/>
                  <img class="rounded-circle"
                       src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-4.png"
                       height="100"
                       v-else/>
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col class="flex-center" md="4">
            <input class="styled-checkbox" id="styled-checkbox-2" type="checkbox" value="value1"
                   v-model="form.default=language.default">
            <label for="styled-checkbox-2">Default</label>
          </b-col>
        </b-row>
        <div class="form-widget-footer text-center">
          <b-button type="submit" variant="success" size="md">
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
  name: "UpdateLanguage",
  components: {Widget},
  data() {
    return {
      loading: true,
      language: null,
      form: {
        name: '',
        abbr: '',
        default: false,
      },
      icon: null,
    }
  },
  async mounted() {
    const id = this.$route.params.id
    try {
      const res = await this.getLanguageById(id);
      this.language = res.data;
      this.loading = false;
    } catch (err) {
      SetApiError(err);
    }
  },
  methods: {
    ...mapActions({
      editLanguage: 'language/editLanguage',
      onSuccess: 'alert/onSuccess',
      getLanguageById: 'language/getLanguageById',
    }),
    handleIconUpload(e) {
      this.icon = e.target.files[0];
    },
    async updateCategory() {
      const formData = new FormData();
      if (this.icon) {
        formData.append('icon', this.icon);
      }
      formData.append('name', this.form.name);
      formData.append('abbr', this.form.abbr);
      formData.append('default', this.form.default);

      try {
        const language = await this.editLanguage({id: this.language.id, data: formData});
        this.language = language.data;
        this.$refs.fileInput.reset();
        this.onSuccess('Language has been edited successfully');
      } catch (err) {
        SetApiError(err);
      }
    },
  }
}
</script>