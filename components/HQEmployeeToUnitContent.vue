<template>
  <PageContentWrapper>
    <InputRow>
      <InputWithTitle>
        <template #title> Unit </template>

        <template #input>
          <CustomSelect
            v-if="units"
            :options="units.data"
            select-by="code"
            @input="selectUnit"
          />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title> Name </template>

        <template #input>
          <CustomInput v-model="unit.name" />
        </template>
      </InputWithTitle>
    </InputRow>

    <CustomTable v-if="employees" class="table">
      <template #header>
        <div class="table-row">
          <span> Employee ID </span>

          <span> Active </span>

          <span class="merged-column">Employee Name</span>
        </div>
      </template>

      <template #content>
        <CustomTableRow
          v-for="employee in employees.data"
          :key="employee.id"
          class="table-row"
        >
          <span>
            {{ employee.id }}
          </span>

          <CustomRadioButton
            :is-active="employee.active"
            @set-is-active="setIsEmployeeActive(employee.id)"
          />

          <span>
            {{ employee.firstName }}
          </span>

          <span>
            {{ employee.lastName }}
          </span>
        </CustomTableRow>
      </template>
    </CustomTable>
  </PageContentWrapper>
</template>

<script>
import Employees from '../graphql/queries/employees.gql'
import Units from '../graphql/queries/units.gql'
import PageContentWrapper from './PageContentWrapper.vue'
export default {
  name: 'HQEmployeeToUnitContent',
  components: {
    PageContentWrapper,
  },
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
      unit: '',
    }
  },
  methods: {
    selectUnit(item) {
      this.unit = item
    },
    setIsEmployeeActive(employeeID) {
      this.employees = this.employees.map((employee) => {
        if (employee.id === employeeID) {
          return {
            ...employee,
            active: !employee.active,
          }
        }

        return employee
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: 150px 80px repeat(2, 200px);
}

.merged-column {
  grid-column: 3 / 5;
  justify-self: center;
}
</style>
