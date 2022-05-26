<template>
  <div>
    <ValidationObserver ref="form" v-slot="{ invalid }">
      <InputRow>
        <InputWithTitle>
          <template #title>Invoice Number</template>

          <template #input>
            <CustomInput v-model="invoiceNumber" rules="required" />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>Purchase Date</template>

          <template #input>
            <CustomInput
              v-model="purchaseDate"
              rules="required|date"
              placeholder="mm/dd/yyyy"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title>Vendor</template>

          <template #input>
            <CustomSelect
              v-if="vendors"
              :options="vendors"
              :selected-item="getIsEdit ? getVendor : null"
              select-by="name"
              @input="selectVendor"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>PO Number</template>

          <template #input>
            <CustomInput v-model="getId" disabled />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title>Purchase Total</template>

          <template #input>
            <CustomInput
              v-model.number="purchaseTotal"
              type="number"
              rules="required|currency"
              placeholder="$0.00"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <div class="buttons-area">
        <DefaultButton
          button-color-gamma="red"
          :disabled="invalid"
          @event="nextTab"
        >
          Continue
        </DefaultButton>

        <DefaultButton
          button-color-gamma="white"
          @event="getIsEdit ? cancelEdit() : cancelCreate()"
        >
          Cancel
        </DefaultButton>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { formMixin } from '../mixins/formMixin'
import InputWithTitle from './InputWithTitle.vue'
import CustomInput from './CustomInput.vue'
import InputRow from './InputRow.vue'
import DefaultButton from './DefaultButton.vue'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
import { purchaseOrderMixin } from '~/mixins/purchaseOrderMixin'
import { tabsViewMixin } from '~/mixins/tabsViewMixin'
import Vendors from '~/graphql/queries/vendors.gql'
export default {
  name: 'PurchaseOrdersDetails',
  components: {
    InputWithTitle,
    CustomInput,
    InputRow,
    DefaultButton,
    ValidationObserver,
  },
  apollo: {
    vendors: {
      query: Vendors,
    },
  },
  mixins: [formMixin, tabsViewMixin, tableActionsMixin, purchaseOrderMixin],
  computed: {
    invoiceNumber: {
      get() {
        return this.getInvoiceNumber
      },
      set(value) {
        this.$store.commit('purchaseOrders/SET_INVOICE_NUMBER', value)
      },
    },
    purchaseDate: {
      get() {
        return this.getPurchaseDate
      },
      set(value) {
        this.$store.commit('purchaseOrders/SET_PURCHASE_DATE', value)
      },
    },
    vendor: {
      get() {
        return this.getVendor
      },
      set(value) {
        this.$store.commit('purchaseOrders/SET_VENDOR', value)
      },
    },
    poNumber: {
      get() {
        return this.getPoNumber
      },
      set(value) {
        this.$store.commit('purchaseOrders/SET_PO_NUMBER', value)
      },
    },
    purchaseTotal: {
      get() {
        return this.getPurchaseTotal
      },
      set(value) {
        this.$store.commit('purchaseOrders/SET_PURCHASE_TOTAL', value)
      },
    },
  },
  mounted() {
    if (this.getIsEdit) {
      this.$store.commit(
        'purchaseOrders/SET_PURCHASE_TOTAL',
        (this.purchaseTotal = this.getItems.reduce((prev, current) => {
          return Number(prev) + Number(current.amount)
        }, 0))
      )
    }
  },
  methods: {
    selectVendor(vendor) {
      this.vendor = vendor
    },
  },
}
</script>

<style lang="scss" scoped>
.buttons-area {
  display: flex;
  margin-top: 50px;

  button:first-child {
    margin-right: 11px;
  }
}
</style>
