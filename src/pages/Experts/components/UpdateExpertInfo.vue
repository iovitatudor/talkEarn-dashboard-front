<template>
  <div>
    <Widget customHeader v-if="expert">
      <h5>Expert Info</h5>
      <form class="mt" @submit.prevent="saveForm">
        <b-form-group label="Category" label-for="category">
          <b-input-group>
            <select id="category"
                    v-model="form.categoryId=expert.categoryId"
                    class="form-control input-transparent pl-3"
                    required>
              <option :value="category.id" v-for="category in categories">{{ category.name }}</option>
            </select>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Name" label-for="name">
          <b-input-group>
            <input id="name"
                   v-model="form.name=expert.name"
                   class="form-control input-transparent pl-3"
                   type="text"
                   required/>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Profession" label-for="profession">
          <b-input-group>
            <input id="profession"
                   v-model="form.profession=expert.profession"
                   class="form-control input-transparent pl-3"
                   type="text"
                   required/>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Price" label-for="price">
          <b-input-group>
            <input id="price"
                   v-model="form.price=expert.price"
                   class="form-control input-transparent pl-3"
                   type="number"
                   required/>
          </b-input-group>
        </b-form-group>

        <b-form-group label="Avatar" label-for="avatar">
          <b-row>
            <b-col class="flex-center" md="6">
              <b-form-file id="inputIcon" size="sm" ref="fileInput" @change="handleAvatarUpload"></b-form-file>
            </b-col>
            <b-col md="3">
              <img class="rounded-circle"
                   :src="`${$store.state.layout.processEnv.VUE_APP_BACK_END_URL}/${expert.avatar}`" width="100px"
                   height="100"
                   v-if="expert.avatar"/>
              <img class="rounded-circle" src="https://hope.be/wp-content/uploads/2015/05/no-user-image.gif"
                   alt="" height="100" v-else/>
            </b-col>
            <b-col class="flex-center" md="3">
              <input class="styled-checkbox" id="styled-checkbox-1" type="checkbox" value="value1" v-model="form.active=expert.active">
              <label for="styled-checkbox-1">Active</label>
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

import {mapGetters, mapActions} from "vuex";
import Widget from "../../../components/Widget/Widget";
import {SetApiError} from "../../../api/errors";

export default {
  name: "UpdateExpertInfo",
  components: {Widget},
  props: {
    expert: {type: Object},
  },
  data() {
    return {
      form: {
        categoryId: null,
        name: null,
        profession: null,
        price: null,
        active: true,
      },
      avatar: null,
    };
  },
  computed: {
    ...mapGetters({
      categories: 'categories/getCategories',
    }),
  },
  async mounted() {
    try {
      await this.getCategories();
      this.form.categoryId = this.expert.categoryId;
    } catch (err) {
      SetApiError(err);
    }
  },
  methods: {
    ...mapActions({
      getCategories: 'categories/getCategories',
      editExpert: 'experts/editExpert',
      onSuccess: 'alert/onSuccess',
    }),
    handleAvatarUpload(e) {
      this.avatar = e.target.files[0];
    },
    async saveForm() {
      try {
        const formData = new FormData();
        formData.append('avatar', this.avatar);
        formData.append('category_id', this.form.categoryId);
        formData.append('email', this.expert.email);
        Object.keys(this.form).forEach(key => formData.append(key, this.form[key]));
        const res = await this.editExpert({id: this.expert.id, data: formData});
        this.$emit('reloadComponent', res.data);
        this.$refs.fileInput.reset();
        this.onSuccess('Expert has been edited successfully');
      } catch (err) {
        SetApiError(err);
      }
    }
  },
}
</script>