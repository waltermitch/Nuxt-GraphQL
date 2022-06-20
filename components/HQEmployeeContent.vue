<template>
  <PageContentWrapper>
    <LoadingBar v-if="$apollo.loading" />
    <ValidationObserver ref="form" v-slot="{ invalid }">
      <InputRow class="input-row-mob">
        <div class="buttons-area">
          <DefaultButton
            v-if="getAddEmployee"
            button-color-gamma="white"
            :disabled="invalid"
            @event="addNewEmployee"
          >
           + Add new employee
          </DefaultButton>

          <DefaultButton
            v-if="getEditEmployee"
            button-color-gamma="white"
            :disabled="invalid"
            @event="editEmployee"
          >
            Edit employee
          </DefaultButton>

          <DefaultButton @event="cancelEmployeeAction"> Cancel </DefaultButton>
        </div>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Employee First Name</template>

          <template #input>
            <CustomInput v-model="firstName" rules="required" />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Employee Last Name</template>

          <template #input>
            <CustomInput v-model="lastName" rules="required" />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Salary Base</template>

          <template #input>
            <CustomInput
              v-model.number="salaryBase"
              rules="required|currency"
              type="number"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Salary Overtime</template>

          <template #input>
            <CustomInput
              v-model.number="salaryOvertime"
              rules="required|currency"
              type="number"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> State Tax Code</template>

          <template #input>
            <CustomInput v-model="stateTaxCode" rules="required" />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>Local Tax Code</template>

          <template #input>
            <CustomInput v-model="localTaxCode" rules="required" />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Hourly</template>

          <template #input>
            <CustomRadioButton
              :is-active="isHourly"
              @set-is-active="setEmployeeHourly"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Exempt</template>

          <template #input>
            <CustomRadioButton
              :is-active="isExempt"
              @set-is-active="setEmployeeExempt"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Prod Eligible</template>

          <template #input>
            <CustomRadioButton
              :is-active="isProdEligible"
              @set-is-active="setEmployeeProdEligible"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Active</template>

          <template #input>
            <CustomRadioButton
              :is-active="isActive"
              @set-is-active="setEmployeeActive"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <CustomTable v-if="!getAddEmployee" class="table" :w-table="500">
        <template #header>
          <div class="table-row">
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
            <span>{{ unit.code }}</span>

            <span>{{ unit.name }}</span>

            <CustomTableIconsColumn
              :is-delete-active="isDelete === unit.id"
              :show-edit="false"
              @delete="deleteItem(unit.id)"
              @cancel-delete="cancelDelete"
              @confirm-delete="removeEmployeeFromUnit(unit.id)"
            />
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
import PageContentWrapper from './PageContentWrapper.vue'
import InputRow from './InputRow.vue'
import InputWithTitle from './InputWithTitle.vue'
import DefaultButton from './DefaultButton.vue'
import { mutationMixin } from '~/mixins/mutationMixin'
import { employeeMixin } from '~/mixins/employeeMixin'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'

export default {
  name: 'HQEmployeeContent',
  components: {
    ValidationObserver,
    PageContentWrapper,
    InputRow,
    InputWithTitle,
    DefaultButton,
  },
  mixins: [mutationMixin, employeeMixin, tableActionsMixin],
  apollo: {
    employees: {
      query: Employees,
    },
    units: {
      query: Units,
    },
  },
  computed: {
    id: {
      get() {
        return this.getEmployee.id
      },
      set(value) {
        this.$store.commit('employee/SET_ID', value)
      },
    },
    firstName: {
      get() {
        return this.getEmployee.firstName
      },
      set(value) {
        this.$store.commit('employee/SET_FIRST_NAME', value)
      },
    },
    lastName: {
      get() {
        return this.getEmployee.lastName
      },
      set(value) {
        this.$store.commit('employee/SET_LAST_NAME', value)
      },
    },
    salaryBase: {
      get() {
        return this.getEmployee.salaryBase
      },
      set(value) {
        this.$store.commit('employee/SET_SALARY_BASE', value)
      },
    },
    salaryOvertime: {
      get() {
        return this.getEmployee.salaryOvertime
      },
      set(value) {
        this.$store.commit('employee/SET_SALARY_OVERTIME', value)
      },
    },
    stateTaxCode: {
      get() {
        return this.getEmployee.stateTaxCode
      },
      set(value) {
        this.$store.commit('employee/SET_STATE_TAX_CODE', value)
      },
    },
    isHourly: {
      get() {
        return this.getEmployee.isHourly
      },
      set(value) {
        this.$store.commit('employee/SET_IS_HOURLY', value)
      },
    },
    isExempt: {
      get() {
        return this.getEmployee.isExempt
      },
      set(value) {
        this.$store.commit('employee/SET_IS_EXEMPT', value)
      },
    },
    isProdEligible: {
      get() {
        return this.getEmployee.isProdEligible
      },
      set(value) {
        this.$store.commit('employee/SET_IS_PROD_ELIGIBLE', value)
      },
    },
    isActive: {
      get() {
        return this.getEmployee.isActive
      },
      set(value) {
        this.$store.commit('employee/SET_IS_ACTIVE', value)
      },
    },
    localTaxCode: {
      get() {
        return this.getEmployee.localTaxCode
      },
      set(value) {
        this.$store.commit('employee/SET_LOCAL_TAX_CODE', value)
      },
    },
    units: {
      get() {
        return this.getEmployee.units
      },
      set(value) {
        this.$store.commit('employee/SET_UNITS', value)
      },
    },
  },
  destroyed() {
    this.clearAction()
  },
  methods: {
    cancelEmployeeAction() {
      this.getAddEmployee
        ? this.$store.commit('employee/SET_ADD_EMPLOYEE', false)
        : this.$store.commit('employee/SET_EDIT_EMPLOYEE', false)
    },
    async addNewEmployee() {
      const { id, ...employeeInput } = this.getEmployee
      const res = await this.mutationAction(
        CreateEmployee,
        {
          employeeInput,
        },
        Employees,
        'Add employee success',
        'Add employee error'
      )

      if (res) {
        this.clearAction()
      }
    },
    async editEmployee() {
      const { id, units, __typename, updatedAt, createdAt, ...employeeInput } =
        this.getEmployee

      const res = await this.mutationAction(
        UpdateEmployee,
        {
          employeeInput: {
            id,
            units: {
              sync: this.units.map((unit) => unit.id),
            },
            ...employeeInput,
          },
        },
        Employees,
        'Update employee success',
        'Update employee error'
      )

      if (res) {
        this.clearAction()
      }
    },
    async removeEmployeeFromUnit(unitId) {
      const { id, units, __typename, updatedAt, createdAt, ...employeeInput } =
        this.getEmployee

      const {
        data: { updateEmployee },
      } = await this.mutationAction(
        UpdateEmployee,
        {
          employeeInput: {
            id,
            units: {
              disconnect: [unitId],
            },
            ...employeeInput,
          },
        },
        Employees,
        'Update employee success',
        'Update employee error'
      )

      if (updateEmployee) {
        this.$store.commit('employee/SET_EMPLOYEE', updateEmployee)
      }
    },
    setEmployeeHourly() {
      this.isHourly = !this.getEmployee.isHourly
    },
    setEmployeeExempt() {
      this.isExempt = !this.getEmployee.isExempt
    },
    setEmployeeProdEligible() {
      this.isProdEligible = !this.getEmployee.isProdEligible
    },
    setEmployeeActive() {
      this.isActive = !this.getEmployee.isActive
    },
    selectEmployeeUnit(unit) {
      this.units = [...this.getEmployee.units, unit]
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

.input-row-mob {
  @media screen and (max-width: $md) {
    display: block;
  }

  .buttons-area {
    @media screen and (max-width: $md) {
      margin-top: 20px;
      overflow: auto;
      button {
        white-space: nowrap;
      }
    }
  }
}

.table-row {
  display: grid;
  align-items: center;
  @media screen and (min-width: $md) {
    grid-template-columns: 100px 300px auto;
  }
  @media screen and (max-width: $md) {
    grid-template-columns: 100px 120px auto;
  }
}
</style>
