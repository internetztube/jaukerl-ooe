<template>
  <b-container class="mt-1 mb-5">
    <Creator class="mb-5"/>
    <router-view/>
  </b-container>
</template>

<script>
import {BContainer} from "bootstrap-vue";
import Creator from '../components/creator'

export default {
  components: {
    BContainer,
    Creator,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
