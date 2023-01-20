<template>
  <form class="mt" @submit.prevent="save" v-if="service">
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
    <div v-if="service.video">
      <video :src="service.video" width="100%" controls></video>
    </div>
    <b-row>
      <b-col>
        <b-form-group label="Video" label-for="video">
          <b-form-file :id="`inputImage${service.id}`" size="sm" ref="fileInput"
                       @change="handleVideoUpload"></b-form-file>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Hash" label-for="hash">
          <b-input-group>
            <input id="hash"
                   v-model="form.hash=service.hash"
                   class="form-control input-transparent pl-3"
                   type="text"
                   required/>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
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
  computed: {
    ...mapGetters({
      collections: 'collection/getCollections',
    }),
  },
  data() {
    return {
      form: {
        collectionId: null,
        name: null,
        price: null,
        description: null,
        hash: null,
      },
      video: null,
    }
  },
  mounted() {
    this.form.collectionId = this.service.collectionId;
  },
  methods: {
    ...mapActions({
      editService: 'services/editService',
      destroyService: 'services/destroyService',
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