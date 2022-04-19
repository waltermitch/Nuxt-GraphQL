<template>
  <PageContentWrapper>
    <InputRow>
      <InputWithTitle>
        <template #title> Report Type </template>

        <template #input>
          <CustomSelect :options="reportTypes" @input="selectReportType" />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title> Period End Date </template>

        <template #input>
          <CustomSelect
            :options="periodEndDates"
            @input="selectPeriodEndDate"
          />
        </template>
      </InputWithTitle>
    </InputRow>

    <DefaultButton @event="openReport"> Open Report </DefaultButton>
  </PageContentWrapper>
</template>

<script>
import { locationReportTypes } from '../constants/reportTypes'
import PageContentWrapper from './PageContentWrapper'
import InputRow from './InputRow.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomSelect from './CustomSelect.vue'
import DefaultButton from './DefaultButton.vue'
export default {
  name: 'OpenReportContent',
  components: {
    PageContentWrapper,
    InputRow,
    InputWithTitle,
    CustomSelect,
    DefaultButton,
  },
  data() {
    return {
      reportType: '',
      reportTypes: locationReportTypes,
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
    selectPeriodEndDate(item) {
      this.periodEndDate = item
    },
    openReport() {
      console.log(this.periodEndDate, this.reportType)
    },
  },
}
</script>

<style lang="scss" scoped></style>
