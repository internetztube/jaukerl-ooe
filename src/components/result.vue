<template>
  <b-row>
    <b-col :key="index" class="mb-4" lg="3" md="4" sm="6" v-for="(appointment, index) in filteredAppointments">
      <div class="card h-100">
        <div class="card-body h-100 result-card">
          <span class="category-color-bar" :style="`background-color: #${appointment.category.colorCode};`"></span>
          <h5>{{ appointment.startDate | toDateString('dd, DD.MM.YYYY HH:mm') }}</h5>
          <span class="position-relative">
            <span class="category-color-dot" :style="`background-color: #${appointment.category.colorCode};`"></span>
            <span class="category-name">{{ appointment.category.description }}</span>
          </span>
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

<style scoped>
  .category-color-bar {
    display: inline-block;
    height: 100%;
    width: 8px;
    position: absolute;
    top: 0;
    left: 0;
  }

  .category-color-dot {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 100px;
    margin-right: 5px;
    position: relative;
    top: 1px;
  }

  .category-name {
  }

  .result-card {
    padding-left: 20px;
  }
</style>

