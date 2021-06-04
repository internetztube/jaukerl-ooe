<template>
  <span>
    <span v-if="!selectedAuthorities.length">Wähle mindestens einen Standort aus!</span>
    <span v-else-if="!selectedCategories.length">Wähle mindestens einen Impfstoff aus!</span>
    <span v-else-if="!filteredAppointments.length">Leider wurde keine Termine gefunden! 😭</span>
    <span v-else>
      <span v-if="filteredAppointments.length === 1">Ein Termin</span>
      <span v-else>{{ filteredAppointments.length }} Termine</span>
      bei
      <span v-if="selectedAuthorities.length === 1">einem Standort</span>
      <span v-else> {{ selectedAuthorities.length }} Standorten</span>
      gefunden!
    </span>
  </span>
</template>


<script>
  import {mapGetters, mapState} from 'vuex'

  export default {
    computed: {
      ...mapState(['selectedAuthorities', 'selectedCategories']),
      ...mapGetters(['filteredAppointments'])
    }
  }
</script>
