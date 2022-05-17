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
            <span>Order Number</span>

            <span>Order Date</span>

            <span>Charge #</span>
          </div>
        </template>

        <template v-if="cateringOrders" #content>
          <CustomTableRow
            v-for="cateringOrder in cateringOrders.data"
            :key="cateringOrder.id"
            class="table-row table-content-row"
          >
            <span>{{ cateringOrder.id }}</span>

            <span>{{ formatDateFromAPI(cateringOrder.orderDate) }}</span>

            <span>{{ cateringOrder.chargeNumber }}</span>

            <CustomTableIconsColumn
              :is-edit-active="isEdit === cateringOrder.id"
              :is-delete-active="isDelete === cateringOrder.id"
              @edit="editCateringOrder(cateringOrder)"
              @delete="deleteItem(cateringOrder.id)"
              @cancel-delete="cancelDelete"
              @confirm-delete="confirmDelete(cateringOrder.id)"
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
import CustomTableRow from './CustomTableRow.vue'
import CustomTable from './CustomTable.vue'
import CateringOrders from '~/graphql/queries/cateringOrders'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
import { mutationMixin } from '~/mixins/mutationMixin'
import DeleteCateringOrder from '~/graphql/mutations/cateringOrder/deleteCateringOrder'
import { formatDateFromAPI, formatDateAndTimeFromAPI } from '~/helpers/helpers'
export default {
  name: 'CateringSalesReviewContent',
  components: { InputWithTitle, CustomSelect, CustomTable, CustomTableRow },
  apollo: {
    cateringOrders: {
      query: CateringOrders,
    },
  },
  mixins: [tableActionsMixin, mutationMixin],
  data() {
    return {
      periodEndDate: null,
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
    }
  },
  methods: {
    formatDateFromAPI,
    formatDateAndTimeFromAPI,
    selectPeriodEndDate(item) {
      this.periodEndDate = item
    },
    editCateringOrder(cateringOrder) {
      this.$store.commit('cateringSales/SET_CATERING_ORDER', {
        ...cateringOrder,
        orderDate: this.formatDateFromAPI(cateringOrder.orderDate),
        deliveryDate: this.formatDateAndTimeFromAPI(cateringOrder.deliveryDate),
      })
      this.$store.commit('cateringSales/SET_IS_EDIT', true)
      this.$router.push('/home/catering-sales')
    },
    confirmDelete(id) {
      this.mutationAction(
        DeleteCateringOrder,
        { id },
        CateringOrders,
        'Delete state success',
        'Delete state error'
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
  grid-template-columns: 170px 320px 150px auto;
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
