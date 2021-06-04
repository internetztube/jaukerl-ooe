import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";
import {getField, updateField} from 'vuex-map-fields';
import Vue from "vue";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoading: false,
    appointments: [],
    authorities: [],
    fetchedAt: null,
    categories: [],
    selectedAuthorities: [],
    selectedCategories: [],
    birthdate: '1990-01-01',
  },
  getters: {
    filteredAppointments(state) {
      if (state.isLoading) return []
      return state.appointments.filter((appointment) => {
        for (let i = 0; i < state.selectedAuthorities.length; i++) {
          // Check if is in selected authorities array
          if (appointment.authority.id === state.selectedAuthorities[i]) {
            for (let i = 0; i < state.selectedCategories.length; i++) {
              // Check if is in selected categories array
              if (parseInt(appointment.categoryId) === parseInt(state.selectedCategories[i])) return true
            }
          }
        }
        return false
      }).sort((appointment1, appointment2) => {
        return appointment1.startDateTimestamp - appointment2.startDateTimestamp
      })
    },
    availableCategories(state, getters) {
      return state.categories.filter(o => {
        return getters.availableCategoryIds.indexOf(o.id) >= 0
      })
    },
    availableCategoryIds(state) {
      return [...new Set(state.appointments.map(o => o.category.id))]
    },
    allAuthorityIds(state) {
      return state.authorities.map(o => o.id)
    },
    isAuthorityChecked(state) {
      return (authorityId) => {
        for (let i = 0; i < state.selectedAuthorities.length; i++) {
          if (parseInt(authorityId) === parseInt(state.selectedAuthorities[i])) return true
        }
        return false
      }
    },
    isCategoryChecked(state) {
      return (categoryId) => {
        for (let i = 0; i < state.selectedCategories.length; i++) {
          if (parseInt(categoryId) === parseInt(state.selectedCategories[i])) return true
        }
        return false
      }
    },
    getField,
  },
  mutations: {
    updateField,
    set (state, [name, value]) {
      state[name] = value
    },
  },
  actions: {
    selectAllAuthorities(context) {
      context.commit('set', ['selectedAuthorities', context.getters.allAuthorityIds])
    },
    deselectAllAuthorities(context) {
      context.commit('set', ['selectedAuthorities', []])
    },
    async init(context) {
      context.commit('set', ['isLoading', true])
      const response = await axios.get(`https://jaukerl-ooe-api.m8.at/?birthdate=${context.state.birthdate}`)

      context.commit('set', ['appointments', response.data.data.appointments])
      context.commit('set', ['authorities', response.data.data.authorities])
      context.commit('set', ['categories', response.data.data.categories])
      context.commit('set', ['fetchedAt', response.data.fetchedAt])

      if (!context.state.selectedCategories.length) {
        context.commit('set', ['selectedCategories', context.getters.availableCategoryIds])
      }
      if (!context.state.selectedAuthorities.length) {
        context.commit('set', ['selectedAuthorities', context.getters.allAuthorityIds])
      }
      context.commit('set', ['isLoading', false])
    }
  },
  plugins: [createPersistedState({
    reducer(state) {
      return {
        selectedAuthorities: state.selectedAuthorities,
        selectedCategories: state.selectedCategories,
        birthdate: state.birthdate,
      }
    }
  })],
})

export default store
