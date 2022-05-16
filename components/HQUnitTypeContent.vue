<template>
  <PageContentWrapper>
    <div class="header">
      <div>
        <InputRow class="input-row">
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

        <InputRow v-if="unit.unitType" class="input-row">
          <InputWithTitle>
            <template #title> Unit Type ID </template>

            <template #input>
              <span>{{ unit.unitType.id }}</span>
            </template>
          </InputWithTitle>

          <InputWithTitle>
            <template #title> Unit Type Name </template>

            <template #input>
              <span>{{ unit.unitType.name }}</span>
            </template>
          </InputWithTitle>
        </InputRow>
        <span v-else>Unit Type has not been assigned to unit yet</span>
      </div>

      <ValidationObserver ref="form">
        <h2>Create Unit Type</h2>

        <CustomTable class="table">
          <template #header>
            <div class="table-row">
              <span>ID</span>

              <span>Name</span>
            </div>
          </template>

          <template v-if="unitTypes" #content>
            <CustomTableRow
              v-for="unitType in unitTypes.data"
              :key="unitType.id"
              class="table-row"
            >
              <span>{{ unitType.id }}</span>

              <CustomInput
                v-if="isEdit === unitType.id"
                v-model="unitType.name"
                rules="required|alpha"
                do-not-show-error-message
              />
              <span v-else>{{ unitType.name }}</span>

              <CustomTableIconsColumn
                :is-edit-active="isEdit === unitType.id"
                :is-delete-active="isDelete === unitType.id"
                @edit="edit(unitType.id)"
                @delete="deleteItem(unitType.id)"
                @cancel="cancelUnitTypeEdit"
                @cancel-delete="cancelDelete"
                @confirm-edit="confirmEdit(unitType)"
                @confirm-delete="confirmDelete(unitType.id)"
              />
            </CustomTableRow>

            <CustomTableRow v-if="isAdd" class="table-row">
              <span>-</span>

              <CustomInput
                v-model="unitTypeNew.name"
                rules="required"
                do-not-show-error-message
              />
            </CustomTableRow>

            <CustomTableRow class="table-row add-row">
              <CustomTableAddIcon :is-hide="isHide" @add-row="addRow" />
            </CustomTableRow>
          </template>
        </CustomTable>

        <div v-if="isAdd" class="buttons-area">
          <DefaultButton @event="addUnitType"> Add UnitType </DefaultButton>

          <DefaultButton @event="cancelAdd"> Cancel </DefaultButton>
        </div>
      </ValidationObserver>
    </div>

    <CustomTable v-if="unitTypesCopy" class="unit-types-table">
      <template #header>
        <div class="table-row table-row--unit-types">
          <span> UnitType ID </span>

          <span> UnitType Name </span>
        </div>
      </template>

      <template #content>
        <CustomTableRow
          v-for="unitType in unitTypesCopy"
          :key="unitType.id"
          class="table-row table-row--unit-types"
        >
          <span>
            {{ unitType.id }}
          </span>

          <span>
            {{ unitType.name }}
          </span>

          <DefaultButton
            @event="
              unit.unitType && unit.unitType.id === unitType.id
                ? removeUnitTypeFromUnit()
                : addUnitTypeToUnit(unitType)
            "
          >
            {{
              unit.unitType && unit.unitType.id === unitType.id
                ? 'Remove Unit Type From Unit'
                : 'Add Unit Type to Unit'
            }}
          </DefaultButton>
        </CustomTableRow>
      </template>
    </CustomTable>
  </PageContentWrapper>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import UnitTypes from '../graphql/queries/unitTypes.gql'
import Units from '../graphql/queries/units.gql'
import UpdateUnit from '../graphql/mutations/unit/updateUnit.gql'
import CreateUnitType from '../graphql/mutations/unitType/createUnitType.gql'
import DeleteUnitType from '../graphql/mutations/unitType/deleteUnitType.gql'
import UpdateUnitType from '../graphql/mutations/unitType/updateUnitType.gql'
import PageContentWrapper from './PageContentWrapper.vue'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
import CustomInput from './CustomInput.vue'
import CustomTableAddIcon from './CustomTableAddIcon.vue'
import { mutationMixin } from '~/mixins/mutationMixin'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
export default {
  name: 'HQUnitTypeContent',
  components: {
    PageContentWrapper,
    ValidationObserver,
    CustomTable,
    CustomTableRow,
    CustomInput,
    CustomTableAddIcon,
  },
  mixins: [mutationMixin, tableActionsMixin],
  apollo: {
    units: {
      query: Units,
    },
    unitTypes: {
      query: UnitTypes,
    },
  },
  data() {
    return {
      unit: '',
      unitTypeNew: {
        name: '',
      },
      unitTypesCopy: [],
    }
  },
  async mounted() {
    const {
      data: {
        unitTypes: { data },
      },
    } = await this.$apollo.query({
      query: UnitTypes,
      fetchPolicy: 'no-cache',
    })

    this.unitTypesCopy = data
  },
  destroyed() {
    this.unitTypes.data = this.unitTypesCopy
  },
  methods: {
    selectUnit(item) {
      this.unit = item
    },
    async addUnitType() {
      const unit = this.unit
      await this.mutationAction(
        CreateUnitType,
        {
          unitTypeInput: {
            name: this.unitTypeNew.name,
          },
        },
        UnitTypes,
        'Add unitType success',
        'Add unitType error'
      )
      this.unit = unit
    },
    async confirmEdit(unitType) {
      const unit = this.unit
      const editedUnitType = {
        id: unitType.id,
        name: unitType.name,
      }

      await this.mutationAction(
        UpdateUnitType,
        {
          unitTypeInput: editedUnitType,
        },
        UnitTypes,
        'Add unitType success',
        'Add unitType error'
      )
      this.unit = unit
    },
    async confirmDelete(id) {
      const unit = this.unit

      await this.mutationAction(
        DeleteUnitType,
        { id },
        UnitTypes,
        'Delete unitType success',
        'Delete unitType error'
      )
      this.unit = unit
    },
    async addUnitTypeToUnit(unitType) {
      const unit = this.unit
      const unitTypesCopy = this.unitTypesCopy
      const { id } = this.unit

      await this.mutationAction(
        UpdateUnit,
        {
          unitInput: {
            id,
            unitType: {
              connect: Number(unitType.id),
            },
          },
        },
        Units,
        'Add Unit Type to unit success',
        'Add Unit Type to unit error'
      )

      this.unitTypesCopy = unitTypesCopy

      this.unit = unit
    },
    async removeUnitTypeFromUnit() {
      const unit = this.unit
      const { id } = this.unit

      await this.mutationAction(
        UpdateUnit,
        {
          unitInput: {
            id,
            unitType: {
              connect: 0,
            },
          },
        },
        Units,
        'Remove Unit Type from unit success',
        'Remove Unit Type from unit error'
      )

      this.unit = unit
    },
    cancelUnitTypeEdit() {
      this.unitTypes.data = this.unitTypesCopy
      this.cancelEdit()
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  @media screen and(max-width: $xl) {
    flex-direction: column;
  }
}

.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: 100px 200px 60px;
  column-gap: 30px;

  &--unit-types {
    grid-template-columns: 100px 200px 150px;
  }
}

.unit-types-table {
  margin-top: 50px;
}

.icon {
  cursor: pointer;

  &--add {
    grid-column: 3;
    justify-self: end;
  }
}
</style>
