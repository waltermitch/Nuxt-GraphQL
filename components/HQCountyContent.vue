<template>
  <PageContentWrapper>
    <CustomTable class="table">
      <template #header>
        <div class="table-row">
          <span>State</span>

          <span>County</span>

          <span>Tax</span>
        </div>
      </template>

      <template #content>
        <CustomTableRow
          v-for="county in counties"
          :key="county.id"
          class="table-row"
        >
          <CustomSelect
            :options="states"
            :selected-item="states.find((state) => state.id === county.stateId)"
            select-by="state"
          />

          <span>
            {{ county.county }}
          </span>

          <span>
            {{ county.tax }}
          </span>
        </CustomTableRow>
      </template>
    </CustomTable>
  </PageContentWrapper>
</template>

<script>
export default {
  name: 'HQCountyContent',
  data() {
    return {
      counties: [
        {
          id: 0,
          county: 'County',
          tax: '0.00%',
          stateId: 0,
        },
        {
          id: 1,
          county: 'County County',
          tax: '0.00%',
          stateId: 1,
        },
      ],
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
  grid-template-columns: 100px 250px 150px;
  column-gap: 30px;
}
</style>
