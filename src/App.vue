<template>
  <div id="app">
    <app-header />
    <div class="container">
      <div class="col-xs-12">
        <router-view />
      </div>
    </div>
    <appFooter />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  components: {
    appHeader: Header,
    appFooter: Footer
  }
};
</script>

<style>
</style>
