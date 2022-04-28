<template>
  <PageContentWrapper>
    <ValidationObserver ref="form">
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
            />
            <span v-else>{{ unitType.name }}</span>

            <CustomTableIconsColumn
              :is-edit-active="isEdit === unitType.id"
              :is-delete-active="isDelete === unitType.id"
              @edit="edit(unitType.id)"
              @delete="deleteItem(unitType.id)"
              @cancel="cancelEdit"
              @cancel-delete="cancelDelete"
              @confirm-edit="confirmEdit(unitType)"
              @confirm-delete="confirmDelete(unitType.id)"
            />
          </CustomTableRow>

          <CustomTableRow v-if="isAdd" class="table-row">
            <span>-</span>

            <CustomInput v-model="unitTypeNew.name" rules="required" />
          </CustomTableRow>

          <CustomTableRow class="table-row add-row">
            <img
              src="~assets/images/icons/home/add.svg"
              class="icon icon--add"
              @click="addRow"
            />
          </CustomTableRow>
        </template>
      </CustomTable>
    </ValidationObserver>

    <div v-if="isAdd" class="buttons-area">
      <DefaultButton @event="addUnitType"> Add UnitType </DefaultButton>

      <DefaultButton @event="cancelAdd"> Cancel </DefaultButton>
    </div>
  </PageContentWrapper>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import UnitTypes from '../graphql/queries/unitTypes.gql'
import CreateUnitType from '../graphql/mutations/unitType/createUnitType.gql'
import DeleteUnitType from '../graphql/mutations/unitType/deleteUnitType.gql'
import UpdateUnitType from '../graphql/mutations/unitType/updateUnitType.gql'
import PageContentWrapper from './PageContentWrapper.vue'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
import CustomInput from './CustomInput.vue'
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
  },
  mixins: [mutationMixin, tableActionsMixin],
  apollo: {
    unitTypes: {
      query: UnitTypes,
    },
  },
  data() {
    return {
      unitTypeNew: {
        name: '',
      },
    }
  },
  methods: {
    addUnitType() {
      this.mutationAction(
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
    },
    confirmEdit(unitType) {
      const editedUnitType = {
        id: unitType.id,
        name: unitType.name,
      }

      this.mutationAction(
        UpdateUnitType,
        {
          unitTypeInput: editedUnitType,
        },
        UnitTypes,
        'Add unitType success',
        'Add unitType error'
      )
    },
    confirmDelete(id) {
      this.mutationAction(
        DeleteUnitType,
        { id },
        UnitTypes,
        'Delete unitType success',
        'Delete unitType error'
      )
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
  grid-template-columns: 100px 300px 60px;
  column-gap: 30px;
}

.icon {
  cursor: pointer;

  &--add {
    grid-column: 3;
    justify-self: end;
  }
}
</style>
