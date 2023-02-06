<template>
  <div>
    <Widget customHeader v-if="expert">
      <b-row class="flex-fill">
        <b-col md="12">
          <h5>Expert Video [{{ defaultLanguage.abbr }}]</h5>
        </b-col>
      </b-row>
      <form class="mt" @submit.prevent="saveForm">
        <div v-if="expert.video">
          <video :src="expert.video" width="100%" controls></video>
        </div>
        <b-form-group :label="`Video [${defaultLanguage.abbr}]`" label-for="video">
          <b-input-group>
            <b-form-file id="file-small" size="sm" ref="fileInput" @change="handleVideoUpload"></b-form-file>
          </b-input-group>
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
    </Widget>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import Widget from "../../../components/Widget/Widget";
import {mapActions} from "vuex";
import {SetApiError} from "../../../api/errors";

export default {
  name: "UpdateExpertVideo",
  components: {Widget},
  props: {
    expert: {type: Object},
  },
  data() {
    return {
      video: null,
    };
  },
  computed: {
    ...mapGetters({
      defaultLanguage: 'language/getDefaultLanguage',
    }),
  },
  methods: {
    ...mapActions({
      editExpertVideo: 'experts/editExpertVideo',
      onSuccess: 'alert/onSuccess',
    }),
    handleVideoUpload(e) {
      this.video = e.target.files[0];
    },
    async saveForm() {
      try {
        const formData = new FormData();
        formData.append('video', this.video);
        formData.append('langId', this.defaultLanguage.id);
        const res = await this.editExpertVideo({id: this.expert.id, data: formData});
        this.$emit('reloadComponent', res.data);
        this.onSuccess('Expert video has been edited successfully');
      } catch (err) {
        SetApiError(err);
      }
    }
  },
}
</script>

<style scoped>

</style>