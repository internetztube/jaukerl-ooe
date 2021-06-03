<template>
  <b-container class="mt-1 mb-5">
    <Creator/>
    <h1 class="mt-5">Alle Impftermine von ooe-impft.at! 💉</h1>
    <Description />
    <br>

    <div v-if="isLoading">Lade Daten... (dauert a bissl)</div>
    <div v-else>
      <div class="mb-4">
        Letzte Aktualisierung: {{ fetchedAt*1000 | toDateString("DD.MM.YYYY HH:mm:ss (dddd)") }}</div>
      <FilterCategory/>
      <FilterAuthority/>

      <h2 class="mt-5">
        <ResultHeadline/>
      </h2>

      <Result />

      <Creator/>
    </div>
  </b-container>
</template>

<script>
  import {BContainer} from "bootstrap-vue";
  import { mapState } from 'vuex'

  import FilterCategory from './components/filter-category'
  import FilterAuthority from './components/filter-authority'
  import ResultHeadline from './components/result-headline'
  import Creator from './components/creator'
  import Description from './components/description'
  import Result from './components/result'

  export default {
    components: {BContainer, FilterCategory, FilterAuthority, ResultHeadline, Creator, Description, Result},
    computed: {
      ...mapState(['isLoading', 'fetchedAt'])
    },
  }
</script>


<style>
  .pointer {
    cursor: pointer;
  }

  .pointer * {
    cursor: pointer;
  }

  input[name="authorities"] {
    display: none;
  }

  .custom-control-label {
    height: 100%;
    width: 100%;
  }
</style>
