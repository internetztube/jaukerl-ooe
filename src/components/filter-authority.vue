<template>
  <div v-if="authorities.length">
    <b-form-group label="Standorte:">
      <b-form-checkbox-group id="authorities" v-model="selectedAuthorities" name="authorities">
        <b-row align-v="stretch">
          <b-col md="4" lg="3" class="mb-3" v-for="(authority, index) in authorities" :key="index">
            <div :class="`card pointer h-100 ${isAuthorityChecked(authority.id) ? ' text-white bg-primary' : ''}`">
              <b-form-checkbox :value="authority.id" class="h-100">
                <div class="card-body h-100">
                  <h5 class="card-title">{{ authority.name }}</h5>
                  {{ authority.adresse }}
                  <div class="mt-1">
                    Termine: {{ appointments.filter(o => o.authority.id === authority.id).length }}
                  </div>
                </div>
              </b-form-checkbox>
            </div>
          </b-col>
        </b-row>
      </b-form-checkbox-group>
    </b-form-group>

    <b-row>
      <b-col sm="6" class="mb-2">
        <b-button @click="selectAllAuthorities" variant="primary" class="w-100">Alle Standorte auswählen</b-button>
      </b-col>
      <b-col sm="6" class="mb-2">
        <b-button @click="deselectAllAuthorities" variant="outline-primary" class="w-100">Alle Standorte abwählen</b-button>
      </b-col>
    </b-row>

  </div>
</template>


<script>
  import {mapFields} from 'vuex-map-fields';
  import {mapActions, mapGetters, mapState} from 'vuex'

  import {BButton, BCol, BFormCheckbox, BFormCheckboxGroup, BFormGroup, BRow} from "bootstrap-vue";


  export default {
    components: {BCol, BFormCheckbox, BButton, BFormCheckboxGroup, BFormGroup, BRow},
    computed: {
      ...mapFields(['selectedAuthorities']),
      ...mapState(['appointments', 'authorities']),
      ...mapGetters(['isAuthorityChecked', 'isCategoryChecked'])
    },
    methods: {
      ...mapActions(['selectAllAuthorities', 'deselectAllAuthorities'])
    }
  }
</script>
