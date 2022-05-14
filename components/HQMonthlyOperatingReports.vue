<template>
  <PageContentWrapper>
    <ValidationObserver>
      <InputRow>
        <InputWithTitle>
          <template #title> Report Type </template>

          <template #input>
            <CustomSelect :options="reportTypes" @input="selectReportType" />
          </template>
        </InputWithTitle>

        <DefaultButton
          :disabled="!reportType || !selectedUnit || !periodEndDate"
          @event="openReport"
        >
          Open Report
        </DefaultButton>
      </InputRow>

      <CustomTablesArea>
        <CustomTable>
          <template #header>
            <div class="table-row">
              <span>Unit Id</span>

              <span>Unit Name</span>
            </div>
          </template>

          <template #content>
            <CustomTableContent>
              <CustomTableRow
                v-for="unit in units"
                :key="unit.id"
                class="table-row"
                :is-active="unit.id === selectedUnit.id"
                selectable
                @event="selectUnit(unit)"
              >
                <span>{{ unit.id }}</span>

                <span>{{ unit.name }}</span>
              </CustomTableRow>
            </CustomTableContent>
          </template>
        </CustomTable>

        <CustomTable>
          <template #header>
            <div>
              <span>Period End date</span>
            </div>
          </template>

          <template #content>
            <CustomTableContent>
              <CustomTableRow
                v-for="period in periodEndDates"
                :key="period.id"
                :is-active="period.id === periodEndDate.id"
                selectable
                @event="selectPeriodEndDate(period)"
              >
                <span>{{ period.name }}</span>
              </CustomTableRow>
            </CustomTableContent>
          </template>
        </CustomTable>
      </CustomTablesArea>
    </ValidationObserver>
  </PageContentWrapper>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { MonthlyReportsTypes } from '../constants/reportTypes'
import PageContentWrapper from './PageContentWrapper.vue'
import InputRow from './InputRow.vue'
import CustomTableContent from './CustomTableContent.vue'
import CustomTableRow from './CustomTableRow.vue'
import DefaultButton from './DefaultButton.vue'
import CustomTablesArea from './CustomTablesArea.vue'
export default {
  name: 'HQMonthlyOperatingReports',
  components: {
    PageContentWrapper,
    ValidationObserver,
    InputRow,
    CustomTableContent,
    CustomTableRow,
    DefaultButton,
    CustomTablesArea,
  },
  data() {
    return {
      reportType: '',
      reportTypes: MonthlyReportsTypes,
      selectedUnit: '',
      units: [
        {
          id: 0,
          unitId: 101,
          name: 'Unit Name 1',
        },
        {
          id: 1,
          unitId: 102,
          name: 'Unit Name 2',
        },
      ],
      periodEndDate: '',
      periodEndDates: [
        {
          id: 0,
          name: '12/28/19',
          value: '12/28/19',
        },
        {
          id: 1,
          name: '01/04/20',
          value: '01/04/20',
        },
      ],
    }
  },
  methods: {
    selectReportType(item) {
      this.reportType = item
    },
    selectUnit(item) {
      this.selectedUnit = item
    },
    selectPeriodEndDate(item) {
      this.periodEndDate = item
    },
    openReport() {
      console.log(this.selectedUnit, this.periodEndDate, this.reportType)
    },
  },
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: 100px 300px;
  column-gap: 20px;
}
</style>
