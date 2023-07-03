<template>
  <div>
    <h1>jaukerl-ooe.m8.at</h1>
    <br>
    <p>
      Seit dem 30. Juni 2023 sind alle oberösterreichisch Landesimpfzentren geschlossen.
      COVID 19-Impfungen werden, im niedergelassenen Bereich (Hausarzt, ...) und an Bezirksverwaltungsbehörden
      (Bezirkshauptmannschaften, Gemeinden, Magistraten, ...) angeboten.
    </p>
    <p>
      Weitere Informationen findest du hier: <a href="https://corona.ooe.gv.at/ooe-impft.htm">corona.ooe.gv.at</a>
    </p>
    <br>
    <hr>
    <br>
    <p>
      Somit ist das Projekt auch für mich abgeschlossen.
    </p>
    <p>
      Danke an alle, die mir bei dem Projekt zur Seite gestanden haben.
      Danke an alle, die diese Website in ihrem Freundes-/Bekanntenkreis beworben haben, damit Leute schneller einen Impftermin finden konnten.
      Danke an alle persönlichen Nachrichten, die mich erreicht haben.
      Danke an alle, die mich finanziell mit einer Spende bei dem Projekt unterstützt haben.
    </p>
    <p>
      Bis zum nächsten Projekt!<br>
      Frederic Köberl
    </p>

    <br>
    <p>
      <a href="https://frederickoeberl.com">frederickoeberl.com</a><br>
      <a href="https://github.com/internetztube/jaukerl-ooe">github.com/internetztube/jaukerl-ooe</a><br>
    </p>
    <p>
      <a href="https://raw.githubusercontent.com/internetztube/jaukerl-ooe/master/screenshot.png" target="_blank">Screenshot von jaukerl-ooe.m8.at (11.02.2022)</a>
    </p>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

export default {
  head() {
    const title = 'Die Nächsten Impftermine von ooe-impft.at! 💉';
    const description = 'Die Nächsten Impftermine in Oberösterreich!';
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
    ...mapState(['isLoading', 'fetchedAt']),
    ...mapGetters(['filteredAppointments'])
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
