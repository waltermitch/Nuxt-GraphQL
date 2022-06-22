<template>
  <PageContentWrapper>
    <ValidationObserver ref="form">
      <LoadingBar v-if="$apollo.loading" />
      <CustomTable v-else :w-table="780">
        <template #header>
          <div class="table-row">
            <span> Name </span>

            <span> Description </span>
          </div>
        </template>

        <template v-if="expenseTypes" #content>
          <CustomTableRow
            v-for="expenseType in expenseTypes"
            :key="expenseType.id"
            class="table-row"
          >
            <CustomInput
              v-if="isEdit === expenseType.id"
              v-model="expenseTypeEdit.type"
              rules="required"
              do-not-show-error-message
            />
            <span v-else>{{ expenseType.type }}</span>

            <CustomInput
              v-if="isEdit === expenseType.id"
              v-model="expenseTypeEdit.description"
              rules="required"
              do-not-show-error-message
            />
            <span v-else>{{ expenseType.description }}</span>

            <CustomTableIconsColumn
              :is-edit-active="isEdit === expenseType.id"
              :is-delete-active="isDelete === expenseType.id"
              @edit="editExpenseType(expenseType)"
              @delete="deleteItem(expenseType.id)"
              @cancel="cancelExpenseTypeEdit"
              @cancel-delete="cancelDelete"
              @confirm-edit="confirmEdit(expenseType)"
              @confirm-delete="confirmDelete(expenseType.id)"
            />
          </CustomTableRow>

          <CustomTableRow v-if="isAdd" class="table-row">
            <CustomInput
              v-model="expenseTypeNew.type"
              rules="required"
              do-not-show-error-message
            />

            <CustomInput
              v-model="expenseTypeNew.description"
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
      <DefaultButton @event="addExpenseType">+ Add Expense Type </DefaultButton>

      <DefaultButton @event="cancelAdd"> Cancel </DefaultButton>
    </div>
  </PageContentWrapper>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import ExpenseTypes from '../graphql/queries/expenseTypes.gql'
import CreateExpenseType from '../graphql/mutations/expenseType/createExpenseType.gql'
import UpdateExpenseType from '../graphql/mutations/expenseType/updateExpenseType.gql'
import DeleteExpenseType from '../graphql/mutations/expenseType/deleteExpenseType.gql'
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
  name: 'HQExpenseTypesContent',
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
    expenseTypes: {
      query: ExpenseTypes,
    },
  },
  data() {
    return {
      expenseTypeNew: {
        type: '',
        description: '',
      },
      expenseTypeEdit: {},
    }
  },
  methods: {
    editExpenseType(expenseType) {
      this.expenseTypeEdit = Object.assign({}, expenseType)
      this.edit(expenseType.id)
    },
    addExpenseType() {
      this.mutationAction(
        CreateExpenseType,
        {
          expenseTypeInput: {
            type: this.expenseTypeNew.type,
            description: this.expenseTypeNew.description,
          },
        },
        ExpenseTypes,
        'Add expense type success',
        'Add expense type error'
      )
    },
    confirmEdit(expenseType) {
      const editedExpenseType = {
        id: expenseType.id,
        type: this.expenseTypeEdit.type,
        description: this.expenseTypeEdit.description,
      }

      this.mutationAction(
        UpdateExpenseType,
        {
          expenseTypeInput: editedExpenseType,
        },
        ExpenseTypes,
        'Edit expense type success',
        'Edit expense type error',
      )
    },
    confirmDelete(id) {
      this.mutationAction(
        DeleteExpenseType,
        { id },
        ExpenseTypes,
        'Delete expense type success',
        'Delete expense type error',
      )
    },
    cancelExpenseTypeEdit() {
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
    grid-template-columns: 40% 40% auto;
  }
  @media screen and (max-width: $lg) {
    grid-template-columns: 200px 200px auto;
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
