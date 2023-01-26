<template>
  <div class="auth-page">
    <b-container>
      <Widget class="widget-auth mx-auto" title="<h3 class='mt-0'>Register to TalkEarn</h3>" customHeader>
        <form class="mt" @submit.prevent="register">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{ errorMessage }}
          </b-alert>
          <b-form-group label="Project Name" label-for="project-name">
            <b-input-group>
              <b-form-input id="project-name"
                            ref="projectName"
                            v-model="form.name"
                            class="form-control input-transparent pl-3"
                            type="text"
                            required
                            placeholder="Project Name"/>
            </b-input-group>
          </b-form-group>
          <b-form-group label="Project URL" label-for="project-url">
            <b-input-group>
              <input id="project-url"
                     ref="projectUrl"
                     v-model="form.url"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder="Project URL"/>
            </b-input-group>
          </b-form-group>
          <b-form-group label="Name" label-for="name">
            <b-input-group>
              <input id="name"
                     ref="name"
                     v-model="form.administrator.name"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder="Name"/>
            </b-input-group>
          </b-form-group>
          <b-form-group label="Email" label-for="email">
            <b-input-group>
              <input id="email"
                     ref="email"
                     v-model="form.administrator.email"
                     class="form-control input-transparent pl-3"
                     type="email"
                     required
                     placeholder="Email"/>
            </b-input-group>
          </b-form-group>
          <b-form-group label="Password" label-for="password">
            <b-input-group>
              <input id="password"
                     ref="password"
                     v-model="form.administrator.password"
                     class="form-control input-transparent pl-3"
                     type="password"
                     required
                     placeholder="Password"/>
            </b-input-group>
          </b-form-group>
          <b-form-group label="Password Again" label-for="password-again">
            <b-input-group>
              <input id="password-again"
                     ref="password"
                     v-model="form.administrator.passwordAgain"
                     class="form-control input-transparent pl-3"
                     type="password"
                     required
                     placeholder="Password Again"/>
            </b-input-group>
          </b-form-group>
          <div class="bg-widget auth-widget-footer">
            <b-button type="submit" variant="success" class="auth-btn" size="sm">
              <span class="auth-btn-circle">
                <i class="la la-caret-right"></i>
              </span>
              Register
            </b-button>
            <p class="widget-auth-info mt-4">
              You already have an account ? Sign in now!
            </p>
            <router-link class="d-block text-center mb-4" to="login">Login</router-link>
          </div>
        </form>
        <Loader v-if="loading"/>
      </Widget>
    </b-container>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import {mapGetters, mapActions} from 'vuex';
import Loader from "../../components/Loader/Loader";
import {SetApiError} from "../../api/errors";

export default {
  name: 'Register',
  components: {Widget, Loader},
  data() {
    return {
      loading: false,
      errorMessage: null,
      form: {
        name: null,
        url: null,
        mode: 'Development',
        administrator: {
          name: null,
          email: null,
          password: null,
          passwordAgain: null,
        },
      }
    };
  },
  computed: {
    ...mapGetters({
      token: 'auth/getToken',
    }),
  },
  methods: {
    ...mapActions({
      onRegister: 'auth/onRegister',
      onSuccess: 'alert/onSuccess',
    }),
    register() {
      this.loading = true;
      if (this.form.administrator.password !== this.form.administrator.passwordAgain) {
        SetApiError('Passwords do not match.');
        this.loading = false;
        return;
      }

      this.onRegister(this.form).then(() => {
        this.loading = true;
        this.onSuccess('You have successfully created the account!');
        setTimeout(() => {
          this.$router.push('/dashboard');
        }, 1000);
      }).catch((err) => {
        SetApiError(err);
        this.loading = false;
      });
    },
  },
};
</script>
