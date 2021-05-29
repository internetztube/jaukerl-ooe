<template>
  <b-container class="mt-1 mb-5">
    <b-row>
      <b-col md="6">
        <div>Made with ❤️ in Linz by <a href="https://frederickoeberl.com" target="_blank">Fred</a>.</div>
      </b-col>
      <b-col md="6" style="text-align: right;">
        Fork me on <a href="https://github.com/internetztube/ooe-impft-dates-overview" target="_blank">Github</a>!
      </b-col>
    </b-row>

    <h1 class="mt-5">Alle Impftermine von ooe-impft.at! 💉</h1>

    <p>
      Termine kann man hier registrieren: <br>
      <a href="https://www.land-oberoesterreich.gv.at/files/covid19impfungopen/#/online-terminvereinbarung" target="_blank">
        https://www.land-oberoesterreich.gv.at/files/covid19impfungopen/#/online-terminvereinbarung
      </a>
    </p>
    <p>
      Wenn du schon einen Termin hast, registriere dich mit den selben Daten einfach nochmal. Wenn du einen passenden Termin gefunden hast, den Alten stornieren und direkt den neuen Termin buchen.
      Absagen kannst du den Termin mit dem Link aus der E-Mail deiner alten Buchung. Bevor du den alten Termin nicht abgesagt hast, kannst du auch keinen neuen Termin buchen.
    </p>

    <div v-if="loading">Lade Daten... (dauert a bissl)</div>
    <div v-else>
      <div class="mb-4">Letzte Aktualisierung: {{ fetchedAt | moment("DD.MM.YYYY HH:mm (dddd)") }}</div>
      <b-form-group label="Standorte:">
        <b-form-checkbox-group id="authorities" v-model="selectedAuthorities" name="authorities">
          <b-row align-v="stretch">
            <b-col md="4" lg="3" class="mb-3" v-for="(authority, index) in authorities" :key="index">
              <div :class="`card pointer h-100 ${isAuthorityChecked(authority) ? ' text-white bg-primary' : ''}`">
                <b-form-checkbox :value="authority">
                  <div class="card-body">
                    <h5 class="card-title">{{ authority.name }}</h5>
                    {{ authority.adresse }}
                  </div>
                </b-form-checkbox>
              </div>
            </b-col>
          </b-row>
        </b-form-checkbox-group>
      </b-form-group>
      <b-row>
        <b-col sm="6">
          <b-button @click="selectAllAuthorities" variant="primary" class="w-100">Alle Standorte auswählen</b-button>
        </b-col>
        <b-col sm="6">
          <b-button @click="deselectAllAuthorities" variant="outline-primary" class="w-100">Alle Standorte abwählen</b-button>
        </b-col>
      </b-row>

      <h2 class="mt-5">
        <span v-if="!selectedAuthorities.length">Wähle mindestens einen Standort aus!</span>
        <span v-else-if="!filteredAppointments.length">Leider wurde keine Termine gefunden! 😭</span>
        <span v-else>
          <span v-if="filteredAppointments.length === 1">Ein Termin</span>
          <span v-else>{{ filteredAppointments.length }} Termine</span>
          bei
          <span v-if="selectedAuthorities.length === 1">einem Standort</span>
          <span v-else> {{ selectedAuthorities.length }} Standorten</span>
          Standorten gefunden!
        </span>
      </h2>
      <b-row>
        <b-col sm="6" md="4" lg="3" v-for="(appointment, index) in filteredAppointments" :key="index">
          <div class="card mb-4">
            <div class="card-body">
              <h5>{{ appointment.startDate | moment("DD.MM.YYYY HH:mm (dddd)") }}</h5>
              <div>{{ appointment.authority.name }}</div>
              <div v-if="categories[appointment.categoryId]">{{ categories[appointment.categoryId] }}</div>
              <div><b>Freie Termine:</b> {{ appointment.freeSlots }}</div>
            </div>
          </div>
        </b-col>
      </b-row>

    </div>
    <b-row v-if="!loading">
      <b-col md="6">
        <div>Made with ❤️ in Linz by <a href="https://frederickoeberl.com" target="_blank">Fred</a>.</div>
      </b-col>
      <b-col md="6" style="text-align: right;">
        Fork me on <a href="https://github.com/internetztube/ooe-impft-dates-overview" target="_blank">Github</a>!
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'App',
    components: {},
    data () {
      return {
        selectedAuthorities: [],
        loading: false,
        appointments: [],
        authorities: [],
        fetchedAt: null,
        categories: {
          9: 'Biontech / Pfizer',
          12: 'Johnson & Johnson',
        }
      }
    },
    computed: {
      filteredAppointments() {
        if (this.loading) return []
        return this.appointments.filter((appointment) => {
          for (let i = 0; i < this.selectedAuthorities.length; i++) {
            if (appointment.authority.id === this.selectedAuthorities[i].id) return true
          }
          return false
        }).sort((appointment1, appointment2) => {
          return appointment1.startDateTimestamp - appointment2.startDateTimestamp
        })
      }
    },
    methods: {
      isAuthorityChecked(authority) {
        for (let i = 0; i < this.selectedAuthorities.length; i++) {
          if (authority.id === this.selectedAuthorities[i].id) return true
        }
        return false
      },
      selectAllAuthorities() {
        this.selectedAuthorities = this.authorities
      },
      deselectAllAuthorities() {
        this.selectedAuthorities = []
      },
    },
    mounted() {
      this.loading = true;
      axios
        .get('https://ooe-impft-api.internetztube.net/')
        .then(response => {
          this.appointments = response.data.data.appointments
          this.authorities = response.data.data.authorities
          this.fetchedAt = response.data.fetchedAt
          this.selectedAuthorities = this.authorities
        })
        .catch(error => console.log(error))
        .finally(() => this.loading = false)
    }
  }
</script>


<style>
  .pointer {
    cursor: pointer;
  }
  .pointer * {
    cursor: pointer;
  }

  input[name="authorities"] {
    display: none;
  }
</style>
