<template>
  <b-form-group label="Impfstoffe:">
    <b-form-checkbox-group id="categories" v-model="selectedCategories" name="authorities">
      <b-row align-v="stretch">
        <b-col md="4" lg="3" class="mb-3"
               v-for="(name, categoryId) in availableCategories"
               :key="categoryId">
          <div :class="`card pointer h-100 ${isCategoryChecked(categoryId) ? ' text-white bg-primary' : ''}`">
            <b-form-checkbox :value="categoryId" class="h-100">
              <div class="card-body h-100">
                <h5 class="card-title mb-0">{{ name }}</h5>
                Termine: {{ appointments.filter(o => o.categoryId === parseInt(categoryId)).length }}
              </div>
            </b-form-checkbox>
          </div>
        </b-col>
      </b-row>
    </b-form-checkbox-group>
  </b-form-group>
</template>


<script>
  import { mapFields } from 'vuex-map-fields';
  import { mapState, mapGetters } from 'vuex'

  import {BCol, BFormCheckbox, BFormCheckboxGroup, BFormGroup, BRow} from "bootstrap-vue";


  export default {
    components: {BCol, BFormCheckbox, BFormCheckboxGroup, BFormGroup, BRow},
    computed: {
      ...mapFields(['selectedCategories']),
      ...mapState(['appointments']),
      ...mapGetters(['availableCategories', 'isCategoryChecked'])
    }
  }
</script>
