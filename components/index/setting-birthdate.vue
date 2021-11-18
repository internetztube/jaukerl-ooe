<template>
  <div>
    <p>
      <b>
        Nicht alle Impfstoffe sind für alle Altersgruppen freigegeben.
      </b>
      <br>
      Deswegen kannst du hier ein Geburtsdatum angeben, für das
      die jeweiligen Termine angezeigt werden sollen.
    </p>

    <b-form-group label="Geburtsdatum:">
      <input type="date" v-model="birthdate" class="mb-2 form-control">
    </b-form-group>
  </div>
</template>


<script>
  import {mapFields} from 'vuex-map-fields';

  import {BFormGroup} from "bootstrap-vue";


  export default {
    components: {BFormGroup},
    computed: {
      ...mapFields(['birthdate']),
    },
    watch: {
      birthdate() {
        this.$store.dispatch('init')
      }
    }
  }
</script>
