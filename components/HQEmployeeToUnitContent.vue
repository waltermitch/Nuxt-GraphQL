<template>
  <PageContentWrapper>
    <InputRow>
      <InputWithTitle>
        <template #title> Unit </template>

        <template #input>
          <CustomSelect
            v-if="units"
            :options="units"
            select-by="name"
            select-by-second="code"
            @input="selectUnit"
          />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title> Name </template>

        <template #input>
          <CustomInput v-model="unit.name" readonly />
        </template>
      </InputWithTitle>
    </InputRow>

    <CustomTable v-if="employees" class="table" :w-table="470">
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
            v-if="unit.employees"
            :is-active="
              !!unit.employees.find((item) => item.id === employee.id)
            "
            @set-is-active="setIsEmployeeActive(employee)"
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
import UpdateUnit from '~/graphql/mutations/unit/updateUnit.gql'
import { mutationMixin } from '~/mixins/mutationMixin'
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
  mixins: [mutationMixin],
  data() {
    return {
      unit: '',
    }
  },
  methods: {
    selectUnit(item) {
      this.unit = item
    },
    setIsEmployeeActive(employee) {
      this.mutationAction(
        UpdateUnit,
        {
          unitInput: {
            id: this.unit.id,
            employees: {
              sync: this.unit.employees.some((item) => item.id === employee.id)
                ? this.unit.employees
                    .filter((item) => item.id !== employee.id)
                    .map((employee) => employee.id)
                : [...this.unit.employees, employee].map(
                    (employee) => employee.id
                  ),
            },
          },
        },
        Units,
        'Add employee to unit success',
        'Add employee to unit error'
      )

      this.$apollo.queries.employees.refetch()
    },
  },
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  @media screen and (min-width: $md) {
    grid-template-columns: 150px 80px repeat(2, 200px);
  }
  @media screen and (max-width: $md) {
    grid-template-columns: 120px 80px repeat(2, 120px);
  }
}

.merged-column {
  grid-column: 3 / 5;
  justify-self: center;
}
</style>
