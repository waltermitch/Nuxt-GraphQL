<template>
  <div class="content">
    <ValidationObserver ref="form">
      <InputRow>
        <InputWithTitle>
          <template #title>Order Number</template>

          <template #input>
            <CustomInput v-model="orderNumber" rules="required" />
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
              v-model="deliveryDateAndTime"
              rules="required|dateWithTime"
              placeholder="mm/dd/yyyy hh:mm"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>Head Count</template>

          <template #input>
            <CustomInput v-model="headCount" rules="required" />
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
              :is-active="taxable"
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
              :is-active="cashOrder"
              @set-is-active="setIsCashOrder"
            />
          </template>
        </InputWithTitle>
      </InputRow>
    </ValidationObserver>

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
import { ValidationObserver } from 'vee-validate'
import { mapActions } from 'vuex'
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
    ValidationObserver,
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
    ...mapActions({
      setShowMessage: 'formSubmissionMessage/setShowMessage',
      setMessageType: 'formSubmissionMessage/setMessageType',
    }),
    setIsTaxable() {
      this.taxable = !this.taxable
    },
    setIsCashOrder() {
      this.cashOrder = !this.cashOrder
    },
    saveEvent() {
      this.$refs.form.validate().then((result) => {
        if (result) {
          this.setShowMessage(true)
          this.setMessageType('success')
        } else {
          this.setShowMessage(true)
          this.setMessageType('error')
        }

        setTimeout(() => {
          this.setShowMessage(false)
        }, 4000)
      })
    },
    cancelEvent() {
      this.$refs.form.reset()
      this.setShowMessage(false)
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
