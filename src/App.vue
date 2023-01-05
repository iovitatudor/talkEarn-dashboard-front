<template>
  <div>
    <router-view/>
    <Alert/>
    <AppCall/>
  </div>
</template>

<script>
import Alert from "./components/Alert/Alert";
import AppCall from "./components/Calls/AppCall";

export default {
  name: 'App',
  components: {Alert, AppCall},
};
</script>

<style src="./styles/theme.scss" lang="scss"/>
