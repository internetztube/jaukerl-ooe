<template>
  <div>
<!--    <h5>-->
<!--      <div class="mt-3 mb-5">-->
<!--        <router-link to="/expired">Freie Termine, die in OÖ nicht gebucht werden</router-link>-->
<!--      </div>-->
<!--    </h5>-->

    <h1>Alle Impftermine von ooe-impft.at! 💉</h1>
    <Description/>
    <br>
    <div v-if="isLoading || !fetchedAt">Lade Daten... (dauert a bissl)</div>
    <div v-else>
      <no-ssr>
        <div class="mb-4">Letzte Aktualisierung: {{ fetchedAt * 1000 | toDateString }}</div>

        <FilterCategory/>
        <FilterAuthority/>

        <h2 class="mt-5">
          <ResultHeadline/>
        </h2>

        <Result/>
        <Creator class="mt-5"/>

      </no-ssr>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

import FilterCategory from '../components/index/filter-category'
import FilterAuthority from '../components/index/filter-authority'
import ResultHeadline from '../components/index/result-headline'
import Creator from '../components/creator'
import Description from '../components/index/description'
import Result from '../components/index/result'

export default {
  components: {
    FilterCategory,
    FilterAuthority,
    ResultHeadline,
    Creator,
    Description,
    Result,
  },
  head() {
    const title = 'Alle Impftermine von ooe-impft.at! 💉';
    const description = 'Alle verfügbaren Impftermine in Oberösterreich!';
    const shareImage = 'https://jaukerl-ooe.m8.at/share.png'
    return {
      title,
      meta: [
        {property: 'og:type', content: 'website'},
        {property: 'og:title', content: title},
        {property: 'og:description', content: description},
        {property: 'og:url', content: 'https://jaukerl-ooe.m8.at/'},// here it is just ngrok for my test
        {property: 'og:image', content: shareImage},
        {property: 'twitter:title', content: title},
        {property: 'twitter:description', content: description},
        {property: 'twitter:card', content: 'summary_large_image'},
        {property: 'twitter:image', content: shareImage},
      ],
      scripts: [
        {
          hid: 'googleAnalytics', innerHTML: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PMMFLL');
        `
        }
      ],
      __dangerouslyDisableSanitizersByTagID: {
        googleAnalytics: ['innerHTML'],
      }
    }
  },
  computed: {
    ...mapState(['isLoading', 'fetchedAt'])
  },
  mounted() {
    this.$store.dispatch('init')
  }
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
