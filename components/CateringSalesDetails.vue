<template>
  <div class="content">
    <InputRow>
      <InputWithTitle>
        <template #title>Order Number</template>

        <template #input>
          <CustomInput v-model="orderNumber" />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Description</template>

        <template #input>
          <CustomInput v-model="description" />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>Order Date</template>

        <template #input>
          <CustomInput v-model="orderDate" />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Phone</template>

        <template #input>
          <CustomInput v-model="phone" />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>Delivery Date/Time</template>

        <template #input>
          <CustomInput v-model="deliveryDateAndTime" />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Head Count</template>

        <template #input>
          <CustomInput v-model="headCount" />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>Ordered By</template>

        <template #input>
          <CustomInput v-model="orderedBy" />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Ordered For</template>

        <template #input>
          <CustomInput v-model="orderedFor" />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle margin-bottom="14px">
        <template #title>Taxable</template>

        <template #input>
          <CustomRadioButton
            :is-active="taxable"
            @set-is-active="setIsTaxable"
          />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Charge #</template>

        <template #input>
          <CustomInput v-model="chargeNumber" />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle margin-bottom="14px">
        <template #title>Cash Order</template>

        <template #input>
          <CustomRadioButton
            :is-active="cashOrder"
            @set-is-active="setIsCashOrder"
          />
        </template>
      </InputWithTitle>
    </InputRow>

    <div class="buttons-area">
      <DefaultButton button-color-gamma="red" @event="saveEvent">
        Save
      </DefaultButton>

      <DefaultButton button-color-gamma="white" @event="cancelEvent">
        Cancel
      </DefaultButton>
    </div>
  </div>
</template>

<script>
import InputWithTitle from './InputWithTitle.vue'
import CustomInput from './CustomInput.vue'
import InputRow from './InputRow.vue'
import CustomRadioButton from './CustomRadioButton.vue'
import DefaultButton from './DefaultButton.vue'
export default {
  name: 'CateringSalesDetails',
  components: {
    InputWithTitle,
    CustomInput,
    InputRow,
    CustomRadioButton,
    DefaultButton,
  },
  data() {
    return {
      orderNumber: '',
      description: '',
      orderDate: '',
      phone: '',
      deliveryDateAndTime: '',
      headCount: '',
      orderedBy: '',
      orderedFor: '',
      taxable: false,
      chargeNumber: '',
      cashOrder: false,
    }
  },
  methods: {
    setIsTaxable() {
      this.taxable = !this.taxable
    },
    setIsCashOrder() {
      this.cashOrder = !this.cashOrder
    },
    saveEvent() {
      console.log('save')
    },
    cancelEvent() {
      Object.assign(this.$data, this.$options.data.apply(this))
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
