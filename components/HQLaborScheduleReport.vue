<template>
  <PageContentWrapper>
    <ValidationObserver ref="form">
      <InputRow>
        <InputWithTitle>
          <template #title> Period End date </template>

          <template #input>
            <CustomSelect
              :options="periodEndDates"
              @input="selectPeriodEndDate"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <CustomTable>
        <template #header>
          <div class="table-row">
            <span>Select</span>

            <span>Unit</span>

            <span>Unit Name</span>
          </div>
        </template>

        <template #content>
          <CustomTableRow
            v-for="unit in units"
            :key="unit.id"
            class="table-row"
          >
            <CustomRadioButton
              :is-active="unit.selected"
              @set-is-active="selectUnit(unit)"
            />

            <span>{{ unit.unitId }}</span>

            <span>{{ unit.name }}</span>
          </CustomTableRow>

          <CustomTableRow class="table-row footer-row">
            <DefaultButton @event="selectAllUnits"> Select All </DefaultButton>

            <DefaultButton @event="selectNone"> Select None </DefaultButton>

            <DefaultButton @event="openReport"> Open Report </DefaultButton>
          </CustomTableRow>
        </template>
      </CustomTable>
    </ValidationObserver>
  </PageContentWrapper>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import PageContentWrapper from './PageContentWrapper.vue'
import InputRow from './InputRow.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomSelect from './CustomSelect.vue'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
import CustomRadioButton from './CustomRadioButton.vue'
export default {
  name: 'HQLaborScheduleReport',
  components: {
    PageContentWrapper,
    ValidationObserver,
    InputRow,
    InputWithTitle,
    CustomSelect,
    CustomTable,
    CustomTableRow,
    CustomRadioButton,
  },
  data() {
    return {
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
    }
  },
  computed: {
    selectedUnits() {
      return this.units.filter((unit) => unit.selected)
    },
  },
  methods: {
    selectPeriodEndDate(item) {
      this.periodEndDate = item
    },
    selectUnit(item) {
      this.units = this.units.map((unit) => {
        if (item.id === unit.id) {
          return {
            ...unit,
            selected: !unit.selected,
          }
        }

        return unit
      })
    },
    selectAllUnits() {
      this.units = this.units.map((unit) => ({
        ...unit,
        selected: true,
      }))
    },
    selectNone() {
      this.units = this.units.map((unit) => ({
        ...unit,
        selected: false,
      }))
    },
    openReport() {
      console.log(this.selectedUnits)
    },
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
  grid-template-columns: 50px 100px 300px;
  column-gap: 20px;
}

.footer-row {
  grid-template-columns: repeat(3, 150px);
}
</style>
