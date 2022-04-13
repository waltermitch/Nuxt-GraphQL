<template>
  <PageContentWrapper>
    <CustomTable class="table">
      <template #header>
        <div class="table-row">
          <span>Unit</span>

          <span>Name</span>

          <span>PeriodEnd</span>

          <span>Open</span>
        </div>
      </template>

      <template #content>
        <CustomTableRow
          v-for="status in unitPeriodStatus"
          :key="status.id"
          class="table-row"
        >
          <span>
            {{ status.unit }}
          </span>

          <span>
            {{ status.name }}
          </span>

          <span>
            {{ status.periodEnd }}
          </span>

          <CustomRadioButton :is-active="status.open" />
        </CustomTableRow>
      </template>
    </CustomTable>
  </PageContentWrapper>
</template>

<script>
export default {
  name: 'HQUnitPeriodStatusContent',
  data() {
    return {
      unitPeriodStatus: [
        {
          id: 0,
          unit: 277,
          name: 'Suez USA',
          periodEnd: '1/4/2020 11:59:00 PM',
          open: true,
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
  grid-template-columns: 80px repeat(2, 300px) 80px;
  column-gap: 30px;
}
</style>
