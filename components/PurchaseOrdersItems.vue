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
              :value="item.amount"
              rules="required|numeric"
              do-not-show-error-message
              @input="(e) => updateItems(item, Number(e), 'amount')"
            />

            <span v-if="!getIsEdit">{{ item.inventoryCategory.name }}</span>
            <CustomSelect
              v-else-if="inventoryCategories"
              :options="inventoryCategories.data"
              select-by="name"
              :selected-item="item.inventoryCategory"
              @input="selectInventoryCategory(item, $event)"
            />

            <span v-if="!getIsEdit">{{ item.glAccount.name }}</span>
            <CustomSelect
              v-else-if="glAccounts"
              :options="glAccounts.data"
              select-by="name"
              :selected-item="item.glAccount"
              @input="selectGlAccount(item, $event)"
            />

            <img
              src="~assets/images/icons/home/delete.svg"
              class="icon icon--delete"
              @click="deleteItem(item.id)"
            />
          </CustomTableRow>

          <CustomTableRow v-if="isAdd" class="table-row">
            <CustomInput
              v-model.number="newItem.amount"
              do-not-show-error-message
              rules="required|numeric"
            />

            <CustomSelect
              v-if="inventoryCategories"
              :options="inventoryCategories.data"
              select-by="name"
              do-not-preselect
              @input="selectNewItemInventoryCategory"
            />

            <CustomSelect
              v-if="glAccounts && !isSelectedGlAccount"
              :options="glAccounts.data"
              select-by="name"
              @input="selectNewItemGlAccount"
            />

            <span v-if="isSelectedGlAccount">{{ selectedGlAccount.name }}</span>
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
import InventoryCategories from '~/graphql/queries/inventoryCategories.gql'
import { PURCHASE_ORDER } from '~/constants/purchaseOrder'
export default {
  name: 'PurchaseOrdersItems',
  components: {
    CustomTable,
    CustomTableRow,
    CustomInput,
    ValidationObserver,
    CustomTableAddIcon,
  },
  mixins: [formMixin, tableActionsMixin, mutationMixin, purchaseOrderMixin],
  apollo: {
    glAccounts: {
      query: GlAccounts,
    },
    me: {
      query: Me,
    },
    inventoryCategories: {
      query: InventoryCategories,
    },
  },
  data() {
    return {
      newItem: {
        amount: '',
        inventoryCategory: '',
        glAccount: '',
      },
      isSelectedGlAccount: false,
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
    selectedGlAccount() {
      return this.newItem.glAccount
    },
  },
  methods: {
    formatDate,
    updateItems(item, event, itemProp) {
      this.$store.commit(
        'purchaseOrders/SET_ITEMS',
        this.getItems.map((vuexItem) => {
          if (
            item.id
              ? vuexItem.id === item.id
              : Number(vuexItem.tempId) === Number(item.tempId)
          ) {
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
          this.$store.commit('purchaseOrders/SET_ITEM', {
            ...this.newItem,
            tempId: new Date(),
          })
        }

        this.isSelectedGlAccount = false

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
    selectInventoryCategory(item, inventoryCategory) {
      this.updateItems(item, inventoryCategory, 'inventoryCategory')
      this.updateItems(item, inventoryCategory.glAccount, 'glAccount')
    },
    selectNewItemGlAccount(glAccount) {
      this.newItem = {
        ...this.newItem,
        glAccount,
      }
    },
    selectNewItemInventoryCategory(inventoryCategory) {
      if (inventoryCategory.id === this.newItem.inventoryCategory.id) {
        this.isSelectedGlAccount = false
      } else {
        this.newItem.inventoryCategory = inventoryCategory
        this.newItem = {
          ...this.newItem,
          glAccount: inventoryCategory.glAccount,
        }
        this.isSelectedGlAccount = true
      }
    },
    async CreatePurchaseOrder() {
      await this.mutationAction(
        CreatePurchaseOrder,
        {
          PurchaseInput: {
            number: this.getInvoiceNumber,
            date: this.formatDate(this.getPurchaseDate),
            vendor: {
              connect: this.getVendor.id,
            },
            items: {
              create: this.getItems.map((item) => {
                if (item.inventoryCategory) {
                  return {
                    glAccount: {
                      connect: item.glAccount.id,
                    },
                    inventoryCategory: {
                      connect: item.inventoryCategory.id,
                    },
                    amount: item.amount,
                  }
                } else {
                  return {
                    glAccount: {
                      connect: item.glAccount.id,
                    },
                    amount: item.amount,
                  }
                }
              }),
            },
          },
        },
        Purchases,
        'Add purchase order success',
        'Add purchase order error'
      )
      this.$store.commit('purchaseOrders/SET_PURCHASE_ORDER', PURCHASE_ORDER)
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
            items: {
              delete: this.getDeleteItemIDs,
              update: this.getItems
                .filter((item) => item.id)
                .map((item) => {
                  if (item.inventoryCategory) {
                    return {
                      id: item.id,
                      glAccount: {
                        connect: item.glAccount.id,
                      },
                      inventoryCategory: {
                        connect: item.inventoryCategory.id,
                      },
                      amount: item.amount,
                    }
                  } else {
                    return {
                      id: item.id,
                      glAccount: {
                        connect: item.glAccount.id,
                      },
                      amount: item.amount,
                    }
                  }
                }),
              create: this.getItemsWithoutId.map((item) => {
                if (item.inventoryCategory) {
                  return {
                    glAccount: {
                      connect: item.glAccount.id,
                    },
                    inventoryCategory: {
                      connect: item.inventoryCategory.id,
                    },
                    amount: item.amount,
                  }
                } else {
                  return {
                    glAccount: {
                      connect: item.glAccount.id,
                    },
                    amount: item.amount,
                  }
                }
              }),
            },
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
  grid-template-columns: 206px 345px 192px 1fr;
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

  &--delete {
    justify-self: end;
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
