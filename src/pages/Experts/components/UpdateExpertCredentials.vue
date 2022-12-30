<template>
  <div>
    <Widget customHeader v-if="expert">
      <b-row class="flex-fill">
        <b-col md="12">
          <h5>Expert Credentials</h5>
        </b-col>
      </b-row>
      <form class="mt" @submit.prevent="saveForm">
        <b-form-group label="Email" label-for="email">
          <b-input-group>
            <input id="email"
                   v-model="form.email=expert.email"
                   class="form-control input-transparent pl-3"
                   type="email"
                   required/>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Password" label-for="password">
          <b-input-group>
            <input id="password"
                   v-model="form.password"
                   class="form-control input-transparent pl-3"
                   type="password"
                   required/>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Password Again" label-for="password-again">
          <b-input-group>
            <input id="password-again"
                   v-model="form.passwordAgain"
                   class="form-control input-transparent pl-3"
                   type="password"
                   required/>
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
import Widget from "../../../components/Widget/Widget";
import {SetApiError} from "../../../api/errors";

export default {
  name: "UpdateExpertCredentials",
  components: {Widget},
  props: {
    expert: {type: Object},
  },
  data() {
    return {
      form: {
        email: null,
        password: null,
        passwordAgain: null,
      },
    };
  },
  methods: {
    ...mapActions({
      editExpert: 'experts/editExpert',
      onSuccess: 'alert/onSuccess',
    }),
    async saveForm() {
      if (this.form.password !== this.form.passwordAgain){
        SetApiError('Passwords do not match');
        return;
      }
      try {
        const formData = new FormData();
        formData.append('name', this.expert.name);
        Object.keys(this.form).forEach(key => formData.append(key, this.form[key]));
        const res = await this.editExpert({id: this.expert.id, data: formData});
        this.form.password = null;
        this.form.passwordAgain = null;
        this.$emit('reloadComponent', res.data);
        this.onSuccess('Expert credentials has been edited successfully');
      } catch (err) {
        SetApiError(err);
      }
    }
  },
}
</script>
