<template>
  <b-row>
    <b-col sm="6" md="4" lg="3" v-for="(appointment, index) in filteredAppointments" :key="index">
      <div class="card mb-4">
        <div class="card-body">
          <h5>{{ appointment.startDate | toDateString("DD.MM.YYYY HH:mm (dddd)") }}</h5>
          <div>{{ appointment.authority.name }}</div>
          <div v-if="categories[appointment.categoryId]">{{ categories[appointment.categoryId] }}</div>
          <div><b>Freie Plätze:</b> {{ appointment.freeSlots }}</div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
  import {BRow, BCol} from "bootstrap-vue";
  import { mapGetters, mapState} from 'vuex'

  export default {
    components: {BRow, BCol},
    computed: {
      ...mapGetters(['filteredAppointments']),
      ...mapState(['categories'])
    }
  }
</script>
