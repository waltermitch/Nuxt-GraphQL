<template>
  <PageContentWrapper>
    <CustomTable class="table">
      <template #header>
        <div class="table-row">
          <span>Vendor Number</span>

          <span>Vendor Name</span>

          <span>Terms</span>
        </div>
      </template>

      <template #content>
        <CustomTableRow
          v-for="vendor in vendors"
          :key="vendor.id"
          class="table-row"
        >
          <CustomInput v-model="vendor.vendorNumber" />

          <CustomInput v-model="vendor.vendorName" />

          <CustomInput v-model="vendor.terms" />
        </CustomTableRow>
      </template>
    </CustomTable>
  </PageContentWrapper>
</template>

<script>
import PageContentWrapper from './PageContentWrapper.vue'
import CustomTable from './CustomTable.vue'
import CustomInput from './CustomInput.vue'
import CustomTableRow from './CustomTableRow.vue'
export default {
  name: 'HQVendorContent',
  components: {
    PageContentWrapper,
    CustomTable,
    CustomInput,
    CustomTableRow,
  },
  data() {
    return {
      vendors: [
        {
          id: 0,
          vendorNumber: 'ABC01',
          vendorName: 'ABC VENDOR',
          terms: 'upon receipt',
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
  grid-template-columns: 100px repeat(2, 200px);
  column-gap: 30px;
}
</style>
