import Vue from 'vue'
import 'es6-promise/auto'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'

import App from './App.vue'
import store from './store'
import dayjs from 'dayjs'
import 'dayjs/locale/de'
import router from './router'

Vue.config.productionTip = false

Vue.filter('toDateString', function(date, format) {
  if (!date || date === 0) return ''
  format = format || "dd, DD.MM.YYYY HH:mm:ss"
  return dayjs(date).locale('de').format(format)
})


new Vue({
  render: h => h(App),
  store,
  router,

  mounted() {
    this.$store.dispatch('init')
  }
}).$mount('#app')
