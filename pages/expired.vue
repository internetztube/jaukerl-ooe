<template>
  <div class="about">

    <div class="mt-3 mb-4">
      <router-link to="/">Zurück zu den freien Impfterminen</router-link>
    </div>

    <h1>Freie Termine, die in OÖ nicht gebucht werden</h1>
    <description-above/>

    <p>
      <b>Hinweis</b><br>
      Diese Datenanalyse wurde mit größter Sorgfalt und Genauigkeit durchgeführt. Dennoch kann keine Garantie für
      die Richtigkeit oder Vollständigkeit der Daten übernommen werden.
      Bei Fragen kannst du dich gerne an <a href="mailto:jaukerl-ooe@m8.at">jaukerl-ooe@m8.at</a> wenden.
    </p>
    <div class="form-check">
      <input id="flexCheckDefault" v-model="accepted" class="form-check-input" type="checkbox" value="">
      <label class="form-check-label" for="flexCheckDefault">
        Ich habe den Hinweis gelesen und werde die Daten mit der dementsprechenden Vorsicht handhaben.
      </label>
    </div>

    <div :class="`mt-5 blur-stuff-base ${!accepted ? 'blur-stuff' : ''}`">
      <div v-if="isLoading" class="mt-2">Lade Daten... (dauert a bissl)</div>
      <div v-else>
        <description-below/>

        <chart :data="chartData" :options="chartOptions" class="mt-5"></chart>

        <h2 class="mt-5 mb-3">Einzelnachweis</h2>
        <select v-model="currentDate" class="form-select d-inline-block mb-3">
          <option disabled checked value="">Wähle einen Tag aus</option>
          <option v-for="(date, index) in Object.keys(overview).reverse()" :key="index" :value="date">
            {{ date | toDateString('dd, DD.MM.YYYY') }}
          </option>
        </select>

        <div v-if="isLoadingDay">Lade Daten... (dauert a bissl)</div>
        <day-detail :day="details[currentDate]"></day-detail>

      </div>
    </div>
    <Creator class="mt-5"/>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from 'dayjs'
import chart from '../components/expired/chart'
import Creator from '../components/creator'
import descriptionAbove from '../components/expired/description-above'
import descriptionBelow from '../components/expired/description-below'
import dayDetail from '../components/expired/day-detail'

export default {
  head() {
    const title = 'Freie Termine, die in OÖ nicht gebucht werden';
    const description = 'Auflistung der nicht gebuchten Impftermine in Oberösterreich';
    const shareImage = 'https://jaukerl-ooe.m8.at/share-expired.png'
    return {
      title,
      meta: [
        {property: 'og:type', content: 'website'},
        {property: 'og:title', content: title},
        {property: 'og:description', content: description},
        {property: 'og:url', content: 'https://jaukerl-ooe.m8.at/expired/'},// here it is just ngrok for my test
        {property: 'og:image', content: shareImage},
        {property: 'twitter:title', content: title},
        {property: 'twitter:description', content: description},
        {property: 'twitter:card', content: 'summary_large_image'},
        {property: 'twitter:image', content: shareImage},
      ]
    }
  },
  components: {chart, Creator, descriptionAbove, descriptionBelow, dayDetail},
  data() {
    return {
      currentDate: '',
      isLoading: true,
      overview: null,
      details: [],
      isLoadingDay: false,
      accepted: false,
    }
  },
  computed: {
    chartData() {
      if (!this.overview) return null;
      return {
        labels: Object.keys(this.overview).map(o => dayjs(o).locale('de').format('dd, DD.MM.YY')),
        datasets: [
          {
            label: 'Nicht gebuchte Termine (Plätze/Dosen)',
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
  watch: {
    async currentDate() {
      await this.getDetail(this.currentDate)
    }
  },
  async mounted() {
    this.isLoading = true;
    this.overview = (await axios.get('https://jaukerl-ooe-api.m8.at/expired-appointments')).data.data
    this.isLoading = false;
  },
  methods: {
    async getDetail(date) {
      if (this.details[date]) return this.details[date]
      this.isLoadingDay = true
      const url = `https://jaukerl-ooe-api.m8.at/expired-appointments/detail?date=${date}`
      this.details[date] = (await axios.get(url)).data
      this.$forceUpdate()
      this.isLoadingDay = false
      return this.details[date]
    }
  }
}
</script>

<style>
.blur-stuff-base * {
  transition: filter .5s;
  filter: blur(0);
}

.blur-stuff * {
  filter: blur(10px);
  pointer-events: none;
  user-select: none;
}

</style>
