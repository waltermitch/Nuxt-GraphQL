<template>
  <PageContentWrapper>
    <CustomTable class="table">
      <template #header>
        <div class="table-row">
          <span> State </span>

          <span> City </span>

          <span> City Sales Tax </span>
        </div>
      </template>

      <template #content>
        <CustomTableRow v-for="city in cities" :key="city.id" class="table-row">
          <CustomSelect
            :options="states"
            :selected-item="states.find((state) => state.id === city.state_id)"
            select-by="state"
            @input="selectState($event, city.id)"
          />

          <CustomInput v-model="city.name" />

          <CustomInput v-model="city.citySalesTax" />
        </CustomTableRow>
      </template>
    </CustomTable>

    <DefaultButton class="button" @event="saveChanges">Save</DefaultButton>
  </PageContentWrapper>
</template>

<script>
import PageContentWrapper from './PageContentWrapper.vue'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
import CustomSelect from './CustomSelect.vue'
import CustomInput from './CustomInput.vue'
import DefaultButton from './DefaultButton.vue'
export default {
  name: 'HQCityContent',
  components: {
    PageContentWrapper,
    CustomTable,
    CustomTableRow,
    CustomSelect,
    CustomInput,
    DefaultButton,
  },
  data() {
    return {
      saveIsActive: false,
      states: [
        {
          id: 0,
          state: 'NY',
          salesTaxCafeteria: '4.00%',
          salesTaxVending: '3.90%',
          salesTaxRestaurant: '2.90%',
          salesTaxCStore: '2.00%',
          grossReceiptsTax: '0.00%',
        },
        {
          id: 1,
          state: 'CA',
          salesTaxCafeteria: '4.00%',
          salesTaxVending: '3.90%',
          salesTaxRestaurant: '2.90%',
          salesTaxCStore: '2.00%',
          grossReceiptsTax: '0.00%',
        },
      ],
      cities: [
        {
          id: 0,
          name: 'City',
          state_id: 0,
          citySalesTax: '2.3%',
        },
        {
          id: 1,
          name: 'Another City',
          state_id: 1,
          citySalesTax: '2.1%',
        },
      ],
    }
  },
  watch: {
    cities: {
      handler() {
        this.saveIsActive = true
      },
      deep: true,
    },
  },
  methods: {
    saveChanges() {
      console.log(this.cities)
    },
    selectState(item, cityID) {
      this.cities.find((city) => city.id === cityID).state_id = item.id
    },
  },
}
</script>

<style lang="scss" scoped>
.table {
  width: fit-content;
}

.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: 100px 250px 150px;
  column-gap: 30px;
}

.button {
  margin-top: 20px;
}
</style>
