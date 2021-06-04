<template>
  <b-container class="mt-1 mb-5">
    <Creator/>
    <h1 class="mt-5">Alle Impftermine von ooe-impft.at! 💉</h1>
    <Description/>
    <br>
    <br>
    <SettingBirthdate/>
    <br>
    <br>

    <div v-if="isLoading">Lade Daten... (dauert a bissl)</div>
    <div v-else>
      <div class="mb-4">Letzte Aktualisierung: {{ fetchedAt*1000 | toDateString }}</div>

      <FilterCategory/>
      <FilterAuthority/>

      <h2 class="mt-5">
        <ResultHeadline/>
      </h2>

      <Result/>

      <Creator class="mt-5"/>
    </div>
  </b-container>
</template>

<script>
  import {BContainer} from "bootstrap-vue";
  import {mapState} from 'vuex'

  import FilterCategory from './components/filter-category'
  import FilterAuthority from './components/filter-authority'
  import ResultHeadline from './components/result-headline'
  import Creator from './components/creator'
  import Description from './components/description'
  import Result from './components/result'
  import SettingBirthdate from './components/setting-birthdate'

  export default {
    components: {
      BContainer,
      FilterCategory,
      FilterAuthority,
      ResultHeadline,
      Creator,
      Description,
      Result,
      SettingBirthdate
    },
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
