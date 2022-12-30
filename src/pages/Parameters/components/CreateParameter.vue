<template>
  <div>
    <Widget customHeader>
      <h5>Add new Parameter</h5>
      <form class="mt" @submit.prevent="saveParameter">
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
        <div class="form-widget-footer">
          <b-button block type="submit" variant="success" size="md">
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
  name: "CreateParameter",
  components: {Widget},
  data() {
    return {
      form: {
        name: null,
      },
    }
  },
  methods: {
    ...mapActions({
      addParameter: 'parameters/saveParameter',
      onSuccess: 'alert/onSuccess',
    }),
    async saveParameter() {
      try {
        await this.addParameter(this.form);
        this.onSuccess('Parameter has been created successfully\n');
        this.form.name = null;
      } catch (err) {
        SetApiError(err);
      }
    },
  }
}
</script>