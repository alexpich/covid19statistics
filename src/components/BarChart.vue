<template>
  <div>
    <h2>BarChart Component</h2>
    <div
      v-for="(item) in info"
      class="item"
      :key="item.id"
    >{{item.province}} -> Confirmed: {{ item.confirmed}} -> Deaths: {{item.deaths}}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BarChart",
  data() {
    return {
      info: null,
      apiKey: process.env.VUE_APP_API_KEY
    };
  },
  mounted() {
    axios({
      method: "GET",
      url: "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
        "x-rapidapi-key": this.apiKey
      },
      params: {
        country: "US"
      }
    })
      .then(response => (this.info = response.data.data.covid19Stats))
      .catch(error => {
        console.log(error);
      });
  }
};
</script>