<template>
  <PageContentWrapper>
    <div class="input">
      <InputWithTitle>
        <template #title>Period End Date</template>

        <template #input>
          <CustomSelect :options="mockedData" @input="selectPeriodEndDate" />
        </template>
      </InputWithTitle>
    </div>

    <div class="tables-area">
      <div class="table-column">
        <span class="table-header">Units Reporting In</span>

        <CustomTable>
          <template #header>
            <div class="table-row">
              <span>Unit</span>
            </div>
          </template>

          <template #content>
            <CustomTableRow
              v-for="unit in unitsReportingIn"
              :key="unit.id"
              class="table-row"
            >
              <span>{{ unit.unit }}</span>
            </CustomTableRow>
          </template>
        </CustomTable>
      </div>

      <div class="table-column">
        <span class="table-header">Units Not Yet Reporting</span>

        <CustomTable>
          <template #header>
            <div class="table-row table-row--two">
              <span>Unit</span>

              <span>Date</span>
            </div>
          </template>

          <template #content>
            <CustomTableRow
              v-for="unit in unitsNotYetReporting"
              :key="unit.id"
              class="table-row table-row--two"
            >
              <span>
                {{ unit.unit }}
              </span>

              <span>
                {{ unit.date }}
              </span>
            </CustomTableRow>
          </template>
        </CustomTable>
      </div>
    </div>

    <div class="buttons-area">
      <DefaultButton button-color-gamma="red" @event="sendUnitsUpdate">
        Send units update
      </DefaultButton>
    </div>
  </PageContentWrapper>
</template>

<script>
import PageContentWrapper from './PageContentWrapper.vue'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
export default {
  name: 'HQUnitsReportingContent',
  components: {
    PageContentWrapper,
    CustomTable,
    CustomTableRow,
  },
  data() {
    return {
      periodEndDate: '',
      mockedData: [
        {
          id: 1,
          value: '4/22/2022',
          name: '4/22/2022',
        },
      ],
      unitsReportingIn: [
        {
          id: 1,
          unit: 107,
        },
        {
          id: 2,
          unit: 109,
        },
      ],
      unitsNotYetReporting: [
        {
          id: 1,
          unit: 101,
          date: '8/4/2012 11:59:00 PM',
        },
        {
          id: 2,
          unit: 102,
          date: '9/5/2012 11:59:00 PM',
        },
      ],
    }
  },
  methods: {
    selectPeriodEndDate(item) {
      this.selectPeriodEndDate = item
    },
    sendUnitsUpdate() {
      return null
    },
  },
}
</script>

<style lang="scss" scoped>
.tables-area {
  display: flex;
  width: 100%;
}

.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: 100px;

  &--two {
    grid-template-columns: 100px 300px;
  }
}

.input {
  margin-bottom: 30px;
}

.buttons-area {
  margin-top: 32px;
}

.table-column {
  width: 100%;

  &:last-child {
    margin-left: 60px;
  }
}

.table-header {
  display: block;
  margin-bottom: 20px;
}
</style>
