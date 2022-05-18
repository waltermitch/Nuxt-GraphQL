<template>
  <PageContentWrapper>
    <InputWithTitle>
      <template #title> Period End Date </template>

      <template #input>
        <CustomSelect :options="mockedList" @input="selectPeriodEndDate" />
      </template>
    </InputWithTitle>

    <div class="table">
      <CustomTable>
        <template #header>
          <div class="table-row">
            <span> PO </span>

            <span> Purchase Date </span>

            <span> Invoice Num </span>

            <span> Vendor Num </span>

            <span> Total </span>
          </div>
        </template>

        <template v-if="purchases" #content>
          <CustomTableRow
            v-for="purchase in purchases.data"
            :key="purchase.id"
            class="table-row table-content-row"
          >
            <span>{{ purchase.id }}</span>

            <span>{{ formatDateFromAPI(purchase.date) }}</span>

            <span>{{ purchase.number }}</span>

            <span>{{ purchase.vendor.code }}</span>

            <span
              >{{
                purchase.items.reduce((prev, current) => {
                  return Number(prev) + Number(current.amount)
                }, 0)
              }}$</span
            >

            <CustomTableIconsColumn
              :is-edit-active="isEdit === purchase.id"
              :is-delete-active="isDelete === purchase.id"
              @edit="editPurchaseOrder(purchase)"
              @delete="deleteItem(purchase.id)"
              @cancel-delete="cancelDelete"
              @confirm-delete="confirmDelete(purchase.id)"
            />
          </CustomTableRow>
        </template>
      </CustomTable>
    </div>
  </PageContentWrapper>
</template>

<script>
import InputWithTitle from './InputWithTitle.vue'
import CustomSelect from './CustomSelect.vue'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
import CustomTableIconsColumn from './CustomTableIconsColumn.vue'
import Purchases from '~/graphql/queries/purchases.gql'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
import { mutationMixin } from '~/mixins/mutationMixin'
import { formatDateFromAPI } from '~/helpers/helpers'
import DeletePurchase from '~/graphql/mutations/purchaseOrder/deletePurchase'
export default {
  name: 'WeeklyPurchasesContent',
  components: {
    InputWithTitle,
    CustomSelect,
    CustomTable,
    CustomTableRow,
    CustomTableIconsColumn,
  },
  apollo: {
    purchases: {
      query: Purchases,
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
    editPurchaseOrder(purchase) {
      this.$store.commit('purchaseOrders/SET_PURCHASE_ORDER', {
        ...purchase,
        purchaseDate: this.formatDateFromAPI(purchase.date),
        invoiceNumber: purchase.number,
      })
      this.$store.commit('purchaseOrders/SET_IS_EDIT', true)
      this.$router.push('/home/purchase-orders')
    },
    confirmDelete(id) {
      this.mutationAction(
        DeletePurchase,
        { id },
        Purchases,
        'Delete purchase success',
        'Delete purchase error'
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
  grid-template-columns: 166px 326px 144px 170px 90px 68px;
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
