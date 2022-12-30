<template>
  <div>
    <Widget customHeader>
      <b-row class="flex-fill">
        <b-col md="12">
          <h5>Expert Parameters</h5>
        </b-col>
      </b-row>
      <form class="mt">
        <b-form-group :label="parameter.name" :label-for="`${parameter.name}-input`" v-for="(parameter, key) in parameters" :key="key">
          <b-input-group>
            <input :id="`${parameter.name}-input`"
                   class="form-control input-transparent pl-3"
                   type="text"
                   required
                   :placeholder="parameter.name"/>
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

export default {
  name: "ParametersExpert",
  components: {Widget},
  computed: {
    ...mapGetters({
      parameters: 'parameters/getParameters',
    }),
  },
  mounted() {
    this.getParameters();
  },
  methods: {
    ...mapActions({
      getParameters: 'parameters/getParameters',
    })
  }
}
</script>