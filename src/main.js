import Vue from 'vue'
import 'es6-promise/auto'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'

import App from './App.vue'
import store from './store'
import dayjs from "dayjs";

Vue.config.productionTip = false

Vue.filter('toDateString', function(date, format) {
  if (!date || date === 0) return ''
  format = format || "DD.MM.YYYY HH:mm:ss (dddd)"
  return dayjs(date).format(format)
})


new Vue({
  render: h => h(App),
  store,
  mounted() {
    this.$store.dispatch('init')
  }
}).$mount('#app')
