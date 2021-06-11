<template>
  <b-form-group label="Impfstoffe:" v-if="availableCategories.length">
    <b-form-checkbox-group id="categories" v-model="selectedCategories" name="authorities">
      <b-row align-v="stretch">
        <b-col :key="index" class="mb-3" lg="3" md="4" v-for="(category, index) in availableCategories">
          <div :class="`card pointer h-100 ${isCategoryChecked(category.id) ? ' text-white bg-primary' : ''}`">
            <b-form-checkbox :value="category.id" class="h-100">
              <div class="card-body h-100">
                <h5 class="card-title mb-0">
                  <span class="category-color-dot" :style="`background-color: #${category.colorCode};`"></span>
                  {{ category.description }}
                </h5>
                Termine: {{ appointments.filter(o => o.category.id === parseInt(category.id)).length }}
                /
                Freie Plätze: {{ appointments.filter(o => o.category.id === parseInt(category.id)).map(o => o.freeSlots).reduce((a, c) => a + c) }}
              </div>
            </b-form-checkbox>
          </div>
        </b-col>
      </b-row>
    </b-form-checkbox-group>
  </b-form-group>
</template>


<script>
  import {mapFields} from 'vuex-map-fields';
  import {mapGetters, mapState} from 'vuex'

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


<style scoped>
  .category-color-dot {
    position: relative;
    display: inline-block;
    top: 1px;
    height: 18px;
    width: 18px;
    border-radius: 100px;
    margin-right: 3px;
  }
</style>
