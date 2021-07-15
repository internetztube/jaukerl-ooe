<template>
  <div class="row">
    <div class="mb-4 col-sm-6 col-md-4 col-lg-3" v-for="(appointment, index) in filteredAppointments" :key="index">
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
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters(['filteredAppointments'])
    }
  }
</script>

<style>
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

  .result-card {
    padding-left: 20px;
  }
</style>

