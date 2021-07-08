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
    this.render()
  },
  methods: {
    render() {
      this.renderChart(this.data, this.options)
    }
  },
  watch: {
    options() {
      this.render()
    }
  }
}
</script>
