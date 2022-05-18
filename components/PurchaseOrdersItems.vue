<template>
  <div>
    <CustomTable>
      <template #header>
        <div class="table-row">
          <span>Amount</span>

          <span>Inventory Category</span>

          <span>GL Account</span>
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
              v-if="!getIsEdit"
              v-model="item.amount"
              rules="required|numeric"
              do-not-show-error-message
            />
            <CustomInput
              v-else
              :value="item.amount"
              rules="required|numeric"
              do-not-show-error-message
              @input="(e) => updateItems(item, Number(e), 'amount')"
            />
            <!-- TODO Finish when inventory API will be ready -->
            <CustomInput
              v-model="item.inventoryCategory"
              do-not-show-error-message
            />

            <CustomSelect
              v-if="glAccounts && !getIsEdit"
              :options="glAccounts.data"
              select-by="name"
              :selected-item="item.glAccount"
              @input="selectGlAccount(item, $event)"
            />
            <CustomSelect
              v-else-if="glAccounts"
              :options="glAccounts.data"
              select-by="name"
              :selected-item="item.glAccount"
              @input="selectGlAccount(item, $event)"
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
            <!-- TODO Finish when inventory API will be ready -->
            <CustomInput
              v-model="newItem.inventoryCategory"
              do-not-show-error-message
              rules="required"
            />

            <CustomSelect
              v-if="glAccounts"
              :options="glAccounts.data"
              select-by="name"
              @input="selectNewItemGlAccount"
            />
          </CustomTableRow>
        </ValidationObserver>

        <CustomTableRow v-if="leftToDistribute > 0" class="table-row add-row">
          <CustomTableAddIcon :is-hide="isHide" @add-row="addRow" />
        </CustomTableRow>

        <div v-if="isAdd" class="buttons-area add-item-buttons">
          <DefaultButton @event="addItem"> Add Item </DefaultButton>

          <DefaultButton @event="cancelAdd"> Cancel </DefaultButton>
        </div>
      </template>
    </CustomTable>

    <InputWithTitle class="left">
      <template #title>Left to distribute</template>

      <template #input>
        <span>{{ leftToDistribute }}$</span>
      </template>
    </InputWithTitle>

    <div class="buttons-area">
      <DefaultButton button-color-gamma="red" @event="purchaseOrderAction">
        {{ `${!getIsEdit ? 'Save' : 'Edit'}` }}
      </DefaultButton>

      <DefaultButton
        button-color-gamma="white"
        @event="getIsEdit ? cancelEdit() : cancelCreate()"
      >
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
import GlAccounts from '~/graphql/queries/glAccounts.gql'
import Me from '~/graphql/queries/me.query.gql'
import { mutationMixin } from '~/mixins/mutationMixin'
import Purchases from '~/graphql/queries/purchases.gql'
export default {
  name: 'PurchaseOrdersItems',
  components: {
    CustomTable,
    CustomTableRow,
    CustomInput,
    ValidationObserver,
    CustomTableAddIcon,
  },
  mixins: [formMixin, purchaseOrderMixin, tableActionsMixin, mutationMixin],
  apollo: {
    glAccounts: {
      query: GlAccounts,
    },
    me: {
      query: Me,
    },
  },
  data() {
    return {
      newItem: {
        amount: '',
        inventoryCategory: '',
        glAccount: '',
      },
    }
  },
  computed: {
    combinedItemsArray() {
      return [...this.getItems]
    },

    leftToDistribute() {
      const totalAmount = this.getItems.reduce((prev, current) => {
        return Number(prev) + Number(current.amount)
      }, 0)

      return this.getPurchaseTotal - totalAmount
    },
  },
  methods: {
    formatDate,
    updateItems(item, event, itemProp) {
      this.$store.commit(
        'purchaseOrders/SET_ITEMS',
        this.getItems.map((vuexItem) => {
          if (vuexItem.id === item.id) {
            return {
              ...vuexItem,
              [itemProp]: event,
            }
          }

          return vuexItem
        })
      )
    },
    addItem() {
      const formValidated = this.$refs.form && this.$refs.form.validate()

      if (formValidated) {
        if (this.newItem.amount) {
          this.$store.commit('purchaseOrders/SET_ITEM', this.newItem)
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
    selectGlAccount(item, glAccount) {
      this.updateItems(item, glAccount, 'glAccount')
    },
    selectNewItemGlAccount(glAccount) {
      this.newItem.glAccount = glAccount
    },
    async CreatePurchaseOrder() {
      await this.mutationAction(
        CreatePurchaseOrder,
        {
          PurchaseInput: {
            number: this.getInvoiceNumber,
            date: this.formatDate(this.getPurchaseDate),
            unit_id: this.me.selectedUnit.id,
            vendor: {
              connect: this.getVendor.id,
            },
            items: {
              create: this.getItems.map((item) => {
                return {
                  glAccount: {
                    connect: item.glAccount.id,
                  },
                  amount: item.amount,
                }
              }),
            },
          },
        },
        Purchases,
        'Add purchase order success',
        'Add purchase order error'
      )
    },
    async UpdatePurchaseOrder() {
      await this.mutationAction(
        UpdatePurchaseOrder,
        {
          PurchaseInput: {
            id: this.getId,
            number: this.getInvoiceNumber,
            date: this.formatDate(this.getPurchaseDate),
            vendor: {
              connect: this.getVendor.id,
            },
            // TODO Finish when inventory API will be ready
            // items: {
            //   delete: this.getDeleteItemIDs,
            //   update: this.getItems
            //     .map((item) => {
            //       const { __typename, ...obj } = item

            //       return obj
            //     })
            //     .filter((item) => item.id),
            //   create: this.getItemsWithoutId,
            // },
          },
        },
        Purchases,
        'Edit purchase order success',
        'Edit purchase order error'
      )
      this.$router.push('/review/weekly-purchases')
    },
    purchaseOrderAction() {
      this.getIsEdit ? this.UpdatePurchaseOrder() : this.CreatePurchaseOrder()
    },
  },
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: 206px 345px 192px 60px;
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

.left {
  margin-top: 20px;
}
</style>
