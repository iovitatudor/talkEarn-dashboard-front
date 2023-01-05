<template>
  <b-collapse class="sidebar-collapse" id="sidebar-collapse" :visible="sidebarOpened">
  <nav
    :class="{sidebar: true}"
  >
    <header class="logo">
      <router-link to="/dashboard">
        <img src="https://talkearn.app/landing/logo.svg" alt="">
      </router-link>
    </header>
<!--    <a class="generator-link navTitle" target="_blank" href="https://flatlogic.com/generator">Generate App</a>-->
    <ul class="nav">
<!--      <h5 class="navTitle">APP</h5>-->
      <NavLink
        :activeItem="activeItem"
        header="Dashboard"
        link="/dashboard"
        iconName="flaticon-home-3"
        index="dashboard"
        isHeader
      />
      <h5 class="navTitle">App</h5>
      <NavLink
        header="Experts"
        link="/dashboard/experts"
        iconName="flaticon-users"
        index="experts"
        isHeader
      />
      <NavLink
        header="Categories"
        link="/dashboard/categories"
        iconName="flaticon-equal-3"
        index="experts"
        isHeader
      />
      <NavLink
        header="Parameters"
        link="/dashboard/parameters"
        iconName="flaticon-network-1"
        index="experts"
        isHeader
      />
<!--      <h5 class="navTitle">Templates</h5>-->
<!--      <NavLink-->
<!--        header="Tables Basic"-->
<!--        link="/dashboard/tables"-->
<!--        iconName="flaticon-equal-3"-->
<!--        index="tables"-->
<!--        isHeader-->
<!--      />-->
<!--      <NavLink-->
<!--        header="Notifications"-->
<!--        link="/dashboard/notifications"-->
<!--        iconName="flaticon-bell"-->
<!--        index="notifications"-->
<!--        isHeader-->
<!--      />-->
<!--      <NavLink-->
<!--        :activeItem="activeItem"-->
<!--        header="Components"-->
<!--        link="/dashboard/components"-->
<!--        iconName="flaticon-network-1"-->
<!--        index="components"-->
<!--        :childrenLinks="[-->
<!--          { header: 'Charts', link: '/dashboard/components/charts' },-->
<!--          { header: 'Icons', link: '/dashboard/components/icons' },-->
<!--          { header: 'Maps', link: '/dashboard/components/maps' },-->
<!--        ]"-->
<!--      />-->
    </ul>
<!--    <h5 class="navTitle d-sm-down-none">-->
<!--      LABELS-->
<!--    </h5>-->
<!--    <ul class="sidebarLabels d-sm-down-none">-->
<!--      <li>-->
<!--        <a href="#">-->
<!--          <i class="fa fa-circle text-success mr-3" />-->
<!--          <span class="labelName">Core</span>-->
<!--        </a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a href="#">-->
<!--          <i class="fa fa-circle text-primary mr-3" />-->
<!--          <span class="labelName">UI Elements</span>-->
<!--        </a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a href="#">-->
<!--          <i class="fa fa-circle text-danger mr-3" />-->
<!--          <span class="labelName">Forms</span>-->
<!--        </a>-->
<!--      </li>-->
<!--    </ul>-->

    <h5 class="navTitle d-sm-down-none mb-3">
      INFO
    </h5>
    <div class="sidebarAlerts d-sm-down-none">
      <b-alert
        v-for="alert in alerts"
        :key="alert.id"
        class="sidebarAlert" variant="transparent"
        show dismissible
      >
        <span>{{alert.title}}</span><br />
        <b-progress class="sidebarProgress progress-xs mt-1"
          :variant="alert.color" :value="alert.value" :max="100" />
        <span>{{alert.footer}}</span>
      </b-alert>
    </div>
  </nav>
  </b-collapse>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NavLink from './NavLink/NavLink';

export default {
  name: 'Sidebar',
  components: { NavLink },
  data() {
    return {
      alerts: [
        {
          id: 0,
          title: 'Sales Report',
          value: 15,
          footer: 'Calculating x-axis bias... 65%',
          color: 'primary',
        },
        {
          id: 1,
          title: 'Personal Responsibility',
          value: 20,
          footer: 'Provide required notes',
          color: 'danger',
        },
      ],
    };
  },
  methods: {
    ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split('/');
      paths.pop();
      this.changeSidebarActive(paths.join('/'));
    },
  },
  created() {
    this.setActiveByRoute();
  },
  computed: {
    ...mapState('layout', {
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
    }),
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
