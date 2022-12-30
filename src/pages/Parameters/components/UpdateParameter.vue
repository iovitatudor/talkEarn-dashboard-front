<template>
  <div>
    <Widget customHeader>
      <h5>Update Parameter</h5>
      <form class="mt" @submit.prevent="updateParameter" v-if="!loading">
        <b-form-group label="Name" label-for="name">
          <b-input-group>
            <input id="name"
                   v-model="form.name=parameter.name"
                   class="form-control input-transparent pl-3"
                   type="text"
                   required
                   placeholder="Name"/>
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

import {mapActions} from "vuex";
import {SetApiError} from "../../../api/errors";
import Widget from "../../../components/Widget/Widget";

export default {
  name: "UpdateParameter",
  components: {Widget},
  data() {
    return {
      loading: true,
      parameter: null,
      form: {
        name: null,
      },
    }
  },
  async mounted() {
    const id = this.$route.params.id
    try {
      const res = await this.getParameterById(id);
      this.parameter = res.data;
      this.loading = false;
    } catch (err) {
      SetApiError(err);
    }
  },
  methods: {
    ...mapActions({
      editParameter: 'parameters/editParameter',
      getParameterById: 'parameters/getParameterById',
      onSuccess: 'alert/onSuccess',
    }),
    async updateParameter() {
      try {
        const parameter = await this.editParameter({id: this.parameter.id, data: this.form});
        this.parameter = parameter.data;
        this.onSuccess('Parameter has been edited successfully.');
      } catch (err) {
        SetApiError(err);
      }
    },
  }
}
</script>