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
              v-model="inventoryCategoryEdit.name"
              rules="required"
              do-not-show-error-message
            />
            <span v-else>{{ inventoryCategory.name }}</span>

            <CustomSelect
              v-if="glAccounts && isEdit === inventoryCategory.id"
              v-model="inventoryCategoryEdit.glAccount"
              :options="glAccounts"
              select-by="name"
              :selected-item="
                glAccounts.find((glAccount) =>
                  inventoryCategory.glAccountId
                    ? glAccount.id == inventoryCategory.glAccountId
                    : glAccount.id == inventoryCategory.glAccount.id
                )
              "
            />
            <span v-else>{{ inventoryCategory.glAccount.name }}</span>

            <CustomInput
              v-if="isEdit === inventoryCategory.id"
              v-model="inventoryCategoryEdit.vending"
              rules="required"
              do-not-show-error-message
            />
            <span v-else>{{ inventoryCategory.vending }}</span>

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
              v-model="inventoryCategoryNew.name"
              rules="required"
              do-not-show-error-message
            />

            <CustomSelect
              v-if="glAccounts"
              v-model="inventoryCategoryNew.glAccount"
              :options="glAccounts"
              select-by="name"
            />

            <CustomInput
              v-model="inventoryCategoryNew.vending"
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
import InventoryCategories from '../graphql/queries/inventoryCategoriesSettings.gql'
import CreateInventoryCategory from '../graphql/mutations/inventoryCategory/createInventoryCategory.gql'
import UpdateInventoryCategory from '../graphql/mutations/inventoryCategory/updateInventoryCategory.gql'
import DeleteInventoryCategory from '../graphql/mutations/inventoryCategory/deleteInventoryCategory.gql'
import PageContentWrapper from './PageContentWrapper.vue'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
import CustomInput from './CustomInput.vue'
import CustomTableAddIcon from './CustomTableAddIcon.vue'
import GlAccounts from '~/graphql/queries/glAccounts.gql'
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
    glAccounts: {
      query: GlAccounts,
    },
  },
  data() {
    return {
      inventoryCategoryNew: {
        name: '',
        glAccount: '',
        vending: '',
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
            name: this.inventoryCategoryNew.name,
            glAccount: {
              connect: this.inventoryCategoryNew.glAccount.id,
            },
            vending: this.inventoryCategoryNew.vending,
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
        name: this.inventoryCategoryEdit.name,
        glAccount: {
          connect: this.inventoryCategoryEdit.glAccount.id,
        },
        vending: this.inventoryCategoryEdit.vending,
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
    grid-template-columns: 30% 30% 10% auto;
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
