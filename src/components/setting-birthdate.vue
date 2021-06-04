<template>
  <b-row>
    <b-col md="9" sm="12">
      <p>
        Das Land Oberösterreich hat am 27.05.2021 die Impftermine für alle ab 16 Jahren freigegeben. Nicht alle
        Impfstoffe sind für alle Altersgruppen freigegeben.
        <br>
        Deswegen kannst du hier ein Geburtsdatum angeben, für das
        die jeweiligen Termine angezeigt werden sollen.
      </p>
    </b-col>
    <b-col md="3" sm="12">
      <b-form-group label="Geburtsdatum:">
        <b-form-datepicker class="mb-2" v-model="birthdate" locale="de"></b-form-datepicker>
      </b-form-group>
    </b-col>
  </b-row>
</template>


<script>
  import {mapFields} from 'vuex-map-fields';

  import {BCol, BFormDatepicker, BFormGroup, BRow} from "bootstrap-vue";


  export default {
    components: {BFormGroup, BFormDatepicker, BCol, BRow},
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
