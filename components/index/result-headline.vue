<template>
  <span>
    <span v-if="!selectedAuthorities.length">Wähle mindestens einen Standort aus!</span>
    <span v-else-if="!selectedCategories.length">Wähle mindestens einen Impfstoff / ein Beratungsgespräch aus!</span>
    <span v-else-if="!filteredAppointments.length">Leider wurde keine Termine gefunden! 😭</span>
    <span v-else>
      <span v-if="filteredAppointments.length === 1">
        Ein Termin
        <span v-if="freeSlots === 1">mit einem freien Platz</span>
        <span v-else>mit {{ freeSlots}} freien Plätzen</span>
      </span>
      <span v-else>{{ filteredAppointments.length }} Termine mit {{ freeSlots }} freien Plätzen</span>
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
      ...mapGetters(['filteredAppointments']),
      freeSlots() {
        return this.filteredAppointments.map(o => o.freeSlots).reduce((a, c) => a + c)
      }
    }
  }
</script>
