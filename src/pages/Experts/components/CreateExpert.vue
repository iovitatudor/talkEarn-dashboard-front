<template>
  <div>
    <Widget customHeader>
      <form class="mt" @submit.prevent="saveForm">
        <b-form-group label="Category" label-for="category">
          <b-input-group>
            <select id="category"
                    v-model="form.categoryId"
                    class="form-control input-transparent pl-3"
                    required>
              <option :value="category.id"
                      :key="key"
                      v-for="(category, key) in categories">
                {{ category.name }}
              </option>
            </select>
          </b-input-group>
        </b-form-group>
        <b-row>
          <b-col>
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
          </b-col>
          <b-col>
            <b-form-group label="Email" label-for="email">
              <b-input-group>
                <input id="email"
                       v-model="form.email"
                       class="form-control input-transparent pl-3"
                       type="email"
                       required
                       placeholder="Email"/>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="Password" label-for="password">
              <b-input-group>
                <input id="password"
                       v-model="form.password"
                       class="form-control input-transparent pl-3"
                       type="password"
                       required
                       placeholder="Password"/>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Password Again" label-for="password-again">
              <b-input-group>
                <input id="password-again"
                       v-model="form.passwordAgain"
                       class="form-control input-transparent pl-3"
                       type="password"
                       required
                       placeholder="Password Again"/>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="Profession" label-for="profession">
              <b-input-group>
                <input id="profession"
                       v-model="form.profession"
                       class="form-control input-transparent pl-3"
                       type="text"
                       required
                       placeholder="Profession"/>
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
        <b-form-group label="Video" label-for="video">
          <b-input-group>
            <input id="video"
                   v-model="form.video"
                   class="form-control input-transparent pl-3"
                   type="text"
                   required/>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Avatar" label-for="avatar">
          <b-row>
            <b-col class="flex-center" md="8">
              <b-form-file id="file-small" size="sm" ref="fileInput" @change="handleIconUpload"></b-form-file>
            </b-col>
            <b-col class="flex-center" md="4">
              <input class="styled-checkbox"
                     v-model="form.active"
                     id="styled-checkbox-1"
                     type="checkbox">
              <label for="styled-checkbox-1">Active</label>
            </b-col>
          </b-row>
        </b-form-group>
        <div class="form-widget-footer text-center">
          <b-row>
            <b-col>
              <b-button type="submit" variant="success" size="md" block @click="setAfterSaveAction('edit')">
                          <span class="auth-btn-circle">
                            <i class="la la-save"></i>
                          </span>
                Save & Edit
              </b-button>
            </b-col>
            <b-col>
              <b-button type="submit" variant="success" size="md" block @click="setAfterSaveAction('close')">
                          <span class="auth-btn-circle">
                            <i class="la la-save"></i>
                          </span>
                Save & Close
              </b-button>
            </b-col>
          </b-row>
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
  name: "CreateExpert",
  components: {Widget},
  data() {
    return {
      form: {
        categoryId: null,
        name: null,
        email: null,
        password: null,
        passwordAgain: null,
        profession: null,
        price: null,
        video: null,
        active: true,
      },
      avatar: null,
      afterSave: 'close',
    };
  },
  computed: {
    ...mapGetters({
      categories: 'categories/getCategories',
      lastCreatedExpert: 'experts/getLastCreatedExpert',
    }),
  },
  mounted() {
    if (this.categories.length) {
      this.form.categoryId = this.categories[0].id;
    }
  },
  methods: {
    ...mapActions({
      saveExpert: 'experts/saveExpert',
      onSuccess: 'alert/onSuccess',
    }),
    handleIconUpload(e) {
      this.avatar = e.target.files[0];
    },
    async saveForm() {
      if (this.form.password !== this.form.passwordAgain) {
        SetApiError('Passwords do not match.');
        return;
      }

      const formData = new FormData();
      if (this.avatar) {
        formData.append('avatar', this.avatar);
      }
      Object.keys(this.form).forEach(key => formData.append(key, this.form[key]));
      formData.append('category_id', this.form.categoryId);

      try {
        const currentExpert = await this.saveExpert(formData);
        this.onSuccess('Expert has been created successfully');
        this.resetForm();
        if (this.afterSave === 'close') {
          this.$emit("closeModal");
        } else {
          await this.$router.push(`/dashboard/experts/edit/${currentExpert.id}`);
        }
      } catch (err) {
        SetApiError(err);
      }
    },
    setAfterSaveAction(action) {
      this.afterSave = action;
    },
    resetForm() {
      this.categoryId = null;
      this.name = null;
      this.email = null;
      this.password = null;
      this.passwordAgain = null;
      this.profession = null;
      this.price = null;
      this.active = true;
    }
  }
}
</script>