<template>
  <div>
    <Widget customHeader>
      <b-row class="flex-fill">
        <b-col md="7">
          <h5>Expert Services</h5>
        </b-col>
        <b-modal v-model="modalShow" title="" hide-footer>

        </b-modal>
        <b-col md="5" class="text-right">
          <b-button type="submit" variant="default" size="sm">
              <span class="auth-btn-circle">
                <i class="la la-plus"></i>
              </span>
            Add new
          </b-button>
        </b-col>
      </b-row>
      <form class="mt">
        <b-form-group label="Title" label-for="title">
          <b-input-group>
            <input id="title"
                   class="form-control input-transparent pl-3"
                   type="text"
                   required
                   placeholder="Title"/>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Description" label-for="description">
          <b-input-group>
            <textarea id="description"
                      rows="5"
                      class="form-control input-transparent pl-3"
                      required
                      placeholder="Description">
            </textarea>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Price" label-for="price">
          <b-input-group>
            <input id="price"
                   class="form-control input-transparent pl-3"
                   type="number"
                   required
                   placeholder="Price"/>
          </b-input-group>
        </b-form-group>

        <b-form-group label="Image" label-for="image">
          <b-row>
            <b-col class="flex-center" md="9">
              <b-form-file id="inputIcon" size="sm" ref="fileInput"></b-form-file>
            </b-col>
            <b-col md="3">
              <!--              <img class="rounded-circle" :src="`${$store.state.layout.processEnv.VUE_APP_BACK_END_URL}/${category.icon}`" width="100px" height="100"-->
              <!--                   v-if="category.icon"/>-->
              <img class="rounded-circle" src="https://hope.be/wp-content/uploads/2015/05/no-user-image.gif"
                   alt="" height="100"/>
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

import Widget from "../../../components/Widget/Widget";

export default {
  name: "ServicesExpert",
  components: {Widget},
  data() {
    return {
      modalShow: false,
    };
  },

}
</script>

<style scoped>

</style>