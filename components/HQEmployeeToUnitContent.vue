<template>
  <PageContentWrapper v-if="!getAddEmployee && !getEditEmployee">
    <InputRow>
      <InputWithTitle>
        <template #title> Unit </template>

        <template #input>
          <multiselect
            v-if="units"
            v-model="unit"
            :options="units"
            :custom-label="nameWithId"
            placeholder="Select one"
            track-by="name"
            :preselect-first="false"
            :show-labels="false"
          ></multiselect>
        </template>
      </InputWithTitle>

      <InputWithTitle v-if="unit">
        <template #title> Name </template>

        <template #input>
          <CustomInput v-model="unit.name" readonly disabled />
        </template>
      </InputWithTitle>
      <div class="input-inner">
        <DefaultButton style="margin-left: 15px" @event="setAddEmployee"
          >+ Add employee</DefaultButton>
      </div>
    </InputRow>

    <CustomTable v-if="employees" class="table" :w-table="470">
      <template #header>
        <div class="table-row">
          <span> Employee ID </span>

          <span> Active </span>

          <span>Employee Name</span>
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
          <span v-else></span>

          <span>
            {{ employee.firstName }}
          </span>

          <span>
            {{ employee.lastName }}
          </span>

          <CustomTableIconsColumn
            :is-delete-active="isDelete === employee.id"
            @edit="editEmployee(employee)"
            @delete="deleteItem(employee.id)"
            @cancel-delete="cancelDelete"
            @confirm-delete="deleteEmployee(employee.id)"
          />
        </CustomTableRow>
      </template>
    </CustomTable>
  </PageContentWrapper>
  <HQEmployeeContent v-else />
</template>

<script>
import Employees from '../graphql/queries/employees.gql'
import Units from '../graphql/queries/units.gql'
import DeleteEmployee from '../graphql/mutations/employee/deleteEmployee.gql'
import PageContentWrapper from './PageContentWrapper.vue'
import HQEmployeeContent from './HQEmployeeContent'
import CustomTableIconsColumn from './CustomTableIconsColumn'
import UpdateUnit from '~/graphql/mutations/unit/updateUnit.gql'
import { mutationMixin } from '~/mixins/mutationMixin'
import { multiselectMixin } from '~/mixins/multiselectMixin'
import { employeeMixin } from '~/mixins/employeeMixin'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'

export default {
  name: 'HQEmployeeToUnitContent',
  components: {
    PageContentWrapper,
    HQEmployeeContent,
    CustomTableIconsColumn,
  },
  apollo: {
    employees: {
      query: Employees,
    },
    units: {
      query: Units,
    },
  },
  mixins: [mutationMixin, multiselectMixin, tableActionsMixin, employeeMixin],
  data() {
    return {
      unit: '',
    }
  },
  methods: {
    setAddEmployee() {
      this.$store.commit('employee/SET_ADD_EMPLOYEE', true)
    },
    editEmployee(employee) {
      this.$store.commit('employee/SET_EDIT_EMPLOYEE', true)
      this.$store.commit('employee/SET_EMPLOYEE', employee)
    },
    async setIsEmployeeActive(employee) {
      const {
        data: { updateUnit },
      } = await this.mutationAction(
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
        Employees,
        'Add employee to unit success',
        'Add employee to unit error'
      )

      if (updateUnit) {
        this.unit = updateUnit
      }
    },
    async deleteEmployee(id) {
      const unit = this.unit
      const res = await this.mutationAction(
        DeleteEmployee,
        { id },
        Employees,
        'Delete employee success',
        'Delete employee error'
      )

      if (res) {
        this.unit = unit
      }
    },
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
.input {
  &-row--offset {
    display: flex;
    margin: 0 -15px;
  }

  &-col {
    min-width: 240px;
    padding: 0 15px;
  }
}

.input-row {
  align-items: flex-end;
}

.mb-20 {
  margin-bottom: 20px;
}

.multiselect__tags {
  border: 1px solid gainsboro;
  border-radius: 3px;
}

.multiselect__option {
  padding: 10px 16px 10px 8px;
  color: #000;
  font-size: 14px;
  background: #fff;
}

.multiselect__option--highlight,
.multiselect__option--highlight:after {
  color: #fff;
  background-color: #b01d22;
}
.multiselect__option--selected.multiselect__option--highlight {
  background: rgba(#b01d22, 0.6);
}

.multiselect__tag {
  background-color: #b01d22;
}

.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background-color: #b01d22;
}

.multiselect__tag-icon:after {
  color: #fff;
}

.multiselect__select:before {
  border: none;
  width: 24px;
  height: 24px;
  background: url(assets/images/icons/chevron-down.svg);
  display: block;
  top: 0;
}
</style>
<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  padding: 12px 0;
  @media screen and (min-width: $md) {
    grid-template-columns: 150px 80px repeat(2, 200px) auto;
  }
  @media screen and (max-width: $md) {
    grid-template-columns: 120px 80px repeat(2, 120px) auto;
  }
}

.row {
  padding: 6px 10px;

  span {
    min-height: 40px;
    display: flex;
    align-items: center;
  }
}

.merged-column {
  grid-column: 3 / 5;
  justify-self: center;
}
</style>
