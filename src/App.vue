<template>
  <div>
    <router-view />
    <Alert/>
  </div>
</template>

<script>
import Alert from "./components/Alert/Alert";

export default {
  name: 'App',
  components: {Alert},
  created() {
    // const currentPath = this.$router.history.current.path;
    //
    // if (window.localStorage.getItem('authenticated') === 'false') {
    //   this.$router.push('/login');
    // }
    //
    // if (currentPath === '/' || currentPath === '/app') {
    //   this.$router.push('/app/dashboard');
    // }
  },
};
</script>

<style src="./styles/theme.scss" lang="scss" />
