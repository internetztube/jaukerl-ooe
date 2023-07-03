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
    const title = 'jaukerl-ooe.m8.at';
    return {
      title,
      meta: [
        {property: 'og:type', content: 'website'},
        {property: 'og:title', content: title},
        {property: 'og:url', content: 'https://jaukerl-ooe.m8.at/'},// here it is just ngrok for my test
        {property: 'twitter:title', content: title},
      ],
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
