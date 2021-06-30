<template>
  <div class="about">
    <div v-if="isLoading">
      Loading
    </div>
    <div v-else>
      <h1>Termine, die in OÖ ungebucht verfallen sind</h1>
      <chart :data="chartData" :options="chartOptions"></chart>

      <h2 class="mt-5 mb-3">Einzelnachweis</h2>

      <select name="" v-model="currentDate" class="form-select d-inline-block">
        <option disabled checked value="">Wähle einen Tag aus</option>
        <option v-for="(date, index) in Object.keys(overview)" :key="index" :value="date">{{ date }}</option>
      </select>

      <div v-if="details[currentDate]">
        <table v-if="details[currentDate].data.appointments.length" class="table mt-4">
          <thead>
          <tr>
            <th>Standort</th>
            <th>Plätze</th>
            <th>Impfstoff</th>
            <th>Zeitpunkt des Termines</th>
            <th>Zuletzt gesehen am</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(appointment, key) in details[currentDate].data.appointments" :key="key">
            <td>{{ appointment.authority.name }}</td>
            <td>{{ appointment.freeSlots }}</td>
            <td>{{ appointment.category.description }}</td>
            <td>{{ appointment._startDate | toDateString('dd, DD.MM.YYYY HH:mm:ss') }}</td>
            <td>{{ appointment._fetchedDate | toDateString('dd, DD.MM.YYYY HH:mm:ss') }}</td>
          </tr>
          </tbody>
        </table>
        <div v-else class="mt-2">
          An diesem Tag wurden alle Temrine gebucht.
        </div>

        <Creator class="mt-5"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import chart from './chart'
import Creator from '../components/creator'

export default {
  components: {chart, Creator},
  data: function () {
    return {
      currentDate: '',
      isLoading: true,
      overview: null,
      details: []
    }
  },
  watch: {
    async currentDate() {
      await this.getDetail(this.currentDate)
    }
  },
  computed: {
    chartData() {
      if (!this.overview) return null;
      return {
        labels: Object.keys(this.overview),
        datasets: [
          {
            label: 'Nicht gebuchte Termine',
            backgroundColor: '#0d6efd',
            data: Object.values(this.overview).map(o => o.expiredSlots)
          }
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          onClick: (e) => e.stopPropagation()
        }
      }
    }
  },
  async mounted() {
    this.isLoading = true;
    this.overview = (await axios.get('https://jaukerl-ooe-api.m8.at/expired-appointments')).data.data
    this.isLoading = false;
    console.log(this.overview)
  },
  methods: {
    async getDetail(date) {
      if (this.details[date]) return this.details[date]
      const url = `https://jaukerl-ooe-api.m8.at/expired-appointments/detail?date=${date}`
      this.details[date] = (await axios.get(url)).data
      this.$forceUpdate()
      return this.details[date]
    }
  }
}
</script>