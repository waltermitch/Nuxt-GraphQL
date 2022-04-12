<template>
  <PageContentWrapper>
    <InputRow>
      <InputWithTitle>
        <template #title> Unit </template>

        <template #input>
          <CustomSelect :options="units" @input="selectUnit" />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title> Name </template>

        <template #input>
          <CustomInput v-model="unit.unitName" />
        </template>
      </InputWithTitle>
    </InputRow>

    <CustomTable class="table">
      <template #header>
        <div class="table-row">
          <span> Employee ID </span>

          <span> Active </span>

          <span class="merged-column">Employee Name</span>
        </div>
      </template>

      <template #content>
        <CustomTableRow
          v-for="employee in employees"
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
import PageContentWrapper from './PageContentWrapper.vue'
export default {
  name: 'HQEmployeeToUnitContent',
  components: {
    PageContentWrapper,
  },
  data() {
    return {
      unit: '',
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
.table {
  width: fit-content;
}

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
