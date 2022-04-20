<template>
  <PageContentWrapper>
    <CustomTable>
      <template #header>
        <div class="table-row">
          <span>Unit</span>

          <span>Name</span>

          <span>City</span>

          <span>State</span>
        </div>
      </template>

      <template #content>
        <CustomTableRow v-for="unit in units" :key="unit.id" class="table-row">
          <span>
            {{ unit.unit }}
          </span>

          <span>
            {{ unit.name }}
          </span>

          <span>
            {{ unit.city }}
          </span>

          <span>
            {{ unit.state }}
          </span>

          <CustomTableIconsColumn />
        </CustomTableRow>
      </template>
    </CustomTable>
  </PageContentWrapper>
</template>

<script>
import PageContentWrapper from './PageContentWrapper.vue'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow'
import CustomTableIconsColumn from './CustomTableIconsColumn'
export default {
  name: 'HQUnitsTableContent',
  components: {
    PageContentWrapper,
    CustomTable,
    CustomTableRow,
    CustomTableIconsColumn,
  },
  data() {
    return {
      units: [
        {
          id: 0,
          unit: 123,
          name: 'lorem ipsum',
          city: 'lorem ipsum',
          state: 'PA',
        },
        {
          id: 1,
          unit: 456,
          name: 'lorem ipsum',
          city: 'lorem ipsum',
          state: 'PA',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: 160px 340px 200px 160px 60px;
  column-gap: 30px;
}
</style>
