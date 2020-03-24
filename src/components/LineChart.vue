<script>
import { Line } from "vue-chartjs";

export default {
  name: "LineChart",
  extends: Line,
  props: ["data", "options"],
  mounted() {
    console.log(this.data);
    console.log(this.options);
    this.renderChart(this.data, this.options);
  }
};
</script>

<style>
</style>


