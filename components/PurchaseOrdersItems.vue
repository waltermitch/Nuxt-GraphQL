<template>
  <div>
    <CustomTable>
      <template #header>
        <div class="table-row">
          <span>Amount</span>

          <span>Inventory Category</span>

          <span>GL Account</span>

          <span>Ext</span>
        </div>
      </template>

      <template #content>
        <ValidationObserver ref="form">
          <CustomTableRow
            v-for="item in combinedItemsArray"
            :key="item.id"
            class="table-row"
          >
            <CustomInput
              v-model="item.amount"
              rules="required"
              do-not-show-error-message
            />

            <CustomInput
              v-model="item.inventoryCategory"
              rules="required"
              do-not-show-error-message
            />

            <CustomInput
              v-model="item.glAccount"
              rules="required|currency"
              placeholder="$0.00"
              do-not-show-error-message
            />

            <CustomInput
              v-model="item.ext"
              rules="required|currency"
              placeholder="$0.00"
              do-not-show-error-message
            />

            <img
              src="~assets/images/icons/home/delete.svg"
              class="icon"
              @click="deleteItem(item.id)"
            />
          </CustomTableRow>

          <CustomTableRow v-if="isAdd" class="table-row">
            <CustomInput
              v-model.number="newItem.amount"
              do-not-show-error-message
              rules="required|numeric"
            />

            <CustomInput
              v-model="newItem.inventoryCategory"
              do-not-show-error-message
              rules="required"
            />

            <CustomInput
              v-model.number="newItem.glAccount"
              rules="required|currency"
              do-not-show-error-message
              placeholder="$0.00"
            />

            <CustomInput
              v-model.number="newItem.ext"
              rules="required|currency"
              do-not-show-error-message
              placeholder="$0.00"
            />
          </CustomTableRow>
        </ValidationObserver>

        <CustomTableRow class="table-row add-row">
          <CustomTableAddIcon :is-hide="isHide" @add-row="addRow" />
        </CustomTableRow>

        <div v-if="isAdd" class="buttons-area add-item-buttons">
          <DefaultButton @event="addItem"> Add Item </DefaultButton>

          <DefaultButton @event="cancelAdd"> Cancel </DefaultButton>
        </div>
      </template>
    </CustomTable>

    <div class="buttons-area">
      <DefaultButton button-color-gamma="red" @event="purchaseOrderAction">
        {{ `${!getIsEdit ? 'Save' : 'Edit'}` }}
      </DefaultButton>
      <!--      <DefaultButton button-color-gamma="red" @event="saveEvent">-->
      <!--        Accept-->
      <!--      </DefaultButton>-->

      <DefaultButton button-color-gamma="white" @event="cancelEvent">
        Cancel
      </DefaultButton>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { formMixin } from '../mixins/formMixin'
import CreatePurchaseOrder from '../graphql/mutations/purchaseOrder/createPurchaseOrder.gql'
import UpdatePurchaseOrder from '../graphql/mutations/purchaseOrder/updatePurchaseOrder.gql'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
import CustomInput from './CustomInput.vue'
import CustomTableAddIcon from './CustomTableAddIcon.vue'
import { purchaseOrderMixin } from '~/mixins/purchaseOrderMixin'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
import { formatDate } from '~/helpers/helpers'
import CateringOrders from '~/graphql/queries/cateringOrders.gql'
export default {
  name: 'PurchaseOrdersItems',
  components: {
    CustomTable,
    CustomTableRow,
    CustomInput,
    ValidationObserver,
    CustomTableAddIcon,
  },
  mixins: [formMixin, purchaseOrderMixin, tableActionsMixin],
  data() {
    return {
      items: [],
      newItem: {
        amount: '',
        inventoryCategory: '',
        glAccount: '',
        ext: '',
      },
    }
  },
  computed: {
    combinedItemsArray() {
      return [...this.items, ...this.getItems]
    },
  },
  methods: {
    addItem() {
      const formValidated = this.$refs.form && this.$refs.form.validate()

      if (formValidated) {
        if (this.newItem.amount) {
          this.$store.commit('purchaseOrders/SET_ITEMS', this.newItem)
        }

        this.isAdd = false
        this.isHide = false
        this.newItem = {
          amount: '',
          inventoryCategory: '',
          glAccount: '',
          ext: '',
        }
      }
    },
    deleteItem(id) {
      if (this.getIsEdit && id) {
        this.$store.commit('purchaseOrders/SET_DELETE_ITEM_IDS', id)
      }
      this.$store.commit(
        'purchaseOrders/SET_ITEMS',
        this.getItems.filter((item) => item.id !== id)
      )
    },
  },
  formatDate,
  async CreatePurchaseOrder() {
    await this.mutationAction(
      CreatePurchaseOrder,
      {
        cateringOrderInput: {
          invoiceNumber: this.invoiceNumber,
          purchaseDate: this.formatDate(this.purchaseDate),
          vendor: this.formatDate(this.vendor),
          items: {
            create: this.getItems.map((item) => item),
          },
          poNumber: this.poNumber,
          purchaseTotal: this.purchaseTotal,
        },
      },
      CateringOrders,
      'Add catering order success',
      'Add catering order error'
    )
  },
  async UpdatePurchaseOrder() {
    await this.mutationAction(
      UpdatePurchaseOrder,
      {
        cateringOrderInput: {
          id: this.getId,
          invoiceNumber: this.invoiceNumber,
          purchaseDate: this.formatDate(this.purchaseDate),
          vendor: this.formatDate(this.vendor),
          items: {
            delete: this.getDeleteItemIDs,
            update: this.getItems
              .map((item) => {
                const { __typename, ...obj } = item

                return obj
              })
              .filter((item) => item.id),
            create: this.getItemsWithoutId,
          },
          poNumber: this.poNumber,
          purchaseTotal: this.purchaseTotal,
        },
      },
      CateringOrders,
      'Edit catering order success',
      'Edit catering order error'
    )
    this.$router.push('/review/catering-sales')
  },
  purchaseOrderAction() {
    this.getIsEdit ? this.UpdatePurchaseOrder() : this.CreatePurchaseOrder()
  },
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: 206px 345px 192px 213px 20px;
  column-gap: 20px;
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

.buttons-area {
  display: flex;
  margin-top: 50px;

  button:first-child {
    margin-right: 11px;
  }
}
</style>
