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
        <CustomTable class="table-operating">
          <template #header>
            <div class="table-row">
              <span>Unit Id</span>

              <span>Unit Name</span>
            </div>
          </template>

          <template v-if="units" #content>
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

        <CustomTable class="table-operating">
          <template #header>
            <div>
              <span>Period End date</span>
            </div>
          </template>

          <template v-if="periods" #content>
            <CustomTableContent>
              <CustomTableRow
                v-for="period in periods"
                :key="period.id"
                :is-active="period.id === periodEndDate.id"
                selectable
                @event="selectPeriodEndDate(period)"
              >
                <span>{{ period.periodEnd }}</span>
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
import { WeeklyReportsTypes } from '../constants/reportTypes'
import PageContentWrapper from './PageContentWrapper.vue'
import InputRow from './InputRow.vue'
import CustomTableContent from './CustomTableContent.vue'
import CustomTableRow from './CustomTableRow.vue'
import DefaultButton from './DefaultButton.vue'
import Units from '~/graphql/queries/units.gql'
import Periods from '~/graphql/queries/periods.gql'
import { mutationMixin } from '~/mixins/mutationMixin'
import OperatingReport from '~/graphql/mutations/reports/operatingReport.gql'
export default {
  name: 'HQWeeklyOperatingReports',
  components: {
    PageContentWrapper,
    ValidationObserver,
    InputRow,
    CustomTableContent,
    CustomTableRow,
    DefaultButton,
  },
  apollo: {
    units: {
      query: Units,
    },
    periods: {
      query: Periods,
      variables: {
        hasUnits: true,
      },
    },
  },
  mixins: [mutationMixin],
  data() {
    return {
      reportType: '',
      reportTypes: WeeklyReportsTypes,
      selectedUnit: '',
      periodEndDate: '',
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
    async openReport() {
      const {
        data: { operatingReport },
      } = await this.mutationAction(
        OperatingReport,
        {
          input: {
            period: this.periodEndDate.id,
            unit: this.selectedUnit.id,
            type: this.reportType.type,
            typePeriod: this.reportType.typePeriod,
          },
        },
        Units,
        'Open Report Success'
      )

      window.open(operatingReport)
    },
  },
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  column-gap: 20px;
  @media screen and(min-width: $xs) {
    grid-template-columns: 100px 300px;
  }
  @media screen and(max-width: $md) {
    grid-template-columns: 60px 120px;
  }
}
.table-operating {
  @media screen and(max-width: $xl) {
    width: 100% !important;
    &:last-child {
      margin-bottom: 20px;
    }
    &:first-child {
      margin-right: 0 !important;
    }
  }
}
</style>
