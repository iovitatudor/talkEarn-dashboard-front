<template>
  <b-navbar toggleable="md" class="app-header d-print-none">
    <b-navbar-nav class="navbar-nav-mobile ml-auto">
      <b-nav-form class="d-sm-down-none mr-3">
        <b-input-group class="input-group-transparent search-group">
          <b-input-group-text slot="prepend"><i class="fi flaticon-search-2"></i></b-input-group-text>
          <b-input class="input-transparent" id="search-input" placeholder="Search Dashboard"/>
        </b-input-group>
      </b-nav-form>
      <li class="nav-item">
        <language-switcher/>
      </li>
      <b-nav-item-dropdown right class="avatar-toggle" menu-class="py-0">
        <template slot="button-content">
            <span class="avatar rounded-circle thumb-sm-1 float-left mr-2">
              <img class="rounded-circle"
                   v-if="authExpert.avatar"
                   :src="`${authExpert.avatar}`"
                   alt="..."/>
              <img class="rounded-circle"
                   v-else
                   src="https://hope.be/wp-content/uploads/2015/05/no-user-image.gif"
                   alt="..."/>
              <span class="user-status online-status" v-if="authExpert.available"></span>
              <span class="user-status offline-status" v-else></span>
            </span>
          <span class="text-white">{{ authExpert.name }}</span>
          <i class="fi flaticon-arrow-down"/>
        </template>
        <b-dropdown-item :to="`/dashboard/experts/edit/${authExpert.id}`"><i class="la la-user"/> My Account
        </b-dropdown-item>
        <b-dropdown-divider/>
        <b-dropdown-item>
          Calendar &nbsp;&nbsp;<b-badge variant="danger" pill class="animate__animated animate__bounceIn">9</b-badge>
        </b-dropdown-item>
        <b-dropdown-divider/>
        <b-dropdown-item-button @click="logout">
          <i class="la la-sign-out"/> Log Out
        </b-dropdown-item-button>
      </b-nav-item-dropdown>
      <b-nav-item class="divider d-md-down-none"></b-nav-item>
      <b-nav-item-dropdown no-caret right class="mr-2" menu-class="dropdown-menu-settings">
        <template slot="button-content">
          <i class="fi flaticon-bell px-2"/>
        </template>
        <notifications/>
      </b-nav-item-dropdown>
      <b-nav-item class="d-md-down-none" @click="logout">
        <i class="fi flaticon-power-1 px-2"/>
      </b-nav-item>
      <b-nav-item class="d-md-none" @click="switchSidebarMethod">
        <i class="la la-navicon px-2"/>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex';
import Notifications from '@/components/Notifications/Notifications';
import LanguageSwitcher from './components/LanguageSwitcher';

export default {
  name: 'Header',
  components: {Notifications, LanguageSwitcher},
  data() {
    return {
      showNavbarAlert: true
    }
  },
  computed: {
    ...mapState('layout', {
      sidebarClose: state => state.sidebarClose,
      sidebarStatic: state => state.sidebarStatic,
    }),
    ...mapGetters({
      authExpert: 'auth/getAuthExpert',
    }),
  },
  methods: {
    ...mapActions({
      switchSidebar: 'layout/switchSidebar',
      changeSidebarActive: 'layout/changeSidebarActive',
      onLogout: 'auth/onLogout'
    }),
    switchSidebarMethod() {
      if (!this.sidebarClose) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      } else {
        this.switchSidebar(false);
        const paths = this.$route.fullPath.split('/');
        paths.pop();
        this.changeSidebarActive(paths.join('/'));
      }
    },
    logout() {
      this.onLogout();
      window.location.href = "/login";
      // this.$router.push('/login');
    },
  },
};
</script>

<style src="./Header.scss" lang="scss"/>
