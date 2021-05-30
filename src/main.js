import Vue from 'vue'
import App from './App.vue'




// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
