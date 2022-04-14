<template>
  <PageContentWrapper>
    <CustomTable class="table">
      <template #header>
        <div class="table-row">
          <span>State</span>

          <span>Sales Tax - Cafeteria</span>

          <span>Sales Tax - Vending</span>

          <span>Sales Tax - Restaurant</span>

          <span>Sales Tax - C Store</span>

          <span>Gross Receipts Tax</span>
        </div>
      </template>

      <template #content>
        <CustomTableRow
          v-for="state in states"
          :key="state.id"
          class="table-row"
        >
          <CustomInput v-model="state.state" />

          <CustomInput v-model="state.salesTaxCafeteria" />

          <CustomInput v-model="state.salesTaxVending" />

          <CustomInput v-model="state.salesTaxRestaurant" />

          <CustomInput v-model="state.salesTaxCStore" />

          <CustomInput v-model="state.grossReceiptsTax" />
        </CustomTableRow>
      </template>
    </CustomTable>
  </PageContentWrapper>
</template>

<script>
import PageContentWrapper from './PageContentWrapper.vue'
import CustomTable from './CustomTable.vue'
import CustomInput from './CustomInput.vue'
export default {
  name: 'HQStateContent',
  components: { PageContentWrapper, CustomTable, CustomInput },
  data() {
    return {
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
    }
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
  grid-template-columns: 40px repeat(5, 160px);
  column-gap: 30px;
}
</style>
