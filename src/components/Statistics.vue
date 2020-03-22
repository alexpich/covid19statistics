

<template>
  <div class="statistics">
    <p>Last updated: {{lastChecked}}</p>
    <LineChart v-if="loaded" :data="totalUsBarChart" :options="options" />
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

  options() {
    return {
      animation: {
        duration: this.animationSpeed
      },
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        onClick: (event, legend) => {
          const legends = { ...this.legends };

          switch (legend.text) {
            case "Confirmed":
              legends.confirmed = !legends.confirmed;
              break;
            case "Recovered":
              legends.recovered = !legends.recovered;
              break;
            case "Deaths":
              legends.deaths = !legends.deaths;
              break;
            case "Infected":
              legends.infected = !legends.infected;
              break;
            default:
              break;
          }

          this.legends = legends;
          return false;
        },
        // scales: {
        //   yAxes: [
        //     {
        //       ticks: {
        //         beginAtZero: true
        //       }
        //     }
        //   ]
        // },
        scales: {
          yAxes: [
            {
              type: this.scale,
              ticks: {
                precision: 0,
                fontColor: "#bdc3c7"
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                fontColor: "#bdc3c7"
              }
            }
          ]
        },
        labels: {
          fontColor: "#bdc3c7"
        },
        position: "bottom"
      }
    };
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

    lastChecked() {
        return this.formatDate(this.info.lastChecked);
    },

    provinces() {
      return this.covidInfo.map(item => {
        return item.province;
      });
    },

    totalUsConfirmedChart() {
      return {
        // labels: this.dates,
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
        // labels: this.dates,
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

    totalUsInfectedChart() {
      return {
        // labels: this.dates,
        labels: this.provinces,
        datasets: [
          {
            label: "Infected",
            borderColor: "rgb(155,89,187)",
            backgroundColor: "rgba(155,89,187, 0.3)",
            data: this.trend
          }
        ]
      };
    },

    totalUsDeathChart() {
      return {
        // labels: this.dates,
        labels: this.provinces,
        datasets: [
          {
            label: "Deaths",
            borderColor: "rgb(231,76,51)",
            backgroundColor: "rgba(231,76,51, 0.3)",
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
            label: "Infected",
            borderColor: "rgb(155,89,187)",
            backgroundColor: "rgba(155,89,187, 0.3)",
            data: this.trend
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