<template>
  <div class="hero">
    <h1 class="text-center">COVID-19 Coronavirus Statistics</h1>
  </div>
</template>

<script>
export default {};
</script>

<style>
.hero {
  background: #dceefb;
  padding: 2rem 0.5rem;
}

.hero h1 {
  font-size: 1.4rem;
}

@media screen and (min-width: 576px) {
  .hero {
    padding: 2rem 2rem;
  }

  .hero h1 {
    font-size: 2rem;
  }
}

@media screen and (min-width: 768px) {
  .hero {
    padding: 3rem 2rem;
  }
}

@media screen and (min-width: 992px) {
  .hero {
    padding: 4rem 2rem;
  }

  .hero h1 {
    font-size: 3rem;
  }
}
</style>