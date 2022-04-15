<template>
  <PageContentWrapper>
    <CustomTable class="table">
      <template #header>
        <div class="table-row">
          <span> Code </span>

          <span> Name </span>
        </div>
      </template>

      <template #content>
        <CustomTableRow
          v-for="district in districts"
          :key="district.id"
          class="table-row"
        >
          <CustomInput v-model="district.code" />

          <CustomInput v-model="district.name" />
        </CustomTableRow>
      </template>
    </CustomTable>
  </PageContentWrapper>
</template>

<script>
import PageContentWrapper from './PageContentWrapper.vue'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
import CustomInput from './CustomInput.vue'
export default {
  name: 'HQDistrictContent',
  components: {
    PageContentWrapper,
    CustomTable,
    CustomTableRow,
    CustomInput,
  },
  data() {
    return {
      districts: [
        {
          id: 0,
          code: 11,
          name: 'District',
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
  grid-template-columns: 100px 200px;
  column-gap: 30px;
}
</style>
