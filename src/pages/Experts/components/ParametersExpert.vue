<template>
  <div>
    <Widget customHeader v-if="ready">
      <b-row class="flex-fill">
        <b-col md="12">
          <h5>Expert Parameters</h5>
        </b-col>
      </b-row>
      <form class="mt" @submit.prevent="save">
        <b-form-group :label="parameter.name" :label-for="`${parameter.name}-input`"
                      v-for="(parameter, key) in parameters" :key="key">
          <b-input-group>
            <input :id="`${parameter.name}-input`"
                   v-model="formParameters[parameter.id]"
                   class="form-control input-transparent pl-3"
                   type="text"/>
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

import {mapGetters, mapActions} from "vuex";
import Widget from "../../../components/Widget/Widget";
import {SetApiError} from "../../../api/errors";

export default {
  name: "ParametersExpert",
  props: {
    expertId: {type: Number},
  },
  components: {Widget},
  computed: {
    ...mapGetters({
      parameters: 'parameters/getParameters',
      authExpert: 'auth/getAuthExpert',
    }),
  },
  data() {
    return {
      ready: false,
      formParameters: [],
      existedParameters: [],
    };
  },
  async mounted() {
    await this.getParameters();
    await this.setDefaultParameterValue();
  },
  methods: {
    ...mapActions({
      getParameters: 'parameters/getParameters',
      saveBulkParameter: 'parameters/saveBulkParameter',
      getByExpert: 'parameters/getByExpert',
      onSuccess: 'alert/onSuccess',
    }),
    async setDefaultParameterValue() {
      try {
        const result = await this.getByExpert(this.expertId);
        this.existedParameters = result.data;
        this.parameters.map(parameter => {
          this.formParameters[parameter.id] = this.findExistedParameter(parameter.id);
        })
        this.ready = true;
      } catch (err) {
        SetApiError(err);
      }
    },
    async save() {
      let requestData = [];
      this.formParameters.map((parameter, key) => {
        requestData.push({id: key, value: parameter});
      });
      try {
        await this.saveBulkParameter({data: requestData, id: this.expertId});
        this.onSuccess('Parameter was successfully edited.');
      } catch (err) {
        SetApiError(err);
      }
    },
    findExistedParameter(id) {
      const parameter = this.existedParameters.find(parameter => parameter.parameterId === id);
      if (parameter) {
        return parameter.value;
      }
      return ''
    }
  }
}
</script>