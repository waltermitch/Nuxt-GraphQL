<template>
  <div>
    <ValidationObserver ref="form">
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
            <CustomInput
              v-model="vendor"
              rules="required|date"
              placeholder="mm/dd/yyyy"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>PO Number</template>

          <template #input>
            <CustomInput v-model="poNumber" rules="required" />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title>Purchase Total</template>

          <template #input>
            <CustomInput
              v-model="purchaseTotal"
              rules="required|currency"
              placeholder="$0.00"
            />
          </template>
        </InputWithTitle>
      </InputRow>
    </ValidationObserver>

    <div class="buttons-area">
      <DefaultButton button-color-gamma="red" @event="saveEvent">
        Accept
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
import DefaultButton from './DefaultButton.vue'
export default {
  name: 'PurchaseOrdersDetails',
  components: {
    InputWithTitle,
    CustomInput,
    InputRow,
    DefaultButton,
    ValidationObserver,
  },
  data() {
    return {
      invoiceNumber: '',
      purchaseDate: '',
      vendor: '',
      poNumber: '',
      purchaseTotal: '',
    }
  },
  methods: {
    ...mapActions({
      setShowMessage: 'formSubmissionMessage/setShowMessage',
      setMessageType: 'formSubmissionMessage/setMessageType',
    }),
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
