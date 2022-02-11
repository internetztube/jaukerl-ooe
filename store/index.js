import axios from 'axios'
import createPersistedState from "vuex-persistedstate";
import {getField, updateField} from 'vuex-map-fields';

export const state = () => ({
  isLoading: false,
  appointments: [],
  authorities: [],
  fetchedAt: null,
  categories: [],
  selectedAuthorities: [],
  selectedCategories: [],
  birthdate: '1990-01-01',
});

export const getters = {
  filteredAppointments(state) {
    if (state.isLoading) return []
    return state.appointments.filter((appointment) => {
      return state.selectedAuthorities.includes(appointment.authority.id)
        && state.selectedCategories.includes(appointment.categoryId)
    })
  },
  availableCategories(state, getters) {
    return state.categories.filter(o => {
      return getters.availableCategoryIds.includes(o.id)
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
}
export const mutations = {
  updateField,
  set(state, [name, value]) {
    state[name] = value
  },
}
export const actions = {
  selectAllAuthorities(context) {
    context.commit('set', ['selectedAuthorities', context.getters.allAuthorityIds])
  },
  deselectAllAuthorities(context) {
    context.commit('set', ['selectedAuthorities', []])
  },
  async init(context) {
    context.commit('set', ['isLoading', true])
    const response = await axios.get(`https://storage.googleapis.com/jaukerl-ooe/data.json?_=${+new Date()}`)

    const appointments = response.data.data.appointments.sort((appointment1, appointment2) => {
      return appointment1.startDateTimestamp - appointment2.startDateTimestamp
    })

    context.commit('set', ['appointments', appointments])
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
}


const getPlugins = () => {
  const plugins = []
  if (process.browser) {
    const vuexLocal = createPersistedState({
      reducer(state) {
        return {
          selectedAuthorities: state.selectedAuthorities,
          selectedCategories: state.selectedCategories,
          birthdate: state.birthdate,
        }
      }
    })
    plugins.push(vuexLocal)
  }
  return plugins
}
export const plugins = getPlugins()
