<template>
  <PageContentWrapper>
    <InputWithTitle>
      <template #title> Period End Date</template>

      <template #input>
        <CustomSelect :options="mockedList" @input="selectPeriodEndDate" />
      </template>
    </InputWithTitle>

    <div class="table">
      <CustomTable class="">
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
            v-for="expense in expenses.data"
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
export default {
  name: 'WeeklyExpensesContent',
  components: { CustomTable, CustomTableRow },
  apollo: {
    expenses: {
      query: Expenses,
    },
  },
  mixins: [tableActionsMixin, mutationMixin],
  data() {
    return {
      mockedList: [
        {
          id: 1,
          name: '22/02/2022',
        },
        {
          id: 2,
          name: '22/04/2022',
        },
      ],
      periodEndDate: null,
    }
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

  @media screen and (min-width: $md) {
    grid-template-columns: 166px 326px 144px 170px 90px 68px;
  }
  @media screen and (max-width: $md) {
    grid-template-columns: 60px 120px 120px 120px 90px 68px;
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
