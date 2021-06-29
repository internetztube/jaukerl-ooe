<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    data: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    }
  },
  mounted () {
    console.log(this.data)
    console.log(this.options)
    this.renderChart(this.data, this.options)
  }
}
</script>