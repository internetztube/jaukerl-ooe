// ~/plugins/persistedState.client.js

import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
      reducer(state) {
        return {
          selectedAuthorities: state.selectedAuthorities,
          selectedCategories: state.selectedCategories,
          birthdate: state.birthdate,
        }
      }
    })(store)
  })
}
