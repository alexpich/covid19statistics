<template>
  <div class="statistics">
    <p>Last updated: {{lastUpdated}}</p>
    <template>
      <LineChart v-if="loaded" :data="totalUsBarChart" />
    </template>
    <!-- <BarChart v-if="loaded" :data="totalUsBarChart" :options="options" /> -->
  </div>
</template>

<script>
// import BarChart from "./BarChart.vue";
import LineChart from "./LineChart.vue";
import dayjs from "dayjs";

export default {
  name: "Statistics",
  components: {
    // BarChart,
    LineChart
  },
  data() {
    return {
      loaded: false,
      info: null,
      covidInfo: null,
      apiKey: process.env.VUE_APP_API_KEY
    };
  },
  async mounted() {
    this.loaded = false;
    fetch(
      "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=us",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
          "x-rapidapi-key": this.apiKey
        }
      }
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.info = data.data;
        this.covidInfo = data.data.covid19Stats;
        this.loaded = true;
      })
      .catch(error => {
        console.log(error);
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
    confirmed() {
      return this.covidInfo.map(item => {
        return item.confirmed;
      });
    },

    recovered() {
      return this.covidInfo.map(item => {
        return item.recovered;
      });
    },

    deaths() {
      return this.covidInfo.map(item => {
        return item.deaths;
      });
    },

    // Subtract recovered and deaths from confirmed
    infected() {
      return this.covidInfo.map(item => {
        return item.deaths;
      });
    },

    dates() {
      return this.covidInfo.map(item => {
        return this.formatDate(item.lastUpdate);
      });
    },

    lastUpdated() {
      if (this.info) {
        return this.formatDate(this.info.lastChecked);
      }
      return "";
    },

    provinces() {
      return this.covidInfo.map(item => {
        return item.province;
      });
    },

    totalUsConfirmedChart() {
      return {
        labels: this.provinces,
        datasets: [
          {
            label: "Confirmed",
            borderColor: "rgb(52,152,221)",
            backgroundColor: "rgba(52,152,221, 0.3)",
            data: this.confirmed
          }
        ]
      };
    },

    totalUsRecoveredChart() {
      return {
        labels: this.provinces,
        datasets: [
          {
            label: "Recovered",
            borderColor: "rgb(46,204,119)",
            backgroundColor: "rgba(46,204,119, 0.3)",
            data: this.recovered
          }
        ]
      };
    },

    totalUsDeathChart() {
      return {
        labels: this.provinces,
        datasets: [
          {
            label: "Deaths",
            borderColor: "rgb(231,76,51)",
            backgroundColor: "rgba(255,76,51, 0.3)",
            data: this.deaths
          }
        ]
      };
    },

    totalUsBarChart() {
      return {
        labels: this.provinces,
        datasets: [
          {
            label: "Confirmed",
            borderColor: "rgb(52,152,221)",
            backgroundColor: "rgba(52,152,221, 0.3)",

            data: this.confirmed
          },
          {
            label: "Recovered",
            borderColor: "rgb(46,204,119)",
            backgroundColor: "rgba(46,204,119, 0.3)",
            data: this.recovered
          },
          {
            label: "Deaths",
            borderColor: "rgb(231,76,51)",
            backgroundColor: "rgba(231,76,51, 0.3)",
            data: this.deaths
          }
        ]
      };
    }
  }
};
</script>

<style>
</style>