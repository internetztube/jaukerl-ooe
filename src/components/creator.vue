<template>
  <b-row>
    <b-col sm="6">
      <div>Made with ❤️ in Linz by <a href="https://frederickoeberl.com" target="_blank">Fred</a>.</div>
    </b-col>
    <b-col sm="6" class="github">
      Fork me on <a href="https://github.com/internetztube/ooe-impft-dates-overview" target="_blank">Github</a>!
    </b-col>
  </b-row>
</template>

<script>
  import {BCol, BRow} from "bootstrap-vue";

  export default {
    components: {BCol, BRow},
  }
</script>


<style scoped>
  @media (min-width: 576px) {
    .github {
      text-align: right;
    }
  }
</style>
