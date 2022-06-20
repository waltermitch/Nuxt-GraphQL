<template>
  <PageContentWrapper>
    <ValidationObserver ref="form">
      <CustomTable class="table-full" :w-table="700">
        <template #header>
          <div class="table-row">
            <span>Monthly</span>

            <span>GL Account</span>

            <span>Amount</span>

            <span>Comments</span>
          </div>
        </template>

        <template v-if="fixedExpenses" #content>
          <CustomTableRow
            v-for="item in fixedExpenses"
            :key="item.id"
            class="table-row"
          >
            <CustomRadioButton
              :is-active="item.monthly"
              :disabled="isEdit !== item.id"
              @set-is-active="setIsMonthly(item)"
            />

            <CustomSelect
              v-if="glAccounts && isEdit === item.id"
              :options="glAccounts"
              select-by="name"
              :selected-item="item.glAccount"
              @input="selectGlAccount"
            />
            <span v-else>{{ item.glAccount.name }}</span>

            <CustomInput
              v-if="isEdit === item.id"
              v-model="item.amount"
              rules="required|double|currency"
              do-not-show-error-message
              type="number"
              placeholder="$0.00"
            />

            <span v-else>{{ item.amount }}</span>

            <CustomInput
              v-if="isEdit === item.id"
              v-model="item.comments"
              rules="required"
              do-not-show-error-message
            />
            <span v-else>{{ item.comments }}</span>

            <CustomTableIconsColumn
              :is-edit-active="isEdit === item.id"
              :is-delete-active="isDelete === item.id"
              @edit="edit(item.id)"
              @delete="deleteItem(item.id)"
              @cancel="cancelExpensesEdit"
              @cancel-delete="cancelDelete"
              @confirm-edit="confirmEdit(item)"
              @confirm-delete="confirmDelete(item.id)"
            />
          </CustomTableRow>

          <CustomTableRow v-if="isAdd" class="table-row">
            <CustomRadioButton
              :is-active="newItem.monthly"
              @set-is-active="setIsMonthly"
            />

            <CustomSelect
              v-if="glAccounts"
              :options="glAccounts"
              select-by="name"
              @input="selectGlAccount"
            />

            <CustomInput
              v-model="newItem.amount"
              rules="required|double|currency"
              do-not-show-error-message
              type="number"
              placeholder="$0.00"
            />

            <CustomInput
              v-model="newItem.comments"
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
      <DefaultButton button-color-gamma="red" @event="createFixedExpense">
       + Add Expenses
      </DefaultButton>

      <DefaultButton button-color-gamma="white" @event="cancelEvent">
        Cancel
      </DefaultButton>
    </div>
  </PageContentWrapper>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { formMixin } from '../mixins/formMixin'
import PageContentWrapper from './PageContentWrapper.vue'
import CustomTableRow from './CustomTableRow.vue'
import CustomRadioButton from './CustomRadioButton.vue'
import CustomSelect from './CustomSelect.vue'
import CustomInput from './CustomInput.vue'
import CustomTableAddIcon from './CustomTableAddIcon.vue'
import GlAccounts from '~/graphql/queries/glAccounts.gql'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
import FixedExpense from '~/graphql/queries/fixedExpenses.gql'
import { mutationMixin } from '~/mixins/mutationMixin'
import CreateFixedExpense from '~/graphql/mutations/fixedExpense/createFixedExpenses.gql'
import DeleteFixedExpense from '~/graphql/mutations/fixedExpense/deleteFixedExpenses.gql'
import UpdateFixedExpense from '~/graphql/mutations/fixedExpense/updateFixedExpense.gql'

export default {
  name: 'FixedExpensesContent',
  components: {
    PageContentWrapper,
    CustomTableRow,
    CustomRadioButton,
    CustomSelect,
    CustomInput,
    ValidationObserver,
    CustomTableAddIcon,
  },
  mixins: [formMixin, tableActionsMixin, mutationMixin],
  apollo: {
    glAccounts: {
      query: GlAccounts,
    },
    fixedExpenses: {
      query: FixedExpense,
    },
  },
  data() {
    return {
      newItem: {
        id: '',
        comments: '',
        monthly: false,
        glAccount: '',
        amount: '',
      },
    }
  },
  methods: {
    selectGlAccount(glAccount) {
      this.newItem.glAccount = glAccount
    },
    async createFixedExpense() {
      await this.mutationAction(
        CreateFixedExpense,
        {
          fixedExpenseInput: {
            comments: this.newItem.comments,
            glAccount: {
              connect: this.newItem.glAccount.id,
            },
            amount: this.newItem.amount,
            monthly: this.newItem.monthly,
          },
        },
        FixedExpense,
        'Add fixed expense success',
        'Add fixed expense error'
      )
    },
    setIsMonthly(fixedExpenses) {
      if (fixedExpenses) {
        fixedExpenses.monthly = !fixedExpenses.monthly
      } else {
        this.newItem.monthly = !this.newItem.monthly
      }
    },
    async confirmDelete(id) {
      await this.mutationAction(
        DeleteFixedExpense,
        { id },
        FixedExpense,
        'Delete Fixed Expense success',
        'Delete Fixed Expense error'
      )
    },
    confirmEdit(expense) {
      const editedFixedExpense = {
        id: expense.id,
        comments: expense.comments,
        glAccount: {
          connect: expense.glAccount.id,
        },
        amount: expense.amount,
        monthly: expense.monthly,
      }

      this.mutationAction(
        UpdateFixedExpense,
        { fixedExpenseInput: editedFixedExpense },
        FixedExpense,
        'Add Fixed Expense success',
        'Add Fixed Expense error'
      )
    },
    cancelEvent() {
      this.isAdd = false
      this.isHide = false
    },
    async fetchData() {
      const {
        data: { fixedExpenses },
      } = await this.$apollo.query({
        query: FixedExpense,
        fetchPolicy: 'no-cache',
      })

      return fixedExpenses
    },
    async cancelExpensesEdit() {
      this.fixedExpenses = await this.fetchData()
      this.cancelEdit()
    },
  },
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  column-gap: 20px;
  @media screen and (min-width: $lg) {
    grid-template-columns: 8% 32% 18% 30% 5%;
  }
  @media screen and (min-width: $md) and (max-width: $lg) {
    grid-template-columns: 8% 32% 18% 30% 5%;
  }
  @media screen and (max-width: $md) {
    grid-template-columns: 60px 180px 120px 200px 20px;
  }
}

.table-full {
  @media screen and (min-width: $lg) and (max-width: $xxl) {
    width: calc(100vw - 280px);
  }
}

.buttons-area {
  display: flex;
  margin-top: 36px;

  button:first-child {
    margin-right: 11px;
  }
}

.add-row {
  height: 86px;
}

.icon {
  cursor: pointer;

  &--add {
    grid-column: 5;
  }
}
</style>
