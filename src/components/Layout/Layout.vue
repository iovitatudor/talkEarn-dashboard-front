<template>
  <div :class="{root: true, sidebarClose}">
    <Helper/>
    <Header/>
    <Sidebar/>
    <div ref="content" class="content animated fadeInUp" v-if="ready">
      <transition name="router-animation">
        <router-view/>
      </transition>
    </div>
    <footer class="contentFooter"></footer>
  </div>
</template>

<script>

import {mapState, mapActions} from 'vuex';
import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
import Helper from '@/components/Helper/Helper';
import './Layout.scss';
import {SetApiError} from "../../api/errors";

export default {
  name: 'Layout',
  components: {Sidebar, Header, Helper},
  data() {
    return {
      ready: false,
    };
  },
  created() {
    try {
      this.getLanguages().then(() => {
        this.fetchCategories();
        this.fetchCollections();
        this.fetchParameters();
        this.ready = true;
      });
    } catch (err) {
      SetApiError(err);
    }
  },
  methods: {
    ...mapActions({
      getLanguages: 'language/getLanguages',
      getCategories: 'categories/getCategories',
      getParameters: 'parameters/getParameters',
      getCollections: 'collection/getCollections',
      switchSidebar: 'layout/switchSidebar',
      changeSidebarActive: 'layout/changeSidebarActive',
    }),
    fetchCategories() {
      try {
        this.getCategories();
      } catch (err) {
        SetApiError(err);
      }
    },
    fetchCollections() {
      try {
        this.getCollections();
      } catch (err) {
        SetApiError(err);
      }
    },
    fetchParameters() {
      try {
        this.getParameters();
      } catch (err) {
        SetApiError(err);
      }
    },
  },
  computed: {
    ...mapState('layout', {
      sidebarClose: state => state.sidebarClose,
    }),
  },
};
</script>

<style src="./Layout.scss" lang="scss"/>
