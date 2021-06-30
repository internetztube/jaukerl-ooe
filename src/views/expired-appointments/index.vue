<template>
  <div class="about">
    <h1>Termine, die in OÖ nicht gebucht wurden</h1>

    <div class="mb-5 mt-3">
      <router-link to="/">Zurück zu den freien Impfterminen</router-link>
    </div>

    <div v-if="isLoading" class="mt-2">Lade Daten... (dauert a bissl)</div>
    <div v-else>
      <p>
        <b>Warum?</b><br>
        Der Bund hat den Ländern die Kompetenz über die COVID Impfungen übertragen. Das heißt, dass jedes Land
        selbst für die Organisation und Abwicklung der Impfungen verantwortlich ist. Also haben die Länder auch die
        Aufgabe, dass der Impfstoff so schnell wie möglich die die Oberarme der Leute kommt. <br>
        Diese Seite gibt eine Übersicht wie viele Termine (Plätze/Dosen) jeden Tag in Oberösterreich nicht gebucht
        werden. Impfstoff wird dabei ziemlich sicher nicht verschwendet, Human Ressourcen der anwesenden Ärzte und
        Helfer aber schon.
      </p>

      <p>
        <b>Hinweiß</b><br>
        Diese Datenanalyse wurde mit größter Sorgfalt und Genauigkeit durchgeführt. Dennoch kann keine Garantie für
        Richtigkeit oder Vollständigkeit der Daten garantiert werden. <br>
        Bei Fragen kannst du dich gerne an <a href="mailto:jaukerl-ooe@m8.at">jaukerl-ooe@m8.at</a> wenden.
      </p>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="accepted">
        <label class="form-check-label" for="flexCheckDefault">
          Ich habe den Hinweiß gelesen und werde die Daten mit der dementsprechenden Vorsicht genießen.
        </label>
      </div>

      <div :class="`mt-5 blur-stuff-base ${!accepted ? 'blur-stuff' : ''}`">

        <p>
          <b>Von wo kommen die Daten?</b><br>
          Seit dem 16.02.2021 werden die Daten, welche vom Land über die Schnittstelle zurück kommen jede Minute
          archiviert. <br>
          Nicht gebuchte Termine verschwinden zu dem Zeitpunkt, an dem der Impf-Termin stattgefunden hätte. Wenn ein
          Termin mindestens 2 Minuten vor dem eigentlichen Termin nicht gebucht worden ist, wird davon ausgegangen,
          dass niemand diesen Termin gebucht hat. Im Einzelnachweiß sieht man auch den Zeitpunkt an dem der jeweilige
          Termin als letzten gesehen wurde.
        </p>

        <p>
          <b>Transparenz:</b><br>
          Alle zugrunde liegenden Daten und die gesamte Logik ist auf Github einsehbar. <br>
          <a href="https://github.com/internetztube/jaukerl-ooe-archive" target="_blank">internetztube/jaukerl-ooe-archive</a><br>
          <a href="https://github.com/internetztube/jaukerl-ooe-api" target="_blank">internetztube/jaukerl-ooe-api</a>
        </p>

        <p>
          <b>Warum akkumulieren sich die nicht gebuchten Termine über Tage hinweg?</b><br/>
          Es ist davon auszugehen, dass wenn an einem Tag ein Impftermin nicht wahrgenommen wird, dass für den
          darauffolgenden Tag ein neuer Termin ins System gespielt wird. Deswegen kann es vorkommen, dass sich so über
          mehrere Tage einige Termine anhäufen.
        </p>

        <chart :data="chartData" :options="chartOptions" class="mt-5"></chart>

        <h2 class="mt-5 mb-3">Einzelnachweis</h2>
        <select v-model="currentDate" class="form-select d-inline-block mb-3">
          <option disabled checked value="">Wähle einen Tag aus</option>
          <option v-for="(date, index) in Object.keys(overview).reverse()" :key="index" :value="date">
            {{ date | toDateString('dd, DD.MM.YYYY') }}
          </option>
        </select>

        <div v-if="isLoadingDay">Lade Daten... (dauert a bissl)</div>

        <div v-if="details[currentDate]" class="table-responsive">
          <table v-if="details[currentDate].data.appointments.length" class="table">
            <thead>
            <tr>
              <th>Standort</th>
              <th class="text-center">Plätze</th>
              <th>Impfstoff</th>
              <th>Zeitpunkt des Termines</th>
              <th>Zuletzt gesehen</th>
              <th class="text-center">Quelle</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(appointment, key) in details[currentDate].data.appointments" :key="key">
              <td>{{ appointment.authority.name }}</td>
              <td class="text-center">{{ appointment.freeSlots }}</td>
              <td>{{ appointment.category.description }}</td>
              <td>{{ appointment._startDate | toDateString('dd, DD.MM.YYYY HH:mm:ss') }}</td>
              <td>{{ appointment._fetchedDate | toDateString('dd, DD.MM.YYYY HH:mm:ss') }}</td>
              <td class="text-center"><a target="_blank"
                                         :href="`https://github.com/internetztube/jaukerl-ooe-archive/tree/master/${appointment.filePath}#:~:text=${encodeURIComponent(appointment.uid)}`">🐙</a>
              </td>
            </tr>
            </tbody>
          </table>
          <div v-else>
            An diesem Tag wurden alle Temrine gebucht.
          </div>

        </div>
      </div>
      <Creator class="mt-5"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import chart from './chart'
import Creator from '../components/creator'
import dayjs from 'dayjs'

export default {
  metaInfo: {
    title: 'Termine, die in OÖ nicht gebucht wurden',
  },
  components: {chart, Creator},
  data: function () {
    return {
      currentDate: '',
      isLoading: true,
      overview: null,
      details: [],
      isLoadingDay: false,
      accepted: false,
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
        labels: Object.keys(this.overview).map(o => dayjs(o).locale('de').format('dd, DD.MM.YY')),
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
  filter: blur(0px);
}

.blur-stuff * {
  filter: blur(10px);
  pointer-events: none;
  user-select: none;
}

</style>