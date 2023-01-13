<template>
  <div>
    <Widget customHeader>
      <h5>Update Category</h5>
      <form class="mt" @submit.prevent="updateCategory" v-if="!loading">
        <b-form-group label="Name" label-for="name">
          <b-input-group>
            <input id="name"
                   v-model="form.name=category.name"
                   class="form-control input-transparent pl-3"
                   type="text"
                   required
                   placeholder="Name"/>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Description" label-for="description">
          <b-input-group>
                <textarea rows="8"
                          id="description"
                          v-model="form.description=category.description"
                          class="form-control input-transparent pl-3"
                          required
                          placeholder="Description">
                  </textarea>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Icon" label-for="icon">
          <b-row>
            <b-col class="flex-center" md="8">
              <b-form-file id="inputIcon" size="sm" ref="fileInput" @change="handleIconUpload"></b-form-file>
            </b-col>
            <b-col>
              <img class="rounded-circle" :src="`${category.icon}`" width="100px" height="100"
                   v-if="category.icon"/>
              <img class="rounded-circle" src="https://hope.be/wp-content/uploads/2015/05/no-user-image.gif"
                   alt="" height="100" v-else/>
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

import {mapActions} from "vuex";
import Widget from "../../../components/Widget/Widget";
import {SetApiError} from "../../../api/errors";

export default {
  name: "UpdateCategory",
  components: {Widget},
  data() {
    return {
      loading: true,
      category: null,
      form: {
        name: null,
        description: null,
      },
      icon: null,
    }
  },
  async mounted() {
    const id = this.$route.params.id
    try {
      const res = await this.getCategoryById(id);
      this.category = res.data;
      this.loading = false;
    } catch (err) {
      SetApiError(err);
    }
  },
  methods: {
    ...mapActions({
      editCategory: 'categories/editCategory',
      onSuccess: 'alert/onSuccess',
      getCategoryById: 'categories/getCategoryById',
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
      formData.append('description', this.form.description);

      try {
        const category = await this.editCategory({id: this.category.id, data: formData});
        this.category = category.data;
        this.$refs.fileInput.reset();
        this.onSuccess('Category has been edited successfully');
      } catch (err) {
        SetApiError(err);
      }
    },
  }
}
</script>

<style scoped>

</style>