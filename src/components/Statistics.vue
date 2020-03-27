<template>
  <div class="statistics">
    <p>Last updated: {{ formatDate(statisticsLastUpdated) }}</p>
    <template>
      <div class="container chart-container">
        <BarChart v-if="loaded" :chart-data="casesChart" />
      </div>
    </template>
  </div>
</template>

<script>
import BarChart from "./BarChart.vue";
import dayjs from "dayjs";

export default {
  name: "Statistics",
  components: {
    BarChart
  },
  data() {
    return {
      loaded: false,
      totalCases: 0,
      totalDeaths: 0,
      totalRecovered: 0,
      statisticsLastUpdated: "",
      apiKey: process.env.VUE_APP_API_KEY
    };
  },

  async mounted() {
    this.loaded = false;

    fetch(
      "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
          "x-rapidapi-key": this.apiKey
        }
      }
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.totalCases = parseInt(data.total_cases.replace(/,/g, "")) + "";
        this.totalDeaths = parseInt(data.total_deaths.replace(/,/g, "")) + "";
        this.totalRecovered =
          parseInt(data.total_recovered.replace(/,/g, "")) + "";
        this.statisticsLastUpdated = data.statistic_taken_at;

        this.loaded = true;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    formatDate(date) {
      return dayjs(date)
        .toDate()
        .toLocaleDateString("en-US", { timezone: "America/Los_Angeles " });
    }
  },

  computed: {
    casesChart() {
      return {
        labels: ["Total Cases"],
        datasets: [
          {
            label: "Confirmed",
            backgroundColor: "rgba(52,152,221)",
            data: [this.totalCases]
          },
          {
            label: "Recovered",
            backgroundColor: "rgba(46,204,119)",
            data: [this.totalRecovered]
          },
          {
            label: "Deaths",
            backgroundColor: "rgb(255,154,89)",
            data: [this.totalDeaths]
          }
        ]
      };
    }
  }
};
</script>

<style>
.chart-container {
  max-height: 600px;
}
</style>