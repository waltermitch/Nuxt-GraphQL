<template>
  <PageContentWrapper>
    <LoadingBar v-if="$apollo.loading" />
    <div class="table">
      <CustomTable class="" :w-table="750">
        <template #header>
          <div class="table-row">
            <span> GL </span>

            <span> GL Name </span>

            <span> Amount </span>

            <span> Vendor </span>

            <span>Original Expense Date</span>

            <span> Comment </span>
          </div>
        </template>

        <template v-if="reAccruals" #content>
          <CustomTableRow
            v-for="reAccrual in reAccruals"
            :key="reAccrual.id"
            class="table-row table-content-row"
          >
            <span> {{ reAccrual.glAccount.id }} </span>

            <span> {{ reAccrual.glAccount.name }} </span>

            <span> {{ reAccrual.amount }} </span>

            <span> {{ reAccrual.vendor.name }} </span>

            <span> {{ formatDateFromAPI(reAccrual.expenseDate) }}</span>

            <span> {{ reAccrual.comments }} </span>

            <CustomTableIconsColumn
              :is-edit-active="isEdit === reAccrual.id"
              :is-delete-active="isDelete === reAccrual.id"
              @edit="editExpense(reAccrual)"
              @delete="deleteItem(reAccrual.id)"
              @cancel-delete="cancelDelete"
              @confirm-delete="confirmDelete(reAccrual.id)"
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
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
import { mutationMixin } from '~/mixins/mutationMixin'
import { formatDateFromAPI } from '~/helpers/helpers'
import DeleteExpense from '~/graphql/mutations/expense/deleteExpense.gql'
import { meMixin } from '~/mixins/meMixin'
import ExpenseTypes from '~/graphql/queries/expenseTypes.gql'
import ReAccruals from '~/graphql/queries/reAccruals.gql'
export default {
  name: 'ReAccrualsContent',
  components: { CustomTable, CustomTableRow },
  apollo: {
    reAccruals: {
      query: ReAccruals,
    },
    expenseTypes: {
      query: ExpenseTypes,
    },
  },
  mixins: [tableActionsMixin, mutationMixin, meMixin],
  methods: {
    formatDateFromAPI,
    setExpensesType(expenseType) {
      this.expenseType = expenseType
    },
    selectPeriodEndDate(item) {
      this.periodEndDate = item
    },
    editExpense(reAccrual) {
      this.$store.commit('expense/SET_EXPENSE', {
        ...reAccrual,
        expenseDate: this.formatDateFromAPI(reAccrual.expenseDate),
        expenseType: {
          type: 'ReAccrual',
        },
      })
      this.$store.commit('expense/SET_IS_EDIT', true)
      this.$router.push('/home/expenses')
    },
    confirmDelete(id) {
      this.mutationAction(
        DeleteExpense,
        { id },
        ReAccruals,
        'Delete reAccrual success',
        'Delete reAccrual error',
        {
          activePeriod: true,
        }
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
    grid-template-columns: 5% 15% 15% 12% repeat(2, 18%) 5%;
  }
  @media screen and (min-width: $lg) and (max-width: $xl) {
    grid-template-columns: 5% 15% 10% 12% repeat(2, 18%) 5%;
  }
  @media screen and (min-width: $md) and (max-width: $lg) {
    grid-template-columns: 5% 15% 10% 12% repeat(2, 18%) 5%;
  }
  @media screen and (max-width: $md) {
    grid-template-columns: 80px 120px 120px 120px 90px 68px 60px;
    column-gap: 10px;
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
