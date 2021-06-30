<template>
  <div>
    <h5>
      <div class="mt-3 mb-5">
        Neu: <router-link to="/expired">Freie Termine, die in OÖ nicht gebucht werden</router-link>
      </div>
    </h5>

    <h1>Alle Impftermine von ooe-impft.at! 💉</h1>
    <Description/>
    <br>
    <SettingBirthdate/>
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
  </div>
</template>

<script>
import {mapState} from 'vuex'

import FilterCategory from './components/filter-category'
import FilterAuthority from './components/filter-authority'
import ResultHeadline from './components/result-headline'
import Creator from '../components/creator'
import Description from './components/description'
import Result from './components/result'
import SettingBirthdate from './components/setting-birthdate'

export default {
  metaInfo: {
    title: 'Alle Impftermine von ooe-impft.at! 💉',
  },
  components: {
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
