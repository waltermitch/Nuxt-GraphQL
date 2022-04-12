<template>
  <PageContentWrapper>
    <InputRow>
      <InputWithTitle>
        <template #title> Employee Selector </template>

        <template #input>
          <CustomSelect
            :options="employees"
            select-by="employeeID"
            :disabled="isAddNewEmployee"
            @input="selectEmployee"
          />
        </template>
      </InputWithTitle>

      <div class="buttons-area">
        <DefaultButton button-color-gamma="white" @event="addNewEmployee">
          Add new employee
        </DefaultButton>

        <DefaultButton
          button-color-gamma="white"
          :disabled="!isAddNewEmployee"
          @event="cancelAdd"
        >
          Cancel Add
        </DefaultButton>

        <DefaultButton button-color-gamma="white" @event="accept">
          Accept
        </DefaultButton>
      </div>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title> Employee ID </template>

        <template #input>
          <CustomInput v-model="employee.employeeID" />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title> Employee First Name </template>

        <template #input>
          <CustomInput v-model="employee.firstName" />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title> Employee Last Name </template>

        <template #input>
          <CustomInput v-model="employee.lastName" />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title> Salary Base </template>

        <template #input>
          <CustomInput v-model="employee.salaryBase" rules="currency" />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title> Salary Overtime </template>

        <template #input>
          <CustomInput v-model="employee.salaryOverTie" rules="currency" />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title> State Tax Code </template>

        <template #input>
          <CustomInput v-model="employee.stateTaxCode" />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Local Tax Code </template>

        <template #input>
          <CustomInput v-model="employee.localTaxCode" />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title> Hourly </template>

        <template #input>
          <CustomRadioButton
            :is-active="employee.hourly"
            @set-is-active="setEmployeeHourly"
          />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title> Exempt </template>

        <template #input>
          <CustomRadioButton
            :is-active="employee.exempt"
            @set-is-active="setEmployeeExempt"
          />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title> Prod Eligible </template>

        <template #input>
          <CustomRadioButton
            :is-active="employee.prodEligible"
            @set-is-active="setEmployeeProdEligible"
          />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title> Active </template>

        <template #input>
          <CustomRadioButton
            :is-active="employee.active"
            @set-is-active="setEmployeeActive"
          />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputWithTitle v-if="isAddNewEmployee">
      <template #title> Employee Unit </template>

      <template #input>
        <CustomSelect :options="units" @input="selectEmployeeUnit" />
      </template>
    </InputWithTitle>

    <CustomTable v-else class="table">
      <template #header>
        <div class="table-row">
          <span>Unit</span>

          <span>Active</span>

          <span>Unit Name</span>
        </div>
      </template>

      <template #content>
        <CustomTableRow
          v-for="unit in employee.units"
          :key="unit.id"
          class="table-row"
        >
          {{ unit.unitID }}

          <CustomRadioButton :is-active="unit.active" />

          {{ unit.unitName }}
        </CustomTableRow>
      </template>
    </CustomTable>
  </PageContentWrapper>
</template>

<script>
import PageContentWrapper from './PageContentWrapper.vue'
import InputRow from './InputRow.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomSelect from './CustomSelect.vue'
export default {
  name: 'HQEmployeeContent',
  components: {
    PageContentWrapper,
    InputRow,
    InputWithTitle,
    CustomSelect,
  },
  data() {
    return {
      employee: {
        ...this.initialStateEmployee(),
      },
      isAddNewEmployee: false,
      employees: [
        {
          id: 0,
          employeeID: 1309,
          firstName: 'Name',
          lastName: 'LastName',
          salaryBase: '$15.00',
          salaryOverTie: '$22.50',
          stateTaxCode: 'VA',
          hourly: true,
          exempt: false,
          prodEligible: false,
          active: true,
          localTaxCode: '',
          units: [
            {
              id: 0,
              unitID: 178,
              active: true,
              unitName: 'Version',
            },
          ],
        },
        {
          id: 1,
          employeeID: 1311,
          firstName: 'Name1',
          lastName: 'LastName1',
          salaryBase: '$15.00',
          salaryOverTie: '$22.50',
          stateTaxCode: 'VA',
          hourly: true,
          exempt: false,
          prodEligible: false,
          active: true,
          localTaxCode: '',
          units: [
            {
              id: 0,
              unitID: 178,
              active: true,
              unitName: 'Version',
            },
          ],
        },
      ],
      units: [
        {
          id: 0,
          value: '101',
          name: '101',
          unitName: 'Drinker',
        },
        {
          id: 1,
          value: '102',
          name: '102',
          unitName: 'Biddle',
        },
      ],
    }
  },
  methods: {
    initialStateEmployee() {
      return {
        id: '',
        employeeID: '',
        firstName: '',
        lastName: '',
        salaryBase: '',
        salaryOverTie: '',
        stateTaxCode: '',
        hourly: false,
        exempt: false,
        prodEligible: false,
        active: false,
        localTaxCode: '',
        units: [],
      }
    },
    selectEmployee(item) {
      this.employee = item
    },
    addNewEmployee() {
      this.isAddNewEmployee = true
      this.employee = this.initialStateEmployee()
    },
    accept() {},
    cancelAdd() {
      this.isAddNewEmployee = false
    },
    setEmployeeHourly() {
      this.employee.hourly = !this.employee.hourly
    },
    setEmployeeExempt() {
      this.employee.exempt = !this.employee.exempt
    },
    setEmployeeProdEligible() {
      this.employee.prodEligible = !this.employee.prodEligible
    },
    setEmployeeActive() {
      this.employee.active = !this.employee.active
    },
    selectEmployeeUnit(unit) {
      this.employee.units = [unit]
    },
  },
}
</script>

<style lang="scss" scoped>
.buttons-area {
  display: flex;
  align-items: flex-end;

  button {
    margin-right: 10px;
  }
}

.table {
  width: fit-content;
}

.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: 100px 100px 300px;
}
</style>
