<template>
  <div :class="{ 'theme-helper': true, 'theme-helper-opened': opened }">
    <section class="widget theme-helper-content">
      <header class="theme-helper-header d-flex p-0">
        <div class="theme-helper-toggler" @click="toggle">
          <div class="theme-helper-spinner text-white">
            <i class="la la-cog"></i>
            <i class="la la-cog"></i>
          </div>
        </div>
        <h6>Configuration</h6>
      </header>
      <div class="widget-body mt-3">
        <div class="mt-4">
          <NavLink
            v-if="!authExpert.available"
            @click="toggleExpertStatus"
            target="_blank"
            role="button"
            class="btn btn-warning btn-rounded-f btn-block fs-mini text-white">
            Set Online
          </NavLink>
          <NavLink
            v-if="authExpert.available"
            @click="toggleExpertStatus"
            target="_blank"
            role="button"
            class="btn btn-success btn-rounded-f btn-block fs-mini text-white">
            Set Offline
          </NavLink>

        </div>
      </div>
    </section>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import {SetApiError} from "../../api/errors";

export default {
  name: 'Helper',
  data() {
    return {
      opened: false,
    }
  },
  computed: {
    ...mapGetters({
      authExpert: 'auth/getAuthExpert',
    }),
  },
  methods: {
    ...mapActions({
      toggleStatus: 'experts/toggleStatus',
      onSuccess: 'alert/onSuccess',
    }),
    toggle() {
      this.opened = !this.opened;
    },
    async toggleExpertStatus() {
      try {
        const expert = await this.toggleStatus(this.authExpert.id);
        let status = 'offline';
        if (expert.available) {
          status = 'online';
        }
        this.onSuccess(`Success! Your status is ${status}`);
      } catch (err) {
        SetApiError(err);
      }
    }
  }
};
</script>

<style src="./Helper.scss" lang="scss" scoped/>
