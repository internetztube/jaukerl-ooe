import Vue from "vue";
import dayjs from "dayjs";

Vue.filter('toDateString', function(date, format) {
  if (!date || date === 0) return ''
  format = format || "dd, DD.MM.YYYY HH:mm:ss"
  return dayjs(date).locale('de').format(format)
})
