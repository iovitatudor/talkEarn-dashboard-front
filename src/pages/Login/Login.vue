<template>
  <div class="auth-page">
    <b-container>
      <Widget class="widget-auth mx-auto" title="<h3 class='mt-0'>Login to TalkEarn</h3>" customHeader>
        <form class="mt" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{ errorMessage }}
          </b-alert>
          <b-form-group label="Email" label-for="email">
            <b-input-group>
              <input id="email"
                     ref="email"
                     v-model="form.email"
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
                     v-model="form.password"
                     class="form-control input-transparent pl-3"
                     type="password"
                     required
                     placeholder="Password"/>
            </b-input-group>
          </b-form-group>
          <div class="bg-widget auth-widget-footer">
            <b-button type="submit" variant="success" class="auth-btn" size="sm">
              <span class="auth-btn-circle">
                <i class="la la-caret-right"></i>
              </span>
              Login
            </b-button>
            <p class="widget-auth-info mt-4">
              Don't have an account? Sign up now!
            </p>
            <router-link class="d-block text-center mb-4" to="register">Create an Account</router-link>
          </div>
        </form>
        <Loader v-if="loading"/>
      </Widget>
    </b-container>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import {mapActions} from "vuex";
import {SetApiError} from "../../api/errors";
import Loader from "../../components/Loader/Loader";

export default {
  name: 'LoginPage',
  components: {Widget, Loader},
  data() {
    return {
      loading: false,
      errorMessage: null,
      form: {
        email: null,
        password: null,
      }
    };
  },
  methods: {
    ...mapActions({
      onLogin: 'auth/onLogin',
      onSuccess: 'alert/onSuccess'
    }),
    login() {
      this.loading = true;
      this.onLogin(this.form).then((res) => {
        this.loading = true;
        this.onSuccess('You have successfully logged in!');
        setTimeout(() => {
          // this.$router.push('/dashboard');
          window.location.href = "/dashboard";
        }, 1000);
      }).catch((err) => {
        SetApiError(err);
        this.loading = false;
      });
    },
  },
  created() {
    if (window.localStorage.getItem('authenticated') === 'true') {
      this.$router.push('/app/dashboard');
      window.location.href = "/dashboard";
    }
  },
};
</script>
