<template>
  <div class="content">
    <ValidationObserver ref="form">
      <InputRow>
        <InputWithTitle>
          <template #title>Order Number</template>

          <template #input>
            <CustomInput v-model="orderNumber" rules="required" disabled />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>Description</template>

          <template #input>
            <CustomInput v-model="description" rules="required" />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title>Order Date</template>

          <template #input>
            <CustomInput
              v-model="orderDate"
              rules="required|date"
              placeholder="mm/dd/yyyy"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>Phone</template>

          <template #input>
            <CustomInput
              v-model="phone"
              rules="required|phone"
              placeholder="(123) 456-7890"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title>Delivery Date/Time</template>

          <template #input>
            <CustomInput
              v-model="deliveryDate"
              rules="required|dateWithTime"
              placeholder="mm/dd/yyyy hh:mm"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>Head Count</template>

          <template #input>
            <CustomInput v-model.number="headCount" rules="required" />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title>Ordered By</template>

          <template #input>
            <CustomInput v-model="orderedBy" rules="required" />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>Ordered For</template>

          <template #input>
            <CustomInput v-model="orderedFor" rules="required" />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle margin-bottom="14px">
          <template #title>Taxable</template>

          <template #input>
            <CustomRadioButton
              :is-active="isTaxable"
              @set-is-active="setIsTaxable"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>Charge #</template>

          <template #input>
            <CustomInput v-model="chargeNumber" rules="required" />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle margin-bottom="14px">
          <template #title>Cash Order</template>

          <template #input>
            <CustomRadioButton
              :is-active="isCashOrder"
              @set-is-active="setIsCashOrder"
            />
          </template>
        </InputWithTitle>
      </InputRow>
    </ValidationObserver>

    <div class="buttons-area">
      <DefaultButton button-color-gamma="red" @event="nextTab">
        Continue
      </DefaultButton>

      <DefaultButton button-color-gamma="white" @event="cancelEvent">
        Cancel
      </DefaultButton>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { formMixin } from '../mixins/formMixin'
import InputWithTitle from './InputWithTitle.vue'
import CustomInput from './CustomInput.vue'
import InputRow from './InputRow.vue'
import CustomRadioButton from './CustomRadioButton.vue'
import DefaultButton from './DefaultButton.vue'
import { cateringSalesMixin } from '~/mixins/cateringSalesMixin'
import { tabsViewMixin } from '~/mixins/tabsViewMixin'
export default {
  name: 'CateringSalesDetails',
  components: {
    InputWithTitle,
    CustomInput,
    InputRow,
    CustomRadioButton,
    DefaultButton,
    ValidationObserver,
  },
  mixins: [formMixin, cateringSalesMixin, tabsViewMixin],
  data() {
    return {
      orderNumber: '',
    }
  },
  computed: {
    description: {
      get() {
        return this.getDescription
      },
      set(value) {
        this.$store.commit('cateringSales/SET_DESCRIPTION', value)
      },
    },
    orderDate: {
      get() {
        return this.getOrderDate
      },
      set(value) {
        this.$store.commit('cateringSales/SET_ORDER_DATE', value)
      },
    },
    phone: {
      get() {
        return this.getPhoneNumber
      },
      set(value) {
        this.$store.commit('cateringSales/SET_PHONE_NUMBER', value)
      },
    },
    deliveryDate: {
      get() {
        return this.getDeliveryDate
      },
      set(value) {
        this.$store.commit('cateringSales/SET_DELIVERY_DATE', value)
      },
    },
    headCount: {
      get() {
        return this.getHeadCount
      },
      set(value) {
        this.$store.commit('cateringSales/SET_HEAD_COUNT', value)
      },
    },
    orderedBy: {
      get() {
        return this.getOrderBy
      },
      set(value) {
        this.$store.commit('cateringSales/SET_ORDER_BY', value)
      },
    },
    orderedFor: {
      get() {
        return this.getOrderFor
      },
      set(value) {
        this.$store.commit('cateringSales/SET_ORDER_FOR', value)
      },
    },
    isTaxable: {
      get() {
        return this.getIsTaxable
      },
      set(value) {
        this.$store.commit('cateringSales/SET_IS_TAXABLE', value)
      },
    },
    chargeNumber: {
      get() {
        return this.getChargeNumber
      },
      set(value) {
        this.$store.commit('cateringSales/SET_CHARGE_NUMBER', value)
      },
    },
    isCashOrder: {
      get() {
        return this.getIsCashOrder
      },
      set(value) {
        this.$store.commit('cateringSales/SET_IS_CASH_ORDER', value)
      },
    },
  },
  methods: {
    setIsTaxable() {
      this.isTaxable = !this.isTaxable
    },
    setIsCashOrder() {
      this.isCashOrder = !this.isCashOrder
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
