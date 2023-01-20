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
        <Widget customHeader>
          <form class="mt" @submit.prevent="save">
            <b-row>
              <b-col md="12">
                <b-form-group label="Collection" label-for="collection">
                  <b-input-group>
                    <select id="collection"
                            v-model="form.collectionId"
                            class="form-control input-transparent pl-3">
                      <option :value="collection.id"
                              :key="key"
                              v-for="(collection, key) in collections">
                        {{ collection.name }}
                      </option>
                    </select>
                  </b-input-group>
                </b-form-group>
              </b-col>
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
                      placeholder="Description">
            </textarea>
              </b-input-group>
            </b-form-group>
            <b-row>
              <b-col>
                <b-form-group label="Video" label-for="video">
                  <b-row>
                    <b-col class="flex-center" md="12">
                      <b-form-file id="inputVideo" size="sm" ref="inputVideo" @change="handleVideoUpload"></b-form-file>
                    </b-col>
                  </b-row>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Hash" label-for="hash">
                  <b-input-group>
                    <input id="hash"
                           v-model="form.hash"
                           class="form-control input-transparent pl-3"
                           type="text"
                           required
                           placeholder="Hash"/>
                  </b-input-group>
                </b-form-group>
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
      <br>
    </b-modal>
  </div>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import Widget from "../../../../components/Widget/Widget";
import {SetApiError} from "../../../../api/errors";

export default {
  name: "CreateService",
  components: {Widget},
  props: {
    expertId: {type: Number},
  },
  data() {
    return {
      modalShow: false,
      form: {
        collectionId: 1,
        name: '',
        description: '',
        price: 0,
        hash: ''
      },
      video: null,
    };
  },
  computed: {
    ...mapGetters({
      collections: 'collection/getCollections',
    }),
  },
  mounted() {
    this.form.collectionId = this.collections[0].id;
  },
  methods: {
    ...mapActions({
      saveService: 'services/saveService',
      onSuccess: 'alert/onSuccess',
    }),
    handleVideoUpload(e) {
      this.video = e.target.files[0];
    },
    async save() {
      const formData = new FormData();
      if (this.video) {
        formData.append('video', this.video);
      }
      formData.append('expert_id', this.expertId);
      Object.keys(this.form).forEach(key => formData.append(key, this.form[key]));
      formData.append('collection_id', this.form.collectionId);

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
      this.$refs.inputVideo.reset();
    }
  }
}
</script>
