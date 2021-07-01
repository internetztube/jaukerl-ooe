// ~/plugins/persistedState.client.js

import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    reducer(state) {
      return {
        selectedAuthorities: state.selectedAuthorities,
        selectedCategories: state.selectedCategories,
        birthdate: state.birthdate,
      }
    }
  })(store)
}
