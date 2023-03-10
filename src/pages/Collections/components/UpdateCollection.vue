<template>
  <div>
    <Widget customHeader>
      <h5>Update Collection</h5>
      <form class="mt" @submit.prevent="updateCollection" v-if="!loading">
        <b-form-group :label="`Name [${defaultLanguage.abbr}]`" label-for="name">
          <b-input-group>
            <input id="name"
                   v-model="form.name=collection.name"
                   class="form-control input-transparent pl-3"
                   type="text"
                   required
                   placeholder="Name"/>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Icon" label-for="icon">
          <b-row>
            <b-col class="flex-center" md="10">
              <b-form-file id="inputIcon" size="sm" ref="fileInput" @change="handleIconUpload"></b-form-file>
            </b-col>
            <b-col>
              <img class="rounded-circle"
                   :src="`${collection.image}`"
                   @error="collection.image = null"
                   width="100px"
                   height="100"
                   v-if="collection.image"/>
              <img class="rounded-circle"
                   src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-4.png"
                   height="100"
                   v-else/>
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
    </Widget>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import Widget from "../../../components/Widget/Widget";
import {SetApiError} from "../../../api/errors";

export default {
  name: "UpdateCollection",
  components: {Widget},
  data() {
    return {
      loading: true,
      collection: null,
      form: {
        name: null,
        description: null,
      },
      image: null,
    }
  },
  computed: {
    ...mapGetters({
      defaultLanguage: 'language/getDefaultLanguage',
    }),
  },
  watch: {
    defaultLanguage() {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions({
      editCollection: 'collection/editCollection',
      onSuccess: 'alert/onSuccess',
      getCollectionById: 'collection/getCollectionById',
    }),
    async init() {
      const id = this.$route.params.id
      try {
        const res = await this.getCollectionById(id);
        this.collection = res.data;
        this.loading = false;
      } catch (err) {
        SetApiError(err);
      }
    },
    handleIconUpload(e) {
      this.image = e.target.files[0];
    },
    async updateCollection() {
      const formData = new FormData();
      if (this.icon) {
        formData.append('image', this.image);
      }
      formData.append('langId', this.defaultLanguage.id);
      formData.append('name', this.form.name);
      formData.append('description', this.form.description);

      try {
        const result = await this.editCollection({id: this.collection.id, data: formData});
        this.collection = result.data;
        this.$refs.fileInput.reset();
        this.onSuccess('Collection has been edited successfully');
      } catch (err) {
        SetApiError(err);
      }
    },
  }
}
</script>