<template>
  <div style="min-height: 200px" class="table-responsive">
    <div v-if="day" class="">
      <table v-if="day.data.appointments.length" class="table">
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
        <tr v-for="(appointment, key) in day.data.appointments" :key="key">
          <td>
            <span class="color-dot-authority" :style="`background-color: ${stringToColor(appointment.authority.name)}`"></span>
            {{ appointment.authority.name }}
          </td>
          <td class="text-center">{{ appointment.freeSlots }}</td>
          <td>{{ appointment.category.description }}</td>
          <td>{{ appointment._startDate | toDateString('dd, DD.MM.YYYY HH:mm:ss') }}</td>
          <td>{{ appointment._fetchedDate | toDateString('dd, DD.MM.YYYY HH:mm:ss') }}</td>
          <td class="text-center">
            <a target="_blank" :href="`https://github.com/internetztube/jaukerl-ooe-archive/tree/master/${appointment.filePath}`">
              🐙
            </a>
          </td>
        </tr>
        </tbody>
      </table>
      <div v-else>
        An diesem Tag wurden alle Termine gebucht. 🎉
      </div>
    </div>
  </div>
</template>

<script>
import stringToColor from "@/helpers/string-to-color";
export default {
  props: {
    day: {
      type: Object,
      default: null,
    },
    colorMapping: {
      type: Object,
      default: null
    }
  },
  methods: {
    stringToColor,
  }
}
</script>

<style>
.color-dot-authority {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 100px;
  margin-right: 7px;
}
</style>
