<template>
  <PageContentWrapper>
    <LoadingBar v-if="$apollo.loading" />

    <div v-else class="table">
      <CustomTable class="" :w-table="750">
        <template #header>
          <div class="table-row">
            <span> Expense Date </span>

            <span> Expense Type </span>

            <span> Gl Account </span>

            <span> Amount </span>

            <span> Comment </span>
          </div>
        </template>

        <template v-if="expenses" #content>
          <CustomTableRow
            v-for="expense in currentPeriodData"
            :key="expense.id"
            class="table-row table-content-row"
          >
            <span> {{ formatDateFromAPI(expense.expenseDate) }}</span>

            <span> {{ expense.expenseType.description }} </span>

            <span> {{ expense.glAccount.name }} </span>

            <span> {{ expense.amount }} </span>

            <span> {{ expense.comments }} </span>

            <CustomTableIconsColumn
              :is-edit-active="isEdit === expense.id"
              :is-delete-active="isDelete === expense.id"
              @edit="editExpense(expense)"
              @delete="deleteItem(expense.id)"
              @cancel-delete="cancelDelete"
              @confirm-delete="confirmDelete(expense.id)"
            />
          </CustomTableRow>
        </template>
      </CustomTable>
    </div>
  </PageContentWrapper>
</template>

<script>
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
import Expenses from '~/graphql/queries/expenses.gql'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
import { mutationMixin } from '~/mixins/mutationMixin'
import { formatDateFromAPI } from '~/helpers/helpers'
import DeleteExpense from '~/graphql/mutations/expense/deleteExpense.gql'
import { meMixin } from '~/mixins/meMixin'
export default {
  name: 'WeeklyExpensesContent',
  components: { CustomTable, CustomTableRow },
  apollo: {
    expenses: {
      query: Expenses,
    },
  },
  mixins: [tableActionsMixin, mutationMixin, meMixin],
  computed: {
    currentPeriodData() {
      return this.expenses.filter(
        (expense) => expense.periodEnd === this.periodEndDate
      )
    },
  },
  methods: {
    formatDateFromAPI,
    selectPeriodEndDate(item) {
      this.periodEndDate = item
    },
    editExpense(expense) {
      this.$store.commit('expense/SET_EXPENSE', {
        ...expense,
        expenseDate: this.formatDateFromAPI(expense.expenseDate),
      })
      this.$store.commit('expense/SET_IS_EDIT', true)
      this.$router.push('/home/expenses')
    },
    confirmDelete(id) {
      this.mutationAction(
        DeleteExpense,
        { id },
        Expenses,
        'Delete expense success',
        'Delete expense error'
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.table {
  margin-top: 30px;
}

.table-row {
  display: grid;
  align-items: center;
  @media screen and (min-width: $xl) {
    grid-template-columns: 12% 30% 20% 10% 10% 8%;
  }
  @media screen and (min-width: $lg) and (max-width: $xl) {
    grid-template-columns: 12% 30% 15% 10% 10% 10%;
  }
  @media screen and (min-width: $md) and (max-width: $lg) {
    grid-template-columns: 12% 30% 15% 10% 10% 10%;
  }
  @media screen and (max-width: $md) {
    grid-template-columns: 80px 120px 120px 120px 90px 68px;
  }
  column-gap: 20px;
}

.table-content-row {
  height: 60px;
}

.icon {
  margin-right: 15px;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
}
</style>
