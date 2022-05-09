<template>
  <PageContentWrapper>
    <ValidationObserver ref="form" v-slot="{ invalid }">
      <InputRow>
        <InputWithTitle>
          <template #title> Employee Selector </template>

          <template #input>
            <CustomSelect
              v-if="employees"
              :options="employees.data"
              select-by="id"
              :disabled="isAddNewEmployee"
              @input="selectEmployee"
            />
          </template>
        </InputWithTitle>

        <div class="buttons-area">
          <DefaultButton
            button-color-gamma="white"
            :disabled="isEditNewEmployee"
            @event="addNewEmployee"
          >
            Add new employee
          </DefaultButton>

          <DefaultButton
            button-color-gamma="white"
            :disabled="isAddNewEmployee"
            @event="editEmployee"
          >
            Edit employee
          </DefaultButton>

          <DefaultButton
            button-color-gamma="white"
            :disabled="!isAddNewEmployee && !isEditNewEmployee"
            @event="cancelAdd"
          >
            {{ isEditNewEmployee ? 'Cancel Edit' : 'Cancel Add' }}
          </DefaultButton>

          <DefaultButton
            button-color-gamma="white"
            :disabled="invalid"
            @event="accept"
          >
            Accept
          </DefaultButton>

          <DefaultButton
            button-color-gamma="white"
            :disabled="isAddNewEmployee"
            @event="deleteEmployee"
          >
            Delete employee
          </DefaultButton>
        </div>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Employee ID </template>

          <template #input>
            <CustomInput v-model="employee.id" :disabled="isAddNewEmployee" />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Employee First Name </template>

          <template #input>
            <CustomInput v-model="employee.firstName" rules="required" />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Employee Last Name </template>

          <template #input>
            <CustomInput v-model="employee.lastName" rules="required" />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Salary Base </template>

          <template #input>
            <CustomInput
              v-model.number="employee.salaryBase"
              rules="required|currency"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Salary Overtime </template>

          <template #input>
            <CustomInput
              v-model.number="employee.salaryOvertime"
              rules="required|currency"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> State Tax Code </template>

          <template #input>
            <CustomInput v-model="employee.stateTaxCode" rules="required" />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>Local Tax Code </template>

          <template #input>
            <CustomInput v-model="employee.localTaxCode" rules="required" />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Hourly </template>

          <template #input>
            <CustomRadioButton
              :is-active="employee.isHourly"
              @set-is-active="setEmployeeHourly"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Exempt </template>

          <template #input>
            <CustomRadioButton
              :is-active="employee.isExempt"
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
              :is-active="employee.isProdEligible"
              @set-is-active="setEmployeeProdEligible"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Active </template>

          <template #input>
            <CustomRadioButton
              :is-active="employee.isActive"
              @set-is-active="setEmployeeActive"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputWithTitle v-if="isAddNewEmployee">
        <template #title> Employee Unit </template>

        <template #input>
          <CustomSelect
            v-if="units"
            multi-select
            :options="units.data"
            @input="selectEmployeeUnit"
          />
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

            <CustomRadioButton :is-is-active="unit.isActive" />

            {{ unit.unitName }}
          </CustomTableRow>
        </template>
      </CustomTable>
    </ValidationObserver>
  </PageContentWrapper>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import Employees from '../graphql/queries/employees.gql'
import Units from '../graphql/queries/units.gql'
import CreateEmployee from '../graphql/mutations/employee/createEmployee.gql'
import UpdateEmployee from '../graphql/mutations/employee/updateEmployee.gql'
import DeleteEmployee from '../graphql/mutations/employee/deleteEmployee.gql'
import PageContentWrapper from './PageContentWrapper.vue'
import InputRow from './InputRow.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomSelect from './CustomSelect.vue'
import { mutationMixin } from '~/mixins/mutationMixin'
export default {
  name: 'HQEmployeeContent',
  components: {
    ValidationObserver,
    PageContentWrapper,
    InputRow,
    InputWithTitle,
    CustomSelect,
  },
  mixins: [mutationMixin],
  apollo: {
    employees: {
      query: Employees,
    },
    units: {
      query: Units,
    },
  },
  data() {
    return {
      employee: {
        ...this.initialStateEmployee(),
      },
      isAddNewEmployee: false,
      isEditNewEmployee: false,
    }
  },
  methods: {
    initialStateEmployee() {
      return {
        id: '',
        firstName: '',
        lastName: '',
        salaryBase: '',
        salaryOvertime: '',
        stateTaxCode: '',
        isHourly: false,
        isExempt: false,
        isProdEligible: false,
        isActive: false,
        localTaxCode: '',
        units: [],
      }
    },
    selectEmployee(item) {
      if (item) {
        this.employee = item
      }
    },
    async addNewEmployee() {
      await this.$apollo.query({
        query: Units,
      })
      this.isAddNewEmployee = true
      this.employee = this.initialStateEmployee()
    },
    editEmployee() {
      this.isEditNewEmployee = true
    },
    async accept() {
      const { id, units, __typename, updatedAt, createdAt, ...employeeInput } =
        this.employee
      this.isAddNewEmployee
        ? await this.mutationAction(
            CreateEmployee,
            {
              employeeInput,
            },
            Employees,
            'Add employee success',
            'Add employee error'
          )
        : await this.mutationAction(
            UpdateEmployee,
            {
              employeeInput: {
                id,
                ...employeeInput,
              },
            },
            Employees,
            'Update employee success',
            'Update employee error'
          )
    },
    cancelAdd() {
      this.employee = {
        ...this.employees.data[0],
        units: [],
      }
      this.isAddNewEmployee
        ? (this.isAddNewEmployee = false)
        : (this.isEditNewEmployee = false)
    },
    setEmployeeHourly() {
      this.employee.isHourly = !this.employee.isHourly
    },
    setEmployeeExempt() {
      this.employee.isExempt = !this.employee.isExempt
    },
    setEmployeeProdEligible() {
      this.employee.isProdEligible = !this.employee.isProdEligible
    },
    setEmployeeActive() {
      this.employee.isActive = !this.employee.isActive
    },
    selectEmployeeUnit(unit) {
      this.employee.units = [...this.employee.units, unit]
    },
    deleteEmployee() {
      this.mutationAction(
        DeleteEmployee,
        { id: this.employee.id },
        Employees,
        'Delete employee success',
        'Delete employee error'
      )
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
