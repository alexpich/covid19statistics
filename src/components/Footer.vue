<template>
  <footer class="footer mt-4">
    <div class="container">
      <h3 class="text-center">Useful Information</h3>
      <ul class="text-center useful-info">
        <li>
          <a href="https://www.cdc.gov/coronavirus/2019-ncov/index.html">CDC</a>
        </li>
        <li>
          <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019">WHO</a>
        </li>
      </ul>
    </div>
    <hr />
    <div class="container">
      <p class="text-center">
        Data pulled from
        <a href="https://rapidapi.com/astsiatsko/api/coronavirus-monitor">API</a>
      </p>
      <p class="text-center">
        Created by
        <a href="https://alexpich.com">Alex Pich</a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style>
.footer {
  background: #b6e0fe;
  padding: 5rem;
}

.footer .useful-info {
  list-style: none;
  margin: 0;
  padding: 0;

}

</style>