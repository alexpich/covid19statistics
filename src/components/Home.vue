<template>
  <div class="container">
    <h1 class="mt-4">Total Cases Worldwide</h1>
    <Statistics />
  </div>
</template>

<script>
import Statistics from "./Statistics";
export default {
  components: {
    'Statistics': Statistics
  }
};
</script>

<style>
  body {
    background: rgb(104, 160, 185);
  }
</style>