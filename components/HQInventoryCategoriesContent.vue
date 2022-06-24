<template>
  <PageContentWrapper>
    <ValidationObserver ref="form">
      <LoadingBar v-if="$apollo.loading" />
      <CustomTable v-else :w-table="780">
        <template #header>
          <div class="table-row">
            <span> Name </span>

            <span> GL account </span>

            <span> Vending </span>
          </div>
        </template>

        <template v-if="inventoryCategories" #content>
          <CustomTableRow
            v-for="inventoryCategory in inventoryCategories"
            :key="inventoryCategory.id"
            class="table-row"
          >
            <CustomInput
              v-if="isEdit === inventoryCategory.id"
              v-model="inventoryCategoryEdit.type"
              rules="required"
              do-not-show-error-message
            />
            <span v-else>{{ inventoryCategory.type }}</span>

            <CustomInput
              v-if="isEdit === inventoryCategory.id"
              v-model="inventoryCategoryEdit.description"
              rules="required"
              do-not-show-error-message
            />
            <span v-else>{{ inventoryCategory.description }}</span>

            <CustomTableIconsColumn
              :is-edit-active="isEdit === inventoryCategory.id"
              :is-delete-active="isDelete === inventoryCategory.id"
              @edit="editInventoryCategory(inventoryCategory)"
              @delete="deleteItem(inventoryCategory.id)"
              @cancel="cancelInventoryCategoryEdit"
              @cancel-delete="cancelDelete"
              @confirm-edit="confirmEdit(inventoryCategory)"
              @confirm-delete="confirmDelete(inventoryCategory.id)"
            />
          </CustomTableRow>

          <CustomTableRow v-if="isAdd" class="table-row">
            <CustomInput
              v-model="inventoryCategoryNew.type"
              rules="required"
              do-not-show-error-message
            />

            <CustomInput
              v-model="inventoryCategoryNew.description"
              rules="required"
              do-not-show-error-message
            />
          </CustomTableRow>

          <CustomTableRow class="table-row add-row">
            <CustomTableAddIcon :is-hide="isHide" @add-row="addRow" />
          </CustomTableRow>
        </template>
      </CustomTable>
    </ValidationObserver>

    <div v-if="isAdd" class="buttons-area">
      <DefaultButton @event="addInventoryCategory">+ Add Inventory Category </DefaultButton>

      <DefaultButton @event="cancelAdd"> Cancel </DefaultButton>
    </div>
  </PageContentWrapper>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import InventoryCategories from '../graphql/queries/inventoryCategories.gql'
import CreateInventoryCategory from '../graphql/mutations/inventoryCategory/createInventoryCategory.gql'
import UpdateInventoryCategory from '../graphql/mutations/inventoryCategory/updateInventoryCategory.gql'
import DeleteInventoryCategory from '../graphql/mutations/inventoryCategory/deleteInventoryCategory.gql'
import PageContentWrapper from './PageContentWrapper.vue'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
import CustomInput from './CustomInput.vue'
import CustomTableAddIcon from './CustomTableAddIcon.vue'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
import { submitMessagesMixin } from '~/mixins/submitMessagesMixin'
import { formMixin } from '~/mixins/formMixin'
import { mutationMixin } from '~/mixins/mutationMixin'
export default {
  name: 'HQInventoryCategoriesContent',
  components: {
    ValidationObserver,
    PageContentWrapper,
    CustomTable,
    CustomTableRow,
    CustomInput,
    CustomTableAddIcon,
  },
  mixins: [submitMessagesMixin, formMixin, mutationMixin, tableActionsMixin],
  apollo: {
    inventoryCategories: {
      query: InventoryCategories,
    },
  },
  data() {
    return {
      inventoryCategoryNew: {
        type: '',
        description: '',
      },
      inventoryCategoryEdit: {},
    }
  },
  methods: {
    editInventoryCategory(inventoryCategory) {
      this.inventoryCategoryEdit = Object.assign({}, inventoryCategory)
      this.edit(inventoryCategory.id)
    },
    addInventoryCategory() {
      this.mutationAction(
        CreateInventoryCategory,
        {
          inventoryCategoryInput: {
            type: this.inventoryCategoryNew.type,
            description: this.inventoryCategoryNew.description,
          },
        },
        InventoryCategories,
        'Add inventory category success',
        'Add inventory category error'
      )
    },
    confirmEdit(inventoryCategory) {
      const editedInventoryCategory = {
        id: inventoryCategory.id,
        type: this.inventoryCategoryEdit.type,
        description: this.inventoryCategoryEdit.description,
      }

      this.mutationAction(
        UpdateInventoryCategory,
        {
          inventoryCategoryInput: editedInventoryCategory,
        },
        InventoryCategories,
        'Edit inventory category success',
        'Edit inventory category error',
      )
    },
    confirmDelete(id) {
      this.mutationAction(
        DeleteInventoryCategory,
        { id },
        InventoryCategories,
        'Delete inventory category success',
        'Delete inventory category error',
      )
    },
    cancelInventoryCategoryEdit() {
      this.cancelEdit()
    },
  },
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  column-gap: 30px;
  padding: 12px 0;
  @media screen and (min-width: $lg) {
    grid-template-columns: 30% 30% 30% auto;
  }
  @media screen and (max-width: $lg) {
    grid-template-columns: 200px 200px 100px auto;
  }
}

.row {
  padding: 16.5px 10px;
}

.icon {
  cursor: pointer;

  &--add {
    grid-column: 4;
    justify-self: end;
  }
}

.icon--add {
  grid-column: 5;
}
</style>
