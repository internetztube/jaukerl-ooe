import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/expired-appointments',
    name: 'Expired Appointments',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/expired-appointments')
  }
]

const router = new VueRouter({
  routes
})

export default router
