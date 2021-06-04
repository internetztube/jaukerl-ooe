<template>
  <b-row>
    <b-col :key="index" class="mb-4" lg="3" md="4" sm="6" v-for="(appointment, index) in filteredAppointments">
      <div class="card h-100">
        <div class="card-body h-100">
          <h5>{{ appointment.startDate | toDateString }}</h5>
          <div :style="`background-color: #${appointment.category.colorCode};`">{{ appointment.category.description }}
          </div>
          <div>{{ appointment.authority.name }}</div>
          <div><b>Freie Plätze:</b> {{ appointment.freeSlots }}</div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
  import {BCol, BRow} from "bootstrap-vue";
  import {mapGetters} from 'vuex'

  export default {
    components: {BRow, BCol},
    computed: {
      ...mapGetters(['filteredAppointments'])
    }
  }
</script>
